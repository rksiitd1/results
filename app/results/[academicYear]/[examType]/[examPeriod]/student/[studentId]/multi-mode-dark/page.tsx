import { notFound } from "next/navigation"
import MultiModeReportCard from "@/components/multi-mode-report-card"
import ResultActions from "@/components/result-actions"
import { students } from "@/lib/data"
import { marksData } from "@/lib/data/marks-data"
import type { Metadata } from "next"

interface PageProps {
  params: {
    academicYear: string
    examType: string
    examPeriod: string
    studentId: string
  }
}

// Type for subject marks in the marks data
type SubjectMarks = {
  written: number | null
  oral: number | null
  project: number | null
}

// Interface for student marks in the marks data
interface StudentMarks {
  rollNo: number
  name: string
  subjects: {
    [subject: string]: SubjectMarks
  }
}

// Interface for class data in the marks data
interface ClassData {
  className: string
  students: StudentMarks[]
}

// Helper to convert class number to ordinal string (e.g., 1 -> "1st")
function toOrdinal(n: number): string {
  if (n === 1) return "1st"
  if (n === 2) return "2nd"
  if (n === 3) return "3rd"
  return `${n}th`
}

// Helper function to get student data (supports dynamic ids like dbg-<class>-<roll>)
async function getStudent(studentId: string) {
  // First check in regular students
  const student = students.find((s) => s.id === studentId)

  if (student) return student

  // Dynamic id pattern: dbg-<classToken>-<roll> (classToken can be numeric like '1' or alpha like 'UKG')
  const match = studentId.match(/^dbg-([A-Za-z0-9]+)-(\d+)$/)
  if (match) {
    const classToken = match[1]
    const rollNo = parseInt(match[2], 10)
    const classData = marksData.find((c) => c.className === String(classToken))
    const studentInMarks = classData?.students.find((s) => s.rollNo === rollNo)

    if (studentInMarks) {
      return {
        id: studentId,
        name: studentInMarks.name,
        class: /^[0-9]+$/.test(classToken) ? toOrdinal(parseInt(classToken, 10)) : classToken,
        rollNo: studentInMarks.rollNo.toString().padStart(2, '0'),
        fatherName: '',
        motherName: '',
        academicYear: ''
      }
    }
  }

  return null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { academicYear, examType, examPeriod, studentId } = params
    const decodedExamPeriod = decodeURIComponent(examPeriod)

    // Get student data
    const student = await getStudent(studentId)

    if (!student) {
      return {
        title: "Student Not Found | DBG Gurukulam",
      }
    }

    const examTypeFormatted = examType.replace("-", " ").replace(/\b\w/g, (l: string) => l.toUpperCase())
    const examPeriodFormatted = decodedExamPeriod.replace(/\b\w/g, (l: string) => l.toUpperCase())

    // Resolve class data based on student's class (ordinal like "1st" or token like "UKG")
    const parsedNum = parseInt(student.class, 10)
    const classKey = Number.isNaN(parsedNum) ? student.class : String(parsedNum)
    const classData = marksData.find((c) => c.className === String(classKey)) as ClassData | undefined
    const studentMarks = classData?.students.find((s) => s.name.toLowerCase() === student.name.toLowerCase())

    let totalMarks = 0
    let maxMarks = 0
    let percentage = 0
    let grade = "N/A"

    if (studentMarks && studentMarks.subjects) {
      const subjects = Object.keys(studentMarks.subjects)
      totalMarks = subjects.reduce((total, subject) => {
        const marks = studentMarks!.subjects[subject]
        return total + (marks.written || 0) + (marks.oral || 0) + (marks.project || 0)
      }, 0)
      maxMarks = subjects.length * 100 // 80 + 10 + 10 per subject
      percentage = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0

      // Calculate grade
      if (percentage >= 95) grade = "A1"
      else if (percentage >= 90) grade = "A2"
      else if (percentage >= 80) grade = "B1"
      else if (percentage >= 70) grade = "B2"
      else if (percentage >= 60) grade = "C1"
      else if (percentage >= 50) grade = "C2"
      else if (percentage >= 40) grade = "D"
      else grade = "E"
    }

    const ogImageUrl = "/OG-image.png"

    return {
      title: `${student.name} - ${examTypeFormatted} ${examPeriodFormatted} ${academicYear} Results (Monochrome) | DBG Gurukulam`,
      description: `View ${student.name}'s monochrome ${examTypeFormatted} ${examPeriodFormatted} ${academicYear} multi-mode assessment results`,
      openGraph: {
        title: `${student.name} - ${examTypeFormatted} ${examPeriodFormatted} Results (Monochrome)`,
        description: `${student.name} scored ${percentage.toFixed(1)}% (Grade: ${grade}) in ${examTypeFormatted} ${examPeriodFormatted} ${academicYear}`,
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${student.name}'s Result Card` }],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${student.name} - ${examTypeFormatted} ${examPeriodFormatted} Results (Monochrome)`,
        description: `${student.name} scored ${percentage.toFixed(1)}% (Grade: ${grade}) in ${examTypeFormatted} ${examPeriodFormatted} ${academicYear}`,
        images: [ogImageUrl],
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Error | DBG Gurukulam",
      description: "An error occurred while loading the student's results.",
    }
  }
}

