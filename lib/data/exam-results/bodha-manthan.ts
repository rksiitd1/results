import type { ExamResult } from "./jigyasa-anveshan"

// Bodha Manthan Results for 2024-25
export const bodhaManthan2024_25: ExamResult[] = [
  // Aarav Kumar (dbg-001) - Mid-term September 2024
  {
    studentId: "dbg-001",
    examType: "bodha-manthan",
    examPeriod: "Mid-term - September 2024",
    academicYear: "2024-25",
    academicMarks: [
      { subject: "Hindi", rawMarks: 48, total: 50, scaledMarks: 9.6, outOf: 10 },
      { subject: "English", rawMarks: 46, total: 50, scaledMarks: 9.2, outOf: 10 },
      { subject: "Science", rawMarks: 49, total: 50, scaledMarks: 9.8, outOf: 10 },
      { subject: "Social Science", rawMarks: 47, total: 50, scaledMarks: 9.4, outOf: 10 },
      { subject: "Mathematics", rawMarks: 50, total: 50, scaledMarks: 10.0, outOf: 10 },
      { subject: "Reasoning", rawMarks: 45, total: 50, scaledMarks: 9.0, outOf: 10 },
    ],
    coActivities: [
      { activity: "Discipline", marks: 5, outOf: 5 },
      { activity: "Project Work", marks: 5, outOf: 5 },
      { activity: "Attendance", marks: 5, outOf: 5 },
      { activity: "Yoga", marks: 5, outOf: 5 },
      { activity: "Class Participation", marks: 5, outOf: 5 },
      { activity: "Arts / Painting", marks: 5, outOf: 5 },
      { activity: "Oral Performance", marks: 5, outOf: 5 },
      { activity: "Fair Copy", marks: 5, outOf: 5 },
    ],
    totalMarks: 97.0,
    maxMarks: 100,
    percentage: 97.0,
    grade: "Outstanding",
  },
]

// Bodha Manthan Results for 2025-26
export const bodhaManthan2025_26: ExamResult[] = [
  // Add future results here
]
