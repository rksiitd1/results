import { marksData } from "./data/marks-data"
import type { ExamResult } from "./data"

export function convertClass4MarksToResults(): ExamResult[] {
  const results: ExamResult[] = []

  const class4Data = marksData.find((cls) => cls.className === "4")
  if (!class4Data) return results

  class4Data.students.forEach((student, index) => {
    // Skip students with no marks data
    const hasAnyMarks = Object.values(student.subjects).some(
      (subject) => subject.written !== null || subject.oral !== null || subject.project !== null,
    )

    if (!hasAnyMarks) return

    // Convert to academic marks format
    const academicMarks = Object.entries(student.subjects).map(([subjectName, marks]) => {
      const written = marks.written || 0
      const oral = marks.oral || 0
      const project = marks.project || 0

      // Calculate total raw marks (assuming max 80 written + 10 oral + 10 project = 100)
      const rawTotal = written + oral + project
      const scaledMarks = (rawTotal / 100) * 10 // Scale to 10 points

      return {
        subject: subjectName,
        rawMarks: rawTotal,
        total: 100,
        scaledMarks: Math.round(scaledMarks * 10) / 10, // Round to 1 decimal
        outOf: 10,
      }
    })

    // Calculate totals
    const totalMarks = academicMarks.reduce((sum, subject) => sum + subject.scaledMarks, 0)
    const coActivitiesMarks = 35 // Default co-curricular marks
    const finalTotal = totalMarks + coActivitiesMarks
    const percentage = (finalTotal / 100) * 100

    // Determine grade
    let grade = "Needs Improvement"
    if (percentage >= 90) grade = "Outstanding"
    else if (percentage >= 80) grade = "Excellent"
    else if (percentage >= 70) grade = "Very Good"
    else if (percentage >= 60) grade = "Good"
    else if (percentage >= 50) grade = "Average"

    const result: ExamResult = {
      studentId: `dbg-4-${String(student.rollNo).padStart(3, "0")}`,
      examType: "bodha-manthan",
      examPeriod: "I - July 2025",
      academicYear: "2025-26",
      academicMarks,
      coActivities: [
        { activity: "Discipline", marks: 5, outOf: 5 },
        { activity: "Project Work", marks: 4, outOf: 5 },
        { activity: "Attendance", marks: 5, outOf: 5 },
        { activity: "Yoga", marks: 4, outOf: 5 },
        { activity: "Class Participation", marks: 4, outOf: 5 },
        { activity: "Arts / Painting", marks: 4, outOf: 5 },
        { activity: "Oral Performance", marks: 5, outOf: 5 },
        { activity: "Fair Copy", marks: 4, outOf: 5 },
      ],
      totalMarks: finalTotal,
      maxMarks: 100,
      percentage: Math.round(percentage * 10) / 10,
      grade,
    }

    results.push(result)
  })

  return results
}
