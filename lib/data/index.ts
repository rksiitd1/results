// Re-export all data
export * from "./students"
export * from "./exam-results"
export * from "./question-papers"

// Helper functions
import { students, type StudentData } from "./students"
import { examResults, type ExamResult } from "./exam-results"

export function findStudent(className: string, rollNo: string, name: string): StudentData | null {
  const student = students.find(
    (s) => s.class === className && s.rollNo === rollNo && s.name.toLowerCase() === name.toLowerCase(),
  )
  return student || null
}

export function getExamResult(
  studentId: string,
  examType: string,
  examPeriod: string,
  academicYear?: string,
): ExamResult | undefined {
  return examResults.find(
    (result) =>
      result.studentId === studentId &&
      result.examType === examType &&
      result.examPeriod === examPeriod &&
      (academicYear ? result.academicYear === academicYear : true),
  )
}

export function getStudentById(studentId: string): StudentData | undefined {
  return students.find((student) => student.id === studentId)
}

export function getStudentResults(studentId: string): ExamResult[] {
  return examResults.filter((result) => result.studentId === studentId)
}

export function getAvailableExamPeriods(academicYear: string, examType: string): string[] {
  const periods = examResults
    .filter((result) => result.academicYear === academicYear && result.examType === examType)
    .map((result) => result.examPeriod)

  return [...new Set(periods)].sort()
}

export function getClassStats(className: string): {
  totalStudents: number
  totalResults: number
} {
  const classStudents = students.filter((s) => s.class === className)
  const classResults = examResults.filter((r) => classStudents.some((s) => s.id === r.studentId))

  return {
    totalStudents: classStudents.length,
    totalResults: classResults.length,
  }
}
