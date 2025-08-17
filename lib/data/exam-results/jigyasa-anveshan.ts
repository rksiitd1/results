export interface ExamResult {
  studentId: string
  examType: "jigyasa-anveshan" | "bodha-manthan" | "pragya-siddhi"
  examPeriod: string
  academicYear: string
  academicMarks: {
    subject: string
    rawMarks: number
    total: number
    scaledMarks: number
    outOf: number
  }[]
  coActivities: {
    activity: string
    marks: number
    outOf: number
  }[]
  totalMarks: number
  maxMarks: number
  percentage: number
  grade: string
  remarks?: string
}

// Jigyāsa Anveshan Results for 2024-25
export const jigyasaAnveshan2024_25: ExamResult[] = [
  // Aarav Kumar (dbg-001) - Class 1st - April 2024
  {
    studentId: "dbg-001",
    examType: "jigyasa-anveshan",
    examPeriod: "I - April 2024",
    academicYear: "2024-25",
    academicMarks: [
      { subject: "Hindi", rawMarks: 45, total: 50, scaledMarks: 9.0, outOf: 10 },
      { subject: "English", rawMarks: 42, total: 50, scaledMarks: 8.4, outOf: 10 },
      { subject: "Science", rawMarks: 48, total: 50, scaledMarks: 9.6, outOf: 10 },
      { subject: "Social Science", rawMarks: 44, total: 50, scaledMarks: 8.8, outOf: 10 },
      { subject: "Mathematics", rawMarks: 49, total: 50, scaledMarks: 9.8, outOf: 10 },
      { subject: "Reasoning", rawMarks: 40, total: 50, scaledMarks: 8.0, outOf: 10 },
    ],
    coActivities: [
      { activity: "Discipline", marks: 5, outOf: 5 },
      { activity: "Project Work", marks: 4, outOf: 5 },
      { activity: "Attendance", marks: 5, outOf: 5 },
      { activity: "Yoga", marks: 5, outOf: 5 },
      { activity: "Class Participation", marks: 4, outOf: 5 },
      { activity: "Arts / Painting", marks: 4, outOf: 5 },
      { activity: "Oral Performance", marks: 5, outOf: 5 },
      { activity: "Fair Copy", marks: 5, outOf: 5 },
    ],
    totalMarks: 90.6,
    maxMarks: 100,
    percentage: 90.6,
    grade: "Excellent",
  },
  // Aarav Kumar (dbg-001) - May 2024
  {
    studentId: "dbg-001",
    examType: "jigyasa-anveshan",
    examPeriod: "II - May 2024",
    academicYear: "2024-25",
    academicMarks: [
      { subject: "Hindi", rawMarks: 46, total: 50, scaledMarks: 9.2, outOf: 10 },
      { subject: "English", rawMarks: 44, total: 50, scaledMarks: 8.8, outOf: 10 },
      { subject: "Science", rawMarks: 47, total: 50, scaledMarks: 9.4, outOf: 10 },
      { subject: "Social Science", rawMarks: 45, total: 50, scaledMarks: 9.0, outOf: 10 },
      { subject: "Mathematics", rawMarks: 48, total: 50, scaledMarks: 9.6, outOf: 10 },
      { subject: "Reasoning", rawMarks: 42, total: 50, scaledMarks: 8.4, outOf: 10 },
    ],
    coActivities: [
      { activity: "Discipline", marks: 5, outOf: 5 },
      { activity: "Project Work", marks: 4, outOf: 5 },
      { activity: "Attendance", marks: 5, outOf: 5 },
      { activity: "Yoga", marks: 5, outOf: 5 },
      { activity: "Class Participation", marks: 5, outOf: 5 },
      { activity: "Arts / Painting", marks: 4, outOf: 5 },
      { activity: "Oral Performance", marks: 5, outOf: 5 },
      { activity: "Fair Copy", marks: 5, outOf: 5 },
    ],
    totalMarks: 92.4,
    maxMarks: 100,
    percentage: 92.4,
    grade: "Excellent",
  },
  // Aarav Kumar (dbg-001) - June 2024
  {
    studentId: "dbg-001",
    examType: "jigyasa-anveshan",
    examPeriod: "III - June 2024",
    academicYear: "2024-25",
    academicMarks: [
      { subject: "Hindi", rawMarks: 47, total: 50, scaledMarks: 9.4, outOf: 10 },
      { subject: "English", rawMarks: 45, total: 50, scaledMarks: 9.0, outOf: 10 },
      { subject: "Science", rawMarks: 49, total: 50, scaledMarks: 9.8, outOf: 10 },
      { subject: "Social Science", rawMarks: 46, total: 50, scaledMarks: 9.2, outOf: 10 },
      { subject: "Mathematics", rawMarks: 50, total: 50, scaledMarks: 10.0, outOf: 10 },
      { subject: "Reasoning", rawMarks: 43, total: 50, scaledMarks: 8.6, outOf: 10 },
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
    totalMarks: 96.0,
    maxMarks: 100,
    percentage: 96.0,
    grade: "Outstanding",
  },
  // Ananya Sharma (dbg-002) - April 2024
  {
    studentId: "dbg-002",
    examType: "jigyasa-anveshan",
    examPeriod: "I - April 2024",
    academicYear: "2024-25",
    academicMarks: [
      { subject: "Hindi", rawMarks: 42, total: 50, scaledMarks: 8.4, outOf: 10 },
      { subject: "English", rawMarks: 40, total: 50, scaledMarks: 8.0, outOf: 10 },
      { subject: "Science", rawMarks: 44, total: 50, scaledMarks: 8.8, outOf: 10 },
      { subject: "Social Science", rawMarks: 41, total: 50, scaledMarks: 8.2, outOf: 10 },
      { subject: "Mathematics", rawMarks: 45, total: 50, scaledMarks: 9.0, outOf: 10 },
      { subject: "Reasoning", rawMarks: 38, total: 50, scaledMarks: 7.6, outOf: 10 },
    ],
    coActivities: [
      { activity: "Discipline", marks: 4, outOf: 5 },
      { activity: "Project Work", marks: 4, outOf: 5 },
      { activity: "Attendance", marks: 5, outOf: 5 },
      { activity: "Yoga", marks: 4, outOf: 5 },
      { activity: "Class Participation", marks: 4, outOf: 5 },
      { activity: "Arts / Painting", marks: 5, outOf: 5 },
      { activity: "Oral Performance", marks: 4, outOf: 5 },
      { activity: "Fair Copy", marks: 4, outOf: 5 },
    ],
    totalMarks: 84.0,
    maxMarks: 100,
    percentage: 84.0,
    grade: "Commendable",
  },
  // Shivansh Mishra (dbg-007) - June 2024
  {
    studentId: "dbg-007",
    examType: "jigyasa-anveshan",
    examPeriod: "III - June 2024",
    academicYear: "2024-25",
    academicMarks: [
      { subject: "Hindi", rawMarks: 42, total: 50, scaledMarks: 8.4, outOf: 10 },
      { subject: "English", rawMarks: 38, total: 50, scaledMarks: 7.6, outOf: 10 },
      { subject: "Science", rawMarks: 45, total: 50, scaledMarks: 9.0, outOf: 10 },
      { subject: "Social Science", rawMarks: 40, total: 50, scaledMarks: 8.0, outOf: 10 },
      { subject: "Mathematics", rawMarks: 48, total: 50, scaledMarks: 9.6, outOf: 10 },
      { subject: "Reasoning", rawMarks: 35, total: 50, scaledMarks: 7.0, outOf: 10 },
    ],
    coActivities: [
      { activity: "Discipline", marks: 4, outOf: 5 },
      { activity: "Project Work", marks: 3, outOf: 5 },
      { activity: "Attendance", marks: 5, outOf: 5 },
      { activity: "Yoga", marks: 5, outOf: 5 },
      { activity: "Class Participation", marks: 4, outOf: 5 },
      { activity: "Arts / Painting", marks: 4, outOf: 5 },
      { activity: "Oral Performance", marks: 4, outOf: 5 },
      { activity: "Fair Copy", marks: 5, outOf: 5 },
    ],
    totalMarks: 83.6,
    maxMarks: 100,
    percentage: 83.6,
    grade: "Commendable",
  },
]

// Jigyāsa Anveshan Results for 2025-26
export const jigyasaAnveshan2025_26: ExamResult[] = [
  // Aarav Kumar (dbg-001) - April 2025
  {
    studentId: "dbg-001",
    examType: "jigyasa-anveshan",
    examPeriod: "I - April 2025",
    academicYear: "2025-26",
    academicMarks: [
      { subject: "Hindi", rawMarks: 48, total: 50, scaledMarks: 9.6, outOf: 10 },
      { subject: "English", rawMarks: 47, total: 50, scaledMarks: 9.4, outOf: 10 },
      { subject: "Science", rawMarks: 49, total: 50, scaledMarks: 9.8, outOf: 10 },
      { subject: "Social Science", rawMarks: 48, total: 50, scaledMarks: 9.6, outOf: 10 },
      { subject: "Mathematics", rawMarks: 50, total: 50, scaledMarks: 10.0, outOf: 10 },
      { subject: "Reasoning", rawMarks: 46, total: 50, scaledMarks: 9.2, outOf: 10 },
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
    totalMarks: 97.6,
    maxMarks: 100,
    percentage: 97.6,
    grade: "Outstanding",
  },
  // Shivansh Mishra (dbg-007) - April 2025
  {
    studentId: "dbg-007",
    examType: "jigyasa-anveshan",
    examPeriod: "I - April 2025",
    academicYear: "2025-26",
    academicMarks: [
      { subject: "Hindi", rawMarks: 44, total: 50, scaledMarks: 8.8, outOf: 10 },
      { subject: "English", rawMarks: 41, total: 50, scaledMarks: 8.2, outOf: 10 },
      { subject: "Science", rawMarks: 46, total: 50, scaledMarks: 9.2, outOf: 10 },
      { subject: "Social Science", rawMarks: 43, total: 50, scaledMarks: 8.6, outOf: 10 },
      { subject: "Mathematics", rawMarks: 49, total: 50, scaledMarks: 9.8, outOf: 10 },
      { subject: "Reasoning", rawMarks: 38, total: 50, scaledMarks: 7.6, outOf: 10 },
    ],
    coActivities: [
      { activity: "Discipline", marks: 4, outOf: 5 },
      { activity: "Project Work", marks: 4, outOf: 5 },
      { activity: "Attendance", marks: 5, outOf: 5 },
      { activity: "Yoga", marks: 5, outOf: 5 },
      { activity: "Class Participation", marks: 4, outOf: 5 },
      { activity: "Arts / Painting", marks: 4, outOf: 5 },
      { activity: "Oral Performance", marks: 4, outOf: 5 },
      { activity: "Fair Copy", marks: 5, outOf: 5 },
    ],
    totalMarks: 87.2,
    maxMarks: 100,
    percentage: 87.2,
    grade: "Excellent",
  },
]
