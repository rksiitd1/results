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

  // --- NURSERY DATA (Updated with Written & Oral Marks) ---
  {
    className: "Nursery",
    students: [
      {
        rollNo: 1,
        name: "Ishika kumari",
        subjects: {
          English: { written: 20, oral: 8, project: 4 },
          Hindi: { written: 20, oral: 10, project: 4 },
          Math: { written: 20, oral: 5, project: 4 }
        }
      },
      {
        rollNo: 2,
        name: "Paridhi priya", // No marks provided in the new table
        subjects: {
          English: { written: null, oral: null, project: 4 },
          Hindi: { written: null, oral: null, project: 4 },
          Math: { written: null, oral: null, project: 4 }
        }
      },
      {
        rollNo: 3,
        name: "Shivansh kumar", // Matched with "Shivansh Kumar"
        subjects: {
          English: { written: 39, oral: 10, project: 5 },
          Hindi: { written: 29, oral: 5, project: 5 },
          Math: { written: 25, oral: 5, project: 5 }
        }
      },
      {
        rollNo: 4,
        name: "Divyash kumar", // Matched with "Divyansh Kumar"
        subjects: {
          English: { written: 49, oral: 8, project: 7 },
          Hindi: { written: 48, oral: 10, project: 7 },
          Math: { written: 30, oral: null, project: 7 }
        }
      },
      {
        rollNo: 5,
        name: "M.d Altaf", // Matched with "M.D Altaf"
        subjects: {
          English: { written: 39, oral: 5, project: 4 },
          Hindi: { written: 40, oral: null, project: 4 },
          Math: { written: 32, oral: 10, project: 4 }
        }
      },
      {
        rollNo: 6,
        name: "M.d Mazid", // Matched with "M.D Mazid"
        subjects: {
          English: { written: 41, oral: 5, project: 4 },
          Hindi: { written: 41, oral: 5, project: 4 },
          Math: { written: 20, oral: 5, project: 4 }
        }
      },
      {
        rollNo: 7,
        name: "M.d Shahanshah", // Matched with "M.D Shahanshah"
        subjects: {
          English: { written: 44, oral: 8, project: 4 },
          Hindi: { written: 44, oral: 5, project: 4 },
          Math: { written: 25, oral: null, project: 4 }
        }
      },
      {
        rollNo: 8,
        name: "Kunal sah",
        subjects: {
          English: { written: 31, oral: 5, project: 4 },
          Hindi: { written: null, oral: null, project: 4 },
          Math: { written: 25, oral: 5, project: 4 }
        }
      },
      {
        rollNo: 9,
        name: "Aditya kumar", // Matched with "Aditya Kumar"
        subjects: {
          English: { written: 48, oral: 10, project: 7 },
          Hindi: { written: 43, oral: 8, project: 7 },
          Math: { written: 35, oral: 5, project: 7 }
        }
      },
      {
        rollNo: 10,
        name: "Khushahal Babu", // Matched with "Khushal babu"
        subjects: {
          English: { written: 31, oral: 8, project: 5 },
          Hindi: { written: 37, oral: 5, project: 5 },
          Math: { written: null, oral: null, project: 5 }
        }
      },
      {
        rollNo: 11,
        name: "Gopal kumar", // Matched with "Gopal Kumar"
        subjects: {
          English: { written: 58, oral: 8, project: 7 },
          Hindi: { written: 42, oral: 10, project: 7 },
          Math: { written: null, oral: null, project: 7 }
        }
      },
      {
        rollNo: 12,
        name: "Shanvi priya",
        subjects: {
          English: { written: null, oral: null, project: 4 },
          Hindi: { written: 25, oral: 5, project: 4 },
          Math: { written: 25, oral: 5, project: 4 }
        }
      },
      {
        rollNo: 13, // New student from marks list
        name: "Shivesh Kumar",
        subjects: {
          English: { written: 39, oral: 10, project: null },
          Hindi: { written: 29, oral: 5, project: null },
          Math: { written: 25, oral: 5, project: null }
        }
      }
    ]
  },


  // --- U.K.G. DATA (Updated with Written & Oral Marks) ---
  {
    className: "UKG",
    students: [
      {
        rollNo: 1,
        name: "Vaishnavi kumari",
        subjects: {
          English: { written: 57, oral: 12, project: 8 },
          Hindi: { written: 35, oral: 10, project: 8 },
          Math: { written: 30, oral: 8, project: 8 }
        }
      },
      {
        rollNo: 2,
        name: "Soni kumari",
        subjects: {
          English: { written: 35, oral: 10, project: 4 },
          Hindi: { written: 30, oral: 8, project: 4 },
          Math: { written: 28, oral: 5, project: 4 }
        }
      },
      {
        rollNo: 3,
        name: "Dhavansh kumar",
        subjects: {
          English: { written: 60, oral: 12, project: 8 },
          Hindi: { written: 46, oral: 12, project: 8 },
          Math: { written: 60, oral: 10, project: 8 }
        }
      },
      {
        rollNo: 4,
        name: "Ansh yug",
        subjects: {
          English: { written: 50, oral: 12, project: 5 },
          Hindi: { written: 40, oral: 10, project: 5 },
          Math: { written: 60, oral: 10, project: 5 }
        }
      },
      {
        rollNo: 5,
        name: "Sumit kumar",
        subjects: {
          English: { written: 60, oral: 12, project: 4 },
          Hindi: { written: 55, oral: 10, project: 4 },
          Math: { written: 60, oral: 8, project: 4 }
        }
      },
      {
        rollNo: 6,
        name: "Krishna kumar",
        subjects: {
          English: { written: 27, oral: 10, project: 4 },
          Hindi: { written: 45, oral: 8, project: 4 },
          Math: { written: 32, oral: 5, project: 4 }
        }
      },
      {
        rollNo: 7,
        name: "Aisha kumari",
        subjects: {
          English: { written: 57, oral: 14, project: 8 },
          Hindi: { written: 40, oral: 10, project: 8 },
          Math: { written: 50, oral: 5, project: 8 }
        }
      },
      {
        rollNo: 8,
        name: "Aditi kumari",
        subjects: {
          English: { written: 32, oral: 12, project: 8 },
          Hindi: { written: 62, oral: 10, project: 8 },
          Math: { written: 60, oral: 8, project: 8 }
        }
      },
      {
        rollNo: 9,
        name: "Prashant kumar",
        subjects: {
          English: { written: 27, oral: 10, project: 5 },
          Hindi: { written: 40, oral: 10, project: 5 },
          Math: { written: 60, oral: 10, project: 5 }
        }
      }
    ]
  },

  // --- CLASS 1 DATA (Updated with Project Marks) ---
  {
    className: "1",
    students: [
      {
        rollNo: 1,
        name: "Kritika Kumari",
        subjects: {
          English: { written: 36, oral: 8, project: null },
          Hindi: { written: 19, oral: 8, project: null },
          Math: { written: 69, oral: 5, project: null }
        }
      },
      {
        rollNo: 2,
        name: "Chitransh Kumar",
        subjects: {
          English: { written: 79, oral: 8, project: null },
          Hindi: { written: 51, oral: 8, project: null },
          Math: { written: 78, oral: 8, project: null }
        }
      },
      {
        rollNo: 3,
        name: "Akshar Patel",
        subjects: {
          English: { written: 10, oral: 7, project: 10 },
          Hindi: { written: 5, oral: 6, project: 10 },
          Math: { written: 12, oral: 3, project: 10 }
        }
      },
      {
        rollNo: 4,
        name: "Shivam Kumar", // Matched with Shivam Kumar Gupta
        subjects: {
          English: { written: 32, oral: 10, project: null },
          Hindi: { written: 34, oral: 8, project: null },
          Math: { written: 62, oral: 8, project: 10 }
        }
      },
      {
        rollNo: 5,
        name: "Mayank Kumar (I)",
        subjects: {
          English: { written: 14, oral: 0, project: null },
          Hindi: { written: 21, oral: 4, project: null },
          Math: { written: 33, oral: 4, project: null }
        }
      },
      {
        rollNo: 6,
        name: "Mayank Singh (II)",
        subjects: {
          English: { written: 48, oral: 6, project: 7 },
          Hindi: { written: 35, oral: 6, project: 10 },
          Math: { written: 70, oral: 7, project: 8 }
        }
      },
      {
        rollNo: 7,
        name: "Aashiq", // Matched with Aashi
        subjects: {
          English: { written: 4, oral: 4, project: 9 },
          Hindi: { written: 16, oral: 5, project: 8 },
          Math: { written: 48, oral: 2, project: 8 }
        }
      },
      {
        rollNo: 8,
        name: "Javed",
        subjects: {
          English: { written: 8, oral: 3, project: 8 },
          Hindi: { written: 18, oral: 6, project: null },
          Math: { written: 18, oral: 5, project: 8 }
        }
      },
      {
        rollNo: 9,
        name: "Ranjeet Kumar", // Matched with Raneet Kumar
        subjects: {
          English: { written: 25, oral: 2, project: 9 },
          Hindi: { written: 37, oral: 6, project: 9 },
          Math: { written: 70, oral: 6, project: 9 }
        }
      },
      {
        rollNo: 10,
        name: "Abhinandan Kumar",
        subjects: {
          English: { written: 2, oral: 5, project: 10 },
          Hindi: { written: 51, oral: 5, project: 10 },
          Math: { written: 49, oral: 6, project: 9 }
        }
      },
      {
        rollNo: 11,
        name: "Anshu Kumar",
        subjects: {
          English: { written: 0, oral: 3, project: 10 },
          Hindi: { written: 0, oral: 4, project: 9 },
          Math: { written: 52, oral: 5, project: null }
        }
      },
      {
        rollNo: 12,
        name: "Manisha Rani",
        subjects: {
          English: { written: 0, oral: 0, project: null },
          Hindi: { written: 0, oral: 3, project: 7 },
          Math: { written: 8, oral: 3, project: null }
        }
      },
      {
        rollNo: 13,
        name: "Janvi Kumari",
        subjects: {
          English: { written: 6, oral: 3, project: 9 },
          Hindi: { written: 43, oral: 6, project: 6 },
          Math: { written: 69, oral: 4, project: 0 }
        }
      },
      {
        rollNo: 14,
        name: "Anjali Kumari",
        subjects: {
          English: { written: null, oral: null, project: null },
          Hindi: { written: null, oral: null, project: null },
          Math: { written: null, oral: null, project: null }
        }
      },
      {
        rollNo: 15,
        name: "Pankaj Kumar",
        subjects: {
          English: { written: 60, oral: 4, project: null },
          Hindi: { written: 56, oral: 5, project: null },
          Math: { written: null, oral: 7, project: null }
        }
      },
      {
        rollNo: 16,
        name: "Bhagwati Kumari",
        subjects: {
          English: { written: 10, oral: 2, project: null },
          Hindi: { written: 0, oral: 3, project: null },
          Math: { written: 15, oral: 3, project: null }
        }
      },
      {
        rollNo: 17,
        name: "Kajal Kumari",
        subjects: {
          English: { written: null, oral: null, project: null },
          Hindi: { written: null, oral: null, project: null },
          Math: { written: null, oral: null, project: null }
        }
      }
    ]
  },





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


  // --- CLASS 7 DATA (Updated with Hindi & S.S.T. Marks) ---
  {
    className: "7",
    students: [
      {
        rollNo: 1,
        name: "Amar Kumar",
        subjects: {
          English: { written: 38, oral: 8, project: null },
          Hindi: { written: 46, oral: 7, project: 9 },
          Math: { written: 20, oral: 5, project: null },
          Science: { written: 22, oral: 7, project: 8 },
          SST: { written: 29, oral: 6, project: 8 }
        }
      },
      {
        rollNo: 2,
        name: "Madhav Kumar",
        subjects: {
          English: { written: 61, oral: 8, project: null },
          Hindi: { written: 55, oral: 8, project: 5 },
          Math: { written: 75, oral: 9, project: null },
          Science: { written: 48, oral: 7, project: 9 },
          SST: { written: 54, oral: 7, project: 8 }
        }
      },
      {
        rollNo: 3,
        name: "Divyanshu Kumar",
        subjects: {
          English: { written: 40, oral: 7, project: null },
          Hindi: { written: 53, oral: 5, project: 0 },
          Math: { written: 45, oral: 9, project: null },
          Science: { written: 30, oral: 0, project: 6 },
          SST: { written: 40, oral: 6, project: 0 }
        }
      },
      {
        rollNo: 4,
        name: "Sonakshi Kumari",
        subjects: {
          English: { written: 18, oral: 6, project: null },
          Hindi: { written: 23, oral: 7, project: 0 },
          Math: { written: 10, oral: 4, project: null },
          Science: { written: 23, oral: 5, project: 8 },
          SST: { written: 9, oral: 5, project: 0 }
        }
      },
      {
        rollNo: 5,
        name: "Dheeraj Kumar",
        subjects: {
          English: { written: null, oral: null, project: null },
          Hindi: { written: null, oral: null, project: null },
          Math: { written: null, oral: null, project: null },
          Science: { written: null, oral: null, project: null },
          SST: { written: null, oral: null, project: null }
        }
      },
      {
        rollNo: 6,
        name: "Nayna Sen", // Matched with Nayna Kumari
        subjects: {
          English: { written: 55, oral: 9, project: null },
          Hindi: { written: 38, oral: 6, project: 10 },
          Math: { written: 19, oral: 5, project: null },
          Science: { written: 33, oral: 9, project: 9 },
          SST: { written: 25, oral: 6, project: 10 }
        }
      },
      {
        rollNo: 7,
        name: "Ranveer Kumar",
        subjects: {
          English: { written: 27, oral: 7, project: null },
          Hindi: { written: 41, oral: 7, project: 7 },
          Math: { written: 32, oral: 6, project: null },
          Science: { written: 23, oral: 9, project: 8 },
          SST: { written: 25, oral: 5, project: 10 }
        }
      },
      {
        rollNo: 8,
        name: "Harshvardhan Kumar",
        subjects: {
          English: { written: 9, oral: 3, project: null },
          Hindi: { written: 21, oral: 8, project: 0 },
          Math: { written: 12, oral: 4, project: null },
          Science: { written: 19, oral: 5, project: 0 },
          SST: { written: 11, oral: 6, project: 0 }
        }
      },
      {
        rollNo: 9,
        name: "Ayush Kumar",
        subjects: {
          English: { written: 31, oral: 8, project: null },
          Hindi: { written: 40, oral: 6, project: 7 },
          Math: { written: 21, oral: 3, project: null },
          Science: { written: 13, oral: 5, project: 10 },
          SST: { written: 31, oral: 7, project: 9 }
        }
      },
      {
        rollNo: 10,
        name: "Ritik Anand", // Matched with Ritik Kumar
        subjects: {
          English: { written: 66, oral: 9, project: null },
          Hindi: { written: 45, oral: 9, project: 6 },
          Math: { written: 51, oral: 9, project: null },
          Science: { written: 43, oral: 9, project: 4 },
          SST: { written: 35, oral: 8, project: 7 }
        }
      },
      {
        rollNo: 11,
        name: "Roopak Kumar",
        subjects: {
          English: { written: 26, oral: 6, project: null },
          Hindi: { written: 26, oral: 6, project: 0 },
          Math: { written: 14, oral: 6, project: null },
          Science: { written: 15, oral: 4, project: 2 },
          SST: { written: 11, oral: 5, project: 0 }
        }
      }
    ]
  }


]
