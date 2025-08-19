// Re-export all data
export * from "./students"
export * from "./exam-results"
export * from "./question-papers"

// Helper functions
import { students, type StudentData } from "./students"
import { examResults, type ExamResult } from "./exam-results"
import { marksData } from "./marks-data"

// Normalize name for comparison (lowercase and trim)
const normalizeName = (name: string | undefined | null): string => {
  if (!name) return ''
  return name.toString().trim().toLowerCase()
}

export function findStudent(className: string, rollNo: string, name: string): StudentData | null {
  const normalizedSearchName = normalizeName(name)

  // First check in the main students array with partial name match
  let student = students.find(
    (s) => s.class === className &&
           s.rollNo === rollNo &&
           normalizeName(s.name).includes(normalizedSearchName)
  )

  if (student) return student

  // Fallback to marksData for any class present there (supports numeric like '1' and tokens like 'UKG')
  const numeric = parseInt(className, 10)
  const classKey = Number.isNaN(numeric) ? className : String(numeric)
  const md = marksData.find(c => c.className === classKey)
  if (md) {
    const rollNum = parseInt(rollNo, 10)
    const studentInMarks = md.students.find(
      s => s.rollNo === rollNum && normalizeName(s.name).includes(normalizedSearchName)
    )
    if (studentInMarks) {
      return {
        id: `dbg-${md.className}-${studentInMarks.rollNo.toString().padStart(3, '0')}`,
        name: studentInMarks.name,
        class: className,
        rollNo: studentInMarks.rollNo.toString().padStart(2, '0'),
        fatherName: '',
        motherName: '',
        academicYear: ''
      }
    }
  }

  return null
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
