import { notFound } from "next/navigation"
import type { Metadata } from "next"
import MultiModeReportCard from "@/components/multi-mode-report-card"
import ResultActionsAll from "@/components/result-actions-all"
import { marksData } from "@/lib/data/marks-data"

interface PageProps {
  params: {
    academicYear: string
    examType: string
    examPeriod: string
  }
}

// Types aligned with marks-data
interface SubjectMarks { written: number | null; oral: number | null; project: number | null }
interface StudentMarks { rollNo: number; name: string; subjects: { [subject: string]: SubjectMarks } }
interface ClassData { className: string; students: StudentMarks[] }

// StudentData shape needed by MultiModeReportCard
interface StudentDataForCard {
  id: string
  name: string
  class: string
  rollNo: string
  fatherName: string
  motherName: string
  academicYear: string
}

function toOrdinal(n: number): string {
  if (n === 1) return "1st"
  if (n === 2) return "2nd"
  if (n === 3) return "3rd"
  return `${n}th`
}

function classOrderKey(className: string): number {
  const map: Record<string, number> = { Nursery: 0, LKG: 1, UKG: 2 }
  if (map[className] !== undefined) return map[className]
  const n = parseInt(className, 10)
  if (!Number.isNaN(n)) return 2 + n // after UKG, 1 -> 3, 12 -> 14
  return 100 // unknowns last
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { academicYear, examType, examPeriod } = params
  const decodedExamPeriod = decodeURIComponent(examPeriod)
  return {
    title: `All Students - ${examType.replace("-", " ").replace(/\b\w/g, (l: string) => l.toUpperCase())} ${decodedExamPeriod} (${academicYear}) | DBG Gurukulam`,
    description: `View and download all students' multi-mode assessment results for ${decodedExamPeriod} ${academicYear}.`,
  }
}

export default async function MultiModeAllPage({ params }: PageProps) {
  const { academicYear, examType, examPeriod } = params
  const decodedExamPeriod = decodeURIComponent(examPeriod)

  const classes: ClassData[] = [...marksData]
  if (!classes.length) notFound()

  // Sort classes Nursery -> LKG -> UKG -> 1..12
  classes.sort((a, b) => classOrderKey(a.className) - classOrderKey(b.className))

  // Build a flat list of [studentData, studentMarks, classLabel]
  const items: { student: StudentDataForCard; marks: StudentMarks; classLabel: string }[] = []

  for (const c of classes) {
    // Sort by roll number ascending
    const studentsSorted = [...c.students].sort((s1, s2) => s1.rollNo - s2.rollNo)
    for (const sm of studentsSorted) {
      // Prepare StudentData for card
      const parsed = parseInt(c.className, 10)
      const classLabel = Number.isNaN(parsed) ? c.className : toOrdinal(parsed)
      const student: StudentDataForCard = {
        id: `dbg-${c.className}-${sm.rollNo.toString().padStart(2, '0')}`,
        name: sm.name,
        class: classLabel,
        rollNo: sm.rollNo.toString().padStart(2, '0'),
        fatherName: "",
        motherName: "",
        academicYear: academicYear,
      }
      items.push({ student, marks: sm, classLabel: c.className })
    }
  }

  const backUrl = `https://dbggurukulam.com/results/${academicYear}/${params.examType}/${params.examPeriod}`

  return (
    <div className="min-h-screen bg-gray-50">
      <ResultActionsAll backUrl={backUrl} />

      {/* Batch page/print helpers */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .report-card { margin: 8px auto; }
          @media print {
            .report-card { break-after: page; page-break-after: always; }
          }
        `,
        }}
      />

      <div className="max-w-5xl mx-auto py-4">
        {items.map(({ student, marks, classLabel }, idx) => (
          <div
            key={`${classLabel}-${student.rollNo}-${student.name}-${idx}`}
            className="report-card"
            data-filename={`${classLabel}_${student.rollNo}_${student.name.replace(/[^a-z0-9]+/gi, '_')}`}
          >
            <MultiModeReportCard
              student={student as any}
              studentMarks={marks as any}
              examType={examType}
              examPeriod={decodedExamPeriod}
              academicYear={academicYear}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