export default async function MultiModeStudentResultPageMono({ params }: PageProps) {
  const { academicYear, examType, examPeriod, studentId } = params
  const decodedExamPeriod = decodeURIComponent(examPeriod)

  // Get student data
  const student = await getStudent(studentId)
  if (!student) {
    notFound()
  }

  // Resolve class data dynamically for numeric (e.g., '1st') or token classes (e.g., 'UKG')
  const parsedNum = parseInt(student.class, 10)
  const classKey = Number.isNaN(parsedNum) ? student.class : String(parsedNum)
  const classData = marksData.find((c) => c.className === String(classKey)) as ClassData | undefined
  if (!classData) {
    console.error(`Class data not found for class ${student.class}`)
    notFound()
  }

  // Find student marks by roll number for more reliable matching
  const rollNo = student.rollNo ? parseInt(student.rollNo, 10) : null
  let studentMarks: StudentMarks | undefined

  if (rollNo) {
    // First try to find by roll number if available
    studentMarks = classData.students.find((s) => s.rollNo === rollNo)
  }

  // Fall back to name matching if roll number not found or not available
  if (!studentMarks) {
    studentMarks = classData.students.find((s) =>
      s.name.toLowerCase() === student.name.toLowerCase()
    )
  }

  if (!studentMarks) {
    console.error(`Student marks not found for ${student.name} (Roll: ${student.rollNo})`)
    notFound()
  }

  const backUrl = `https://dbggurukulam.com/results/${academicYear}/${examType}/${examPeriod}`
  const examLabel = `${examType.replace("-", " ").replace(/\b\w/g, (l: string) => l.toUpperCase())} - ${decodedExamPeriod} (${academicYear})`

  return (
    <div className="min-h-screen bg-white">
      {/* Monochrome overrides for on-screen and print */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* Scope to the container to avoid affecting the whole app */
          .monochrome-print, .monochrome-print * { box-shadow: none !important; text-shadow: none !important; }
          .monochrome-print { color: #000 !important; background: #fff !important; }
          .monochrome-print * { color: #000 !important; background: transparent !important; border-color: #000 !important; }
          .monochrome-print img { filter: grayscale(100%) contrast(120%); }
          .monochrome-print svg { filter: grayscale(100%) contrast(120%); }
          .monochrome-print [class*="border-"], .monochrome-print .border { border-color: #000 !important; }
          .monochrome-print .text-muted-foreground { color: #000 !important; }
          .monochrome-print .bg-muted, .monochrome-print .bg-gray-50, .monochrome-print .bg-gray-100, .monochrome-print .bg-slate-50 { background: #fff !important; }
          .monochrome-print .ring, .monochrome-print [class*="ring-"] { --tw-ring-color: #000 !important; }
          .monochrome-print hr { border-color: #000 !important; }
          /* Tables */
          .monochrome-print table { border-color: #000 !important; }
          .monochrome-print th, .monochrome-print td { border-color: #000 !important; }

          /* Print-specific rules */
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .monochrome-print { background: #fff !important; color: #000 !important; }
            .no-print { display: none !important; }
          }
        `,
        }}
      />

      <div className="monochrome-print">
        <div className="no-print">
          <ResultActions backUrl={backUrl} studentName={student.name} examLabel={examLabel} />
        </div>
        <MultiModeReportCard
          student={student}
          studentMarks={studentMarks as any}
          examType={examType}
          examPeriod={decodedExamPeriod}
          academicYear={academicYear}
        />
      </div>
    </div>
  )
}
