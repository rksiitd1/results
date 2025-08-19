export interface StudentData {
  id: string
  name: string
  class: string
  rollNo: string
  fatherName: string
  motherName: string
  academicYear: string // When they got registered
}

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

export const academicYears = ["2025-26", "2024-25"]

export const classes = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"]

// Students registered in 2024-25
export const students: StudentData[] = [
  // Class 1st
  {
    id: "dbg-001",
    name: "Aarav Kumar",
    class: "1st",
    rollNo: "01",
    fatherName: "Ramesh Kumar",
    motherName: "Sunita Devi",
    academicYear: "2024-25",
  },
  {
    id: "dbg-002",
    name: "Ananya Sharma",
    class: "1st",
    rollNo: "02",
    fatherName: "Suresh Sharma",
    motherName: "Priya Devi",
    academicYear: "2024-25",
  },

  // Class 2nd
  {
    id: "dbg-003",
    name: "Arjun Singh",
    class: "2nd",
    rollNo: "01",
    fatherName: "Manoj Singh",
    motherName: "Kavita Devi",
    academicYear: "2024-25",
  },
  {
    id: "dbg-004",
    name: "Riya Kumari",
    class: "2nd",
    rollNo: "02",
    fatherName: "Santosh Kumar",
    motherName: "Meera Devi",
    academicYear: "2024-25",
  },

  // Class 3rd
  {
    id: "dbg-005",
    name: "Vihaan Gupta",
    class: "3rd",
    rollNo: "01",
    fatherName: "Rajesh Gupta",
    motherName: "Sita Devi",
    academicYear: "2024-25",
  },
  {
    id: "dbg-006",
    name: "Diya Yadav",
    class: "3rd",
    rollNo: "02",
    fatherName: "Dinesh Yadav",
    motherName: "Gita Devi",
    academicYear: "2024-25",
  },

  // Class 4th
  {
    id: "dbg-007",
    name: "Shivansh Mishra",
    class: "4th",
    rollNo: "01",
    fatherName: "Mukesh Mishra",
    motherName: "Rita Devi",
    academicYear: "2024-25",
  },
  {
    id: "dbg-008",
    name: "Pihu Pandey",
    class: "4th",
    rollNo: "02",
    fatherName: "Naresh Pandey",
    motherName: "Anita Devi",
    academicYear: "2024-25",
  },

  // Class 5th
  {
    id: "dbg-009",
    name: "Aditya Tiwari",
    class: "5th",
    rollNo: "01",
    fatherName: "Rakesh Tiwari",
    motherName: "Lalita Devi",
    academicYear: "2024-25",
  },
  {
    id: "dbg-010",
    name: "Kavya Jha",
    class: "5th",
    rollNo: "02",
    fatherName: "Shyam Jha",
    motherName: "Mamta Devi",
    academicYear: "2024-25",
  },

  // Class 6th
  {
    id: "dbg-011",
    name: "Reyansh Thakur",
    class: "6th",
    rollNo: "01",
    fatherName: "Mahesh Thakur",
    motherName: "Shanti Devi",
    academicYear: "2024-25",
  },
  {
    id: "dbg-012",
    name: "Prisha Verma",
    class: "6th",
    rollNo: "02",
    fatherName: "Sunil Verma",
    motherName: "Kavita Devi",
    academicYear: "2024-25",
  },

  // Class 7th
  {
    id: "dbg-013",
    name: "Ayaan Sinha",
    class: "7th",
    rollNo: "01",
    fatherName: "Ravi Sinha",
    motherName: "Pooja Devi",
    academicYear: "2024-25",
  },
  {
    id: "dbg-014",
    name: "Myra Prasad",
    class: "7th",
    rollNo: "02",
    fatherName: "Anil Prasad",
    motherName: "Rekha Devi",
    academicYear: "2024-25",
  },

  // Class 8th
  {
    id: "dbg-015",
    name: "Krishna Roy",
    class: "8th",
    rollNo: "01",
    fatherName: "Gopal Roy",
    motherName: "Radha Devi",
    academicYear: "2024-25",
  },
  {
    id: "dbg-016",
    name: "Saanvi Das",
    class: "8th",
    rollNo: "02",
    fatherName: "Bijoy Das",
    motherName: "Mala Devi",
    academicYear: "2024-25",
  },

  // Class 9th
  {
    id: "dbg-017",
    name: "Ishaan Chaudhary",
    class: "9th",
    rollNo: "01",
    fatherName: "Vinod Chaudhary",
    motherName: "Usha Devi",
    academicYear: "2024-25",
  },
  {
    id: "dbg-018",
    name: "Aanya Raj",
    class: "9th",
    rollNo: "02",
    fatherName: "Deepak Raj",
    motherName: "Nisha Devi",
    academicYear: "2024-25",
  },

  // Class 10th
  {
    id: "dbg-019",
    name: "Shaurya Ranjan",
    class: "10th",
    rollNo: "01",
    fatherName: "Ashok Ranjan",
    motherName: "Seema Devi",
    academicYear: "2024-25",
  },
  {
    id: "dbg-020",
    name: "Navya Singh",
    class: "10th",
    rollNo: "02",
    fatherName: "Pankaj Singh",
    motherName: "Sunita Devi",
    academicYear: "2024-25",
  },

  // Class 11th
  {
    id: "dbg-021",
    name: "Atharv Sharma",
    class: "11th",
    rollNo: "01",
    fatherName: "Mohan Sharma",
    motherName: "Kiran Devi",
    academicYear: "2024-25",
  },
  {
    id: "dbg-022",
    name: "Pari Gupta",
    class: "11th",
    rollNo: "02",
    fatherName: "Sanjay Gupta",
    motherName: "Asha Devi",
    academicYear: "2024-25",
  },

  // Class 12th
  {
    id: "dbg-023",
    name: "Advik Kumar",
    class: "12th",
    rollNo: "01",
    fatherName: "Ramesh Kumar",
    motherName: "Geeta Devi",
    academicYear: "2024-25",
  },
  {
    id: "dbg-024",
    name: "Avni Yadav",
    class: "12th",
    rollNo: "02",
    fatherName: "Suresh Yadav",
    motherName: "Meena Devi",
    academicYear: "2024-25",
  },

  // Class 4 students from the new marks data
  {
    id: "dbg-4-001",
    name: "Aditya Kumar",
    class: "4th",
    rollNo: "01",
    fatherName: "Rajesh Kumar",
    motherName: "Sunita Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-002",
    name: "Lalan Kumar",
    class: "4th",
    rollNo: "02",
    fatherName: "Manoj Kumar",
    motherName: "Priya Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-003",
    name: "Dipika Kumari",
    class: "4th",
    rollNo: "03",
    fatherName: "Santosh Kumar",
    motherName: "Meera Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-004",
    name: "Vaishnavi Kumari",
    class: "4th",
    rollNo: "04",
    fatherName: "Dinesh Kumar",
    motherName: "Gita Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-005",
    name: "Arpita Kumari",
    class: "4th",
    rollNo: "05",
    fatherName: "Mukesh Kumar",
    motherName: "Rita Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-006",
    name: "Prince Kumar",
    class: "4th",
    rollNo: "06",
    fatherName: "Naresh Kumar",
    motherName: "Anita Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-007",
    name: "Vivek Kumar",
    class: "4th",
    rollNo: "07",
    fatherName: "Rakesh Kumar",
    motherName: "Lalita Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-008",
    name: "Amit Kumar",
    class: "4th",
    rollNo: "08",
    fatherName: "Shyam Kumar",
    motherName: "Mamta Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-009",
    name: "Shivansh Kumar",
    class: "4th",
    rollNo: "09",
    fatherName: "Mahesh Kumar",
    motherName: "Shanti Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-010",
    name: "Abhishek Kumar",
    class: "4th",
    rollNo: "10",
    fatherName: "Sunil Kumar",
    motherName: "Kavita Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-011",
    name: "Aryan Kumar",
    class: "4th",
    rollNo: "11",
    fatherName: "Ravi Kumar",
    motherName: "Pooja Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-012",
    name: "Amit Anand",
    class: "4th",
    rollNo: "12",
    fatherName: "Anil Anand",
    motherName: "Rekha Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-013",
    name: "Manish Kumar",
    class: "4th",
    rollNo: "13",
    fatherName: "Gopal Kumar",
    motherName: "Radha Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-014",
    name: "Bal Krishna",
    class: "4th",
    rollNo: "14",
    fatherName: "Bijoy Krishna",
    motherName: "Mala Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-015",
    name: "Mithi Singh",
    class: "4th",
    rollNo: "15",
    fatherName: "Vinod Singh",
    motherName: "Usha Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-016",
    name: "Aditya Anand",
    class: "4th",
    rollNo: "16",
    fatherName: "Deepak Anand",
    motherName: "Nisha Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-017",
    name: "Roshan Kumar",
    class: "4th",
    rollNo: "17",
    fatherName: "Ashok Kumar",
    motherName: "Seema Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-018",
    name: "Navneet Kumar",
    class: "4th",
    rollNo: "18",
    fatherName: "Pankaj Kumar",
    motherName: "Sunita Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-019",
    name: "Prince Raj",
    class: "4th",
    rollNo: "19",
    fatherName: "Mohan Raj",
    motherName: "Kiran Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-020",
    name: "Durgesh Kumar",
    class: "4th",
    rollNo: "20",
    fatherName: "Sanjay Kumar",
    motherName: "Asha Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-021",
    name: "Lakshya Kumar",
    class: "4th",
    rollNo: "21",
    fatherName: "Ramesh Kumar",
    motherName: "Geeta Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-022",
    name: "Suniti Kumari",
    class: "4th",
    rollNo: "22",
    fatherName: "Suresh Kumar",
    motherName: "Meena Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-023",
    name: "Nisha Rani",
    class: "4th",
    rollNo: "23",
    fatherName: "Rajesh Rani",
    motherName: "Sita Devi",
    academicYear: "2025-26",
  },
  {
    id: "dbg-4-024",
    name: "Aman Kumar",
    class: "4th",
    rollNo: "24",
    fatherName: "Dinesh Kumar",
    motherName: "Gita Devi",
    academicYear: "2025-26",
  },
]

