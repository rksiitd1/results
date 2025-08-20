import { notFound } from "next/navigation"
import type { Metadata } from "next"
import MultiModeReportCard from "@/components/multi-mode-report-card"
import ResultActionsAll from "@/components/result-actions-all"
import MonochromeToggle from "@/components/monochrome-toggle"
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
  if (!Number.isNaN(n)) return 2 + n
  return 100
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { academicYear, examType, examPeriod } = params
  const decodedExamPeriod = decodeURIComponent(examPeriod)
  return {
    title: `All Students (Monochrome) - ${examType.replace("-", " ").replace(/\\b\\w/g, (l: string) => l.toUpperCase())} ${decodedExamPeriod} (${academicYear}) | DBG Gurukulam`,
    description: `Monochrome-optimized view of all students' multi-mode assessment results for ${decodedExamPeriod} ${academicYear}.`,
  }
}

export default async function MultiModeAllDarkPage({ params }: PageProps) {
  const { academicYear, examType, examPeriod } = params
  const decodedExamPeriod = decodeURIComponent(examPeriod)

  const classes: ClassData[] = [...marksData]
  if (!classes.length) notFound()

  classes.sort((a, b) => classOrderKey(a.className) - classOrderKey(b.className))

  const items: { student: StudentDataForCard; marks: StudentMarks; classLabel: string }[] = []

  for (const c of classes) {
    const studentsSorted = [...c.students].sort((s1, s2) => s1.rollNo - s2.rollNo)
    for (const sm of studentsSorted) {
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
    <div className="min-h-screen bg-white">
      <MonochromeToggle targetId="mono-root" />

      {/* Scoped monochrome overrides and heavier borders */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          #mono-root.monochrome-print {
            color: #000 !important;
            background: #fff !important;
          }
          #mono-root.monochrome-print * { color: #000 !important; box-shadow: none !important; text-shadow: none !important; }
          #mono-root.monochrome-print img { filter: grayscale(100%) contrast(110%); }
          #mono-root.monochrome-print [class*="bg-"] { background: #fff !important; }
          #mono-root.monochrome-print [class*="text-"],
          #mono-root.monochrome-print .text-primary,
          #mono-root.monochrome-print .text-muted-foreground { color: #000 !important; }
          #mono-root.monochrome-print .border,
          #mono-root.monochrome-print [class*="border-"],
          #mono-root.monochrome-print table,
          #mono-root.monochrome-print th,
          #mono-root.monochrome-print td,
          #mono-root.monochrome-print hr { border-color: #000 !important; }

          /* Heavier borders for B/W clarity */
          #mono-root.monochrome-print table { border-width: 2px !important; border-collapse: collapse !important; }
          #mono-root.monochrome-print th, #mono-root.monochrome-print td { border-width: 1.5px !important; }
          #mono-root.monochrome-print .card, #mono-root.monochrome-print .shadow, #mono-root.monochrome-print .ring-1 { border: 2px solid #000 !important; box-shadow: none !important; }

          /* Ensure one page per card during print */
          @media print {
            .print\:hidden { display: none !important; }
            #mono-root .report-card { break-after: page; page-break-after: always; }
          }
        `,
        }}
      />

      <div id="mono-root" className="monochrome-print">
        <ResultActionsAll backUrl={backUrl} />

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
    </div>
  )
}
