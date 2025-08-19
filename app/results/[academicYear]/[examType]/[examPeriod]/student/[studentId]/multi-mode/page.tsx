import { notFound } from "next/navigation"
import MultiModeReportCard from "@/components/multi-mode-report-card"
import ResultActions from "@/components/result-actions"
import { students, getStudentById } from "@/lib/data"
import { marksData } from "@/lib/class4-marks-data"
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

  // Dynamic id pattern: dbg-<class>-<roll>
  const match = studentId.match(/^dbg-(\d+)-(\d+)$/)
  if (match) {
    const classNum = parseInt(match[1], 10)
    const rollNo = parseInt(match[2], 10)
    const classData = marksData.find((c) => c.className === String(classNum))
    const studentInMarks = classData?.students.find((s) => s.rollNo === rollNo)

    if (studentInMarks) {
      return {
        id: studentId,
        name: studentInMarks.name,
        class: toOrdinal(classNum),
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

    // Resolve class data based on student's class (ordinal like "1st", "4th")
    const classNum = parseInt(student.class, 10)
    const classData = marksData.find((c) => c.className === String(classNum)) as ClassData | undefined
    const studentMarks = classData?.students.find((s) => s.name.toLowerCase() === student.name.toLowerCase())

    let totalMarks = 0
    let maxMarks = 0
    let percentage = 0
    let grade = "N/A"

    if (studentMarks && studentMarks.subjects) {
      const subjects = Object.keys(studentMarks.subjects)
      totalMarks = subjects.reduce((total, subject) => {
        const marks = studentMarks.subjects[subject]
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

    const ogImageUrl = "/logo.png"

    return {
      title: `${student.name} - ${examTypeFormatted} ${examPeriodFormatted} ${academicYear} Results | DBG Gurukulam`,
      description: `View ${student.name}'s comprehensive ${examTypeFormatted} ${examPeriodFormatted} ${academicYear} multi-mode assessment results`,
      openGraph: {
        title: `${student.name} - ${examTypeFormatted} ${examPeriodFormatted} Results`,
        description: `${student.name} scored ${percentage.toFixed(1)}% (Grade: ${grade}) in ${examTypeFormatted} ${examPeriodFormatted} ${academicYear}`,
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${student.name}'s Result Card` }],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${student.name} - ${examTypeFormatted} ${examPeriodFormatted} Results`,
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

export default async function MultiModeStudentResultPage({ params }: PageProps) {
  const { academicYear, examType, examPeriod, studentId } = params
  const decodedExamPeriod = decodeURIComponent(examPeriod)

  // Get student data
  const student = await getStudent(studentId)
  if (!student) {
    notFound()
  }

  // Resolve class data dynamically
  const classNum = parseInt(student.class, 10)
  const classData = marksData.find((c) => c.className === String(classNum)) as ClassData | undefined
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
    <div className="min-h-screen bg-gray-50">
      <ResultActions backUrl={backUrl} studentName={student.name} examLabel={examLabel} />
      <MultiModeReportCard
        student={student}
        studentMarks={studentMarks as any} // Type assertion needed due to type mismatch
        examType={examType}
        examPeriod={decodedExamPeriod}
        academicYear={academicYear}
      />
    </div>
  )
}