// Exam Results
import { convertClass4MarksToResults } from "./class4-results-converter"

export const examResults: ExamResult[] = [
  // 2024-25 Academic Year Results

  // Aarav Kumar (dbg-001) - Class 1st
  // Jigyāsa Anveshan I - April 2024
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

  // Aarav Kumar (dbg-001) - Jigyāsa Anveshan II - May 2024
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

  // Aarav Kumar (dbg-001) - Jigyāsa Anveshan III - June 2024
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

  // Aarav Kumar (dbg-001) - Bodha Manthan Mid-term - September 2024
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

  // Ananya Sharma (dbg-002) - Class 1st
  // Jigyāsa Anveshan I - April 2024
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

  // Shivansh Mishra (dbg-007) - Class 4th
  // Jigyāsa Anveshan III - June 2024
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

  // 2025-26 Academic Year Results

  // Aarav Kumar (dbg-001) - Jigyāsa Anveshan I - April 2025
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

  // Shivansh Mishra (dbg-007) - Jigyāsa Anveshan I - April 2025
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

  // Add converted Class 4 results
  ...convertClass4MarksToResults(),
]

// Question paper data structure (sample)
export const questionPapers = {
  "12": {
    Physics: {
      chapters: [
        {
          name: "Electrostatics",
          sets: [
            {
              set: 1,
              questions: [
                {
                  number: 1,
                  text: "Define electric field. State and explain Gauss's law.",
                  marks: 5,
                },
                {
                  number: 2,
                  text: "A point charge of 2μC is placed at the origin. Calculate the electric field at a point 10cm away.",
                  marks: 3,
                },
                {
                  number: 3,
                  text: "Explain the concept of electric flux with a diagram.",
                  marks: 2,
                },
              ],
            },
          ],
        },
      ],
    },
  },
  "10": {
    Math: {
      chapters: [
        {
          name: "Real Numbers",
          sets: [
            {
              set: 1,
              questions: [
                {
                  number: 1,
                  text: "State Euclid's division lemma. Use it to find the HCF of 56 and 72.",
                  marks: 4,
                },
                {
                  number: 2,
                  text: "Prove that \u221A2 is an irrational number.",
                  marks: 3,
                },
                {
                  number: 3,
                  text: "If the HCF of 65 and 117 is expressible in the form 65m - 117n, find the value of m and n.",
                  marks: 3,
                },
              ],
            },
          ],
        },
      ],
    },
  },
}

export const examTypes = {
  "jigyasa-anveshan": "Jigyāsa Anveshan (Monthly)",
  "bodha-manthan": "Bodha Manthan (Term-End)",
  "pragya-siddhi": "Pragya Siddhi (Annual)",
}

import { marksData } from "./class4-marks-data"

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
  
  // If not found in main list, check marksData for the given class (supports all classes present there)
  if (!student) {
    const classNum = parseInt(className, 10) // handles ordinals like "1st", "4th"
    if (!Number.isNaN(classNum)) {
      const classData = marksData.find(c => c.className === String(classNum))
      if (classData) {
        const rollNum = parseInt(rollNo, 10)
        const studentInMarks = classData.students.find(
          s => s.rollNo === rollNum && normalizeName(s.name).includes(normalizedSearchName)
        )
        if (studentInMarks) {
          // Convert to StudentData format
          return {
            id: `dbg-${classNum}-${studentInMarks.rollNo.toString().padStart(3, '0')}`,
            name: studentInMarks.name,
            class: className,
            rollNo: studentInMarks.rollNo.toString().padStart(2, '0'),
            fatherName: '', // Not available in marks data
            motherName: '',
            academicYear: ''
          }
        }
      }
    }
  }
  
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
