import { notFound } from "next/navigation"
import { getStudentById, getExamResult } from "@/lib/data"
import StudentReportCard from "@/components/student-report-card"
import ResultActions from "@/components/result-actions"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{
    academicYear: string
    examType: string
    examPeriod: string
    studentId: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const { academicYear, examType, examPeriod: rawExamPeriod, studentId } = resolvedParams

  const student = getStudentById(studentId)
  const examPeriod = decodeURIComponent(rawExamPeriod)

  if (!student) {
    return {
      title: "Student Not Found | DBG Gurukulam",
    }
  }

  const examTypeFormatted = examType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
  const examPeriodFormatted = examPeriod.replace(/\b\w/g, (l) => l.toUpperCase())

  const examResult = getExamResult(studentId, examType, examPeriod, academicYear)

  const ogImageUrl = "/logo.png"

  return {
    title: `${student.name} - ${examTypeFormatted} ${examPeriodFormatted} ${academicYear} Results | DBG Gurukulam`,
    description: `View ${student.name}'s ${examTypeFormatted} ${examPeriodFormatted} ${academicYear} exam results and report card`,
    openGraph: {
      title: `${student.name} - ${examTypeFormatted} ${examPeriodFormatted} Results`,
      description: `${student.name} scored ${examResult?.percentage}% (Grade: ${examResult?.grade}) in ${examTypeFormatted} ${examPeriodFormatted} ${academicYear}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${student.name}'s Result Card` }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${student.name} - ${examTypeFormatted} ${examPeriodFormatted} Results`,
      description: `${student.name} scored ${examResult?.percentage}% (Grade: ${examResult?.grade}) in ${examTypeFormatted} ${examPeriodFormatted} ${academicYear}`,
      images: [ogImageUrl],
    },
  }
}

export default async function ResultPage({ params }: PageProps) {
  const resolvedParams = await params
  const { academicYear, examType, examPeriod: rawExamPeriod, studentId } = resolvedParams

  const student = getStudentById(studentId)
  const examPeriod = decodeURIComponent(rawExamPeriod)
  const examResult = getExamResult(studentId, examType, examPeriod, academicYear)

  if (!student || !examResult) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation & actions – hidden on print */}
      <ResultActions
        backUrl={`/results/${academicYear}/${examType}/${encodeURIComponent(examPeriod)}`}
        studentName={student.name}
        examLabel={examPeriod}
      />

      {/* Report Card */}
      <StudentReportCard student={student} examResult={examResult} />
    </div>
  )
}
