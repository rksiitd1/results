// marksData.ts

// --- TYPE DEFINITIONS ---

// Defines the allowed modes for an assessment.
type Mode = "written" | "oral" | "project"

// Represents the marks for a single subject, with all three modes always present.
// A value of 'null' indicates that marks have not been entered yet.
interface SubjectMarks {
  written: number | null
  oral: number | null
  project: number | null
}

// Represents a single student, including their roll number, name, and marks.
interface Student {
  rollNo: number
  name: string
  subjects: {
    [subject: string]: SubjectMarks
  }
}

// Represents an entire class, containing the class name and a list of its students.
interface ClassData {
  className: string
  students: Student[]
}

// --- ACTUAL DATASET ---

export const marksData: ClassData[] = [
  // Data for other classes (Nursery, UKG, 1, 7) would go here.

  // --- CLASS 4 DATA (Updated with Project Marks) ---
  {
    className: "4",
    students: [
      {
        rollNo: 1,
        name: "Aditya Kumar", // Matched with "Aditya Raj"
        subjects: {
          English: { written: 17, oral: 7, project: 10 },
          Hindi: { written: 54, oral: 7, project: 9 },
          Math: { written: 64, oral: 8, project: 8 },
          EVS: { written: 48, oral: 7, project: 9 },
        },
      },
      {
        rollNo: 2,
        name: "Lalan Kumar",
        subjects: {
          English: { written: 0, oral: 5, project: 4 },
          Hindi: { written: 26, oral: 7, project: 8 },
          Math: { written: 5, oral: 6, project: 8 },
          EVS: { written: 16, oral: 6, project: 8 },
        },
      },
      {
        rollNo: 3,
        name: "Dipika Kumari",
        subjects: {
          English: { written: 7, oral: 6, project: 7 },
          Hindi: { written: 43, oral: 8, project: 8 },
          Math: { written: 30, oral: 6, project: 8 },
          EVS: { written: 35, oral: 7, project: null },
        },
      },
      {
        rollNo: 4,
        name: "Vaishnavi Kumari",
        subjects: {
          English: { written: 16, oral: 5, project: null },
          Hindi: { written: 28, oral: 5, project: null },
          Math: { written: 29, oral: 6, project: null },
          EVS: { written: 33, oral: 5, project: null },
        },
      },
      {
        rollNo: 5,
        name: "Arpita Kumari",
        subjects: {
          English: { written: 0, oral: 5, project: 7 },
          Hindi: { written: 10, oral: 5, project: 7 },
          Math: { written: 20, oral: 8, project: 7 },
          EVS: { written: 18, oral: 7, project: null },
        },
      },
      {
        rollNo: 6,
        name: "Prince Kumar",
        subjects: {
          English: { written: 30, oral: 5, project: 4 },
          Hindi: { written: 47, oral: 8, project: 7 },
          Math: { written: 54, oral: 8, project: 7 },
          EVS: { written: 46, oral: 8, project: 5 },
        },
      },
      {
        rollNo: 7,
        name: "Vivek Kumar",
        subjects: {
          English: { written: 35, oral: 7, project: null },
          Hindi: { written: 61, oral: 8, project: 8 },
          Math: { written: 52, oral: 10, project: 9 },
          EVS: { written: 43, oral: 8, project: null },
        },
      },
      {
        rollNo: 8,
        name: "Amit Kumar",
        subjects: {
          English: { written: 44, oral: 9, project: 8 },
          Hindi: { written: 71, oral: 8, project: 8 },
          Math: { written: 73, oral: 10, project: 8 },
          EVS: { written: 54, oral: 9, project: 8 },
        },
      },
      {
        rollNo: 9,
        name: "Shivansh Kumar", // Matched with "Shivansh Raj"
        subjects: {
          English: { written: 42, oral: 8, project: 9 },
          Hindi: { written: 54, oral: 8, project: 9 },
          Math: { written: 53, oral: 10, project: 9 },
          EVS: { written: 49, oral: 7, project: 9 },
        },
      },
      {
        rollNo: 10,
        name: "Abhishek Kumar",
        subjects: {
          English: { written: 28, oral: 8, project: null },
          Hindi: { written: 66, oral: 7, project: 8 },
          Math: { written: 45, oral: 9, project: 7 },
          EVS: { written: 47, oral: 9, project: null },
        },
      },
      {
        rollNo: 11,
        name: "Aryan Kumar",
        subjects: {
          English: { written: null, oral: null, project: null },
          Hindi: { written: null, oral: null, project: null },
          Math: { written: null, oral: null, project: null },
          EVS: { written: null, oral: null, project: null },
        },
      },
      {
        rollNo: 12,
        name: "Amit Anand",
        subjects: {
          English: { written: 60, oral: 10, project: 8 },
          Hindi: { written: 66, oral: 9, project: 8 },
          Math: { written: 67, oral: 10, project: 8 },
          EVS: { written: 58, oral: 9, project: 8 },
        },
      },
      {
        rollNo: 13,
        name: "Manish Kumar",
        subjects: {
          English: { written: null, oral: null, project: null },
          Hindi: { written: null, oral: null, project: null },
          Math: { written: null, oral: null, project: null },
          EVS: { written: null, oral: null, project: null },
        },
      },
      {
        rollNo: 14,
        name: "Bal Krishna",
        subjects: {
          English: { written: null, oral: null, project: null },
          Hindi: { written: null, oral: null, project: null },
          Math: { written: null, oral: null, project: null },
          EVS: { written: null, oral: null, project: null },
        },
      },
      {
        rollNo: 15,
        name: "Mithi Singh", // Matched with "Mithi Kumari"
        subjects: {
          English: { written: 11, oral: 6, project: null },
          Hindi: { written: 35, oral: 4, project: null },
          Math: { written: 33, oral: 8, project: 8 },
          EVS: { written: 27, oral: 6, project: null },
        },
      },
      {
        rollNo: 16,
        name: "Aditya Anand",
        subjects: {
          English: { written: 0, oral: 5, project: null },
          Hindi: { written: 12, oral: 6, project: null },
          Math: { written: 24, oral: 7, project: null },
          EVS: { written: 18, oral: 4, project: null },
        },
      },
      {
        rollNo: 17,
        name: "Roshan Kumar",
        subjects: {
          English: { written: 0, oral: 5, project: 4 },
          Hindi: { written: 9, oral: 4, project: 8 },
          Math: { written: 3, oral: 5, project: 8 },
          EVS: { written: null, oral: 6, project: 8 },
        },
      },
      {
        rollNo: 18,
        name: "Navneet Kumar", // Matched with "Navneet Sen"
        subjects: {
          English: { written: 51, oral: 8, project: 9 },
          Hindi: { written: 58, oral: 7, project: 10 },
          Math: { written: 65, oral: 7, project: 9 },
          EVS: { written: 46, oral: 6, project: null },
        },
      },
      {
        rollNo: 19,
        name: "Prince Raj",
        subjects: {
          English: { written: 22, oral: 4, project: null },
          Hindi: { written: 63, oral: 5, project: null },
          Math: { written: 42, oral: 6, project: null },
          EVS: { written: 40, oral: 5, project: null },
        },
      },
      {
        rollNo: 20,
        name: "Durgesh Kumar", // Matched with "Durgesh Raj"
        subjects: {
          English: { written: 56, oral: 8, project: 10 },
          Hindi: { written: 67, oral: 7, project: 10 },
          Math: { written: 55, oral: 9, project: 10 },
          EVS: { written: 49, oral: 8, project: 10 },
        },
      },
      {
        rollNo: 21,
        name: "Lakshya Kumar", // Matched with "Laksh Kumar"
        subjects: {
          English: { written: 20, oral: 4, project: 9 },
          Hindi: { written: 41, oral: 7, project: 10 },
          Math: { written: 41, oral: 7, project: 9 },
          EVS: { written: 48, oral: 6, project: 9 },
        },
      },
      {
        rollNo: 22,
        name: "Suniti Kumari",
        subjects: {
          English: { written: 15, oral: null, project: null },
          Hindi: { written: 52, oral: null, project: null },
          Math: { written: 44, oral: 6, project: null },
          EVS: { written: 46, oral: 9, project: null },
        },
      },
      {
        rollNo: 23,
        name: "Nisha Rani", // Matched with "Nisha Kumari"
        subjects: {
          English: { written: 0, oral: 4, project: 4 },
          Hindi: { written: 6, oral: 5, project: 7 },
          Math: { written: 3, oral: 5, project: 7 },
          EVS: { written: 18, oral: 7, project: null },
        },
      },
      {
        rollNo: 24,
        name: "Aman Kumar",
        subjects: {
          English: { written: 45, oral: 7, project: null },
          Hindi: { written: 57, oral: 4, project: 10 },
          Math: { written: 65, oral: 8, project: 10 },
          EVS: { written: 49, oral: 8, project: 8 },
        },
      },
    ],
  },
]
