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

  const subjects = Object.keys(studentMarks.subjects)
  const totalMarks = subjects.reduce((total, subject) => {
    const marks = studentMarks.subjects[subject]
    return total + (marks.written || 0) + (marks.oral || 0) + (marks.project || 0)
  }, 0)
  const maxMarks = subjects.length * 100
  const percentage = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0

  // Calculate grade
  let grade = "E"
  if (percentage >= 95) grade = "A1"
  else if (percentage >= 90) grade = "A2"
  else if (percentage >= 80) grade = "B1"
  else if (percentage >= 70) grade = "B2"
  else if (percentage >= 60) grade = "C1"
  else if (percentage >= 50) grade = "C2"
  else if (percentage >= 40) grade = "D"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative">
          <ResultActions
            backUrl={backUrl}
            studentName={student.name}
            examLabel={examLabel}
            student={student}
            studentMarks={studentMarks}
            examType={examType}
            examPeriod={decodedExamPeriod}
            academicYear={academicYear}
          />

          {/* Premium Performance Header */}
          <div className="px-4 pb-8 pt-4">
            <div className="max-w-6xl mx-auto">
              <div className="glass-morphism rounded-3xl p-6 md:p-8 shadow-premium-lg animate-fade-in-up">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{student.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{student.name}</h1>
                        <p className="text-white/80 text-sm md:text-base">
                          Class {student.class} • Roll No. {studentMarks.rollNo}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 mt-4">
                      <p className="text-white/90 text-sm font-medium mb-1">Examination</p>
                      <p className="text-white text-lg font-semibold">
                        {examType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </p>
                      <p className="text-white/80 text-sm">
                        {decodedExamPeriod} • {academicYear}
                      </p>
                    </div>
                  </div>

                  {/* Performance Metrics Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-auto">
                    <div
                      className="bg-white/15 rounded-2xl p-4 text-center animate-slide-in-right"
                      style={{ animationDelay: "0.1s" }}
                    >
                      <div className="text-3xl font-bold text-white mb-1">{totalMarks}</div>
                      <div className="text-white/80 text-xs font-medium">Total Marks</div>
                      <div className="text-white/60 text-xs">out of {maxMarks}</div>
                    </div>

                    <div
                      className="bg-white/15 rounded-2xl p-4 text-center animate-slide-in-right"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <div className="text-3xl font-bold text-white mb-1">{percentage.toFixed(1)}%</div>
                      <div className="text-white/80 text-xs font-medium">Percentage</div>
                      <div className="text-white/60 text-xs">Overall Score</div>
                    </div>

                    <div
                      className="bg-white/15 rounded-2xl p-4 text-center animate-slide-in-right col-span-2 md:col-span-1"
                      style={{ animationDelay: "0.3s" }}
                    >
                      <div className="text-4xl font-bold text-white mb-1">{grade}</div>
                      <div className="text-white/80 text-xs font-medium">Grade</div>
                      <div className="text-white/60 text-xs">Performance</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative -mt-4">
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="bg-white rounded-3xl shadow-premium-lg overflow-hidden animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="p-2 md:p-6">
              <MultiModeReportCard
                student={student}
                studentMarks={studentMarks}
                examType={examType}
                examPeriod={decodedExamPeriod}
                academicYear={academicYear}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-premium animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground">Assessment Complete</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Multi-mode assessment covering written, oral, and project evaluations across all subjects.
              </p>
            </div>

            <div
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-premium animate-fade-in-up"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground">Performance Tracking</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Comprehensive evaluation across {subjects.length} subjects with detailed breakdown of each assessment
                mode.
              </p>
            </div>

            <div
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-premium animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground">Academic Excellence</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Holistic education approach combining traditional learning with modern assessment methodologies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
