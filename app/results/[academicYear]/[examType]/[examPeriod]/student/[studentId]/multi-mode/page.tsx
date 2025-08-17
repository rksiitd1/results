import { notFound } from "next/navigation"
import MultiModeReportCard from "@/components/multi-mode-report-card" // Reverting to use regular multi-mode-report-card for display
import ResultActions from "@/components/result-actions"
import { students } from "@/lib/data"
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { academicYear, examType, examPeriod, studentId } = params
  const decodedExamPeriod = decodeURIComponent(examPeriod)

  const student = students.find((s) => s.id === studentId)

  if (!student) {
    return {
      title: "Student Not Found | DBG Gurukulam",
    }
  }

  const examTypeFormatted = examType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
  const examPeriodFormatted = decodedExamPeriod.replace(/\b\w/g, (l) => l.toUpperCase())

  const class4Data = marksData.find((c) => c.className === "4")
  const studentMarks = class4Data?.students.find((s) => s.name === student.name)

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
}

export default function MultiModeStudentResultPage({ params }: PageProps) {
  const { academicYear, examType, examPeriod, studentId } = params

  // Decode the exam period
  const decodedExamPeriod = decodeURIComponent(examPeriod)

  // Find the student
  const student = students.find((s) => s.id === studentId)
  if (!student) {
    notFound()
  }

  const class4Data = marksData.find((c) => c.className === "4")
  if (!class4Data) {
    notFound()
  }

  const studentMarks = class4Data.students.find((s) => s.name === student.name)
  if (!studentMarks) {
    notFound()
  }

  const backUrl = `/results/${academicYear}/${examType}/${examPeriod}`
  const examLabel = `${examType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())} - ${decodedExamPeriod} (${academicYear})`

  return (
    <div className="min-h-screen bg-gray-50">
      <ResultActions backUrl={backUrl} studentName={student.name} examLabel={examLabel} />
      <MultiModeReportCard
        student={student}
        studentMarks={studentMarks}
        examType={examType}
        examPeriod={decodedExamPeriod}
        academicYear={academicYear}
      />
    </div>
  )
}
