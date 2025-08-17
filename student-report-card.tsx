// Define the color scheme to match the LaTeX document
const colors = {
  saffron: "#FF9933",
  darkgreen: "#138808",
  navy: "#00008B",
  lightgray: "#F5F5F5",
  headerbg: "#FFF8DC",
}

interface StudentData {
  name: string
  class: string
  rollNo: string
  month: string
  fatherName: string
  motherName: string
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
}

const defaultStudentData: StudentData = {
  name: "Shivansh Kumar",
  class: "4th",
  rollNo: "12",
  month: "July 2025",
  fatherName: "Ramesh Kumar",
  motherName: "Sunita Devi",
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
}

// Logo component to replace TikZ drawings
const Logo = ({ type, color }: { type: "dbg" | "dbm"; color: string }) => (
  <div className="flex flex-col items-center">
    <div
      className={`w-16 h-16 rounded-full border-2 flex items-center justify-center`}
      style={{
        backgroundColor: `${color}20`,
        borderColor: color,
      }}
    >
      <div className="text-xs font-bold" style={{ color: colors.navy }}>
        {type === "dbg" ? "DBG" : "DBM"}
      </div>
    </div>
    <div className="text-xs mt-1" style={{ color: colors.navy }}>
      {type === "dbg" ? "DBG Logo" : "DBM Logo"}
    </div>
  </div>
)

export default function StudentReportCard({ studentData = defaultStudentData }: { studentData?: StudentData }) {
  const academicSubtotal = studentData.academicMarks.reduce((sum, subject) => sum + subject.scaledMarks, 0)
  const coActivitiesSubtotal = studentData.coActivities.reduce((sum, activity) => sum + activity.marks, 0)
  const coActivitiesTotal = studentData.coActivities.reduce((sum, activity) => sum + activity.outOf, 0)

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen relative">
      {/* Decorative Border */}
      <div
        className="absolute inset-2 border-4 rounded-lg pointer-events-none"
        style={{ borderColor: colors.saffron }}
      />

      {/* Institution Header */}
      <div className="mb-6 mt-4">
        <div className="p-6 rounded-lg" style={{ backgroundColor: colors.headerbg }}>
          <div className="flex items-center justify-between">
            <Logo type="dbg" color={colors.saffron} />

            <div className="text-center flex-1 mx-8">
              <h1 className="text-3xl font-bold mb-2" style={{ color: colors.navy }}>
                DIVYA BIHAR GLOBAL GURUKULAM
              </h1>
              <h2 className="text-xl font-bold mb-2" style={{ color: colors.darkgreen }}>
                (DBG Gurukulam)
              </h2>
              <p className="text-lg mb-1">Raghopur, Supaul, Bihar – 852111</p>
              <p className="mb-1">
                Managed by: <strong>Divya Bihar Mission</strong>
              </p>
              <p className="italic" style={{ color: colors.saffron }}>
                Education with Yogic Values
              </p>
            </div>

            <Logo type="dbm" color={colors.darkgreen} />
          </div>
        </div>
      </div>

      {/* Assessment Title */}
      <div className="mb-6">
        <div
          className="text-center py-4 rounded-lg mx-auto max-w-2xl"
          style={{ backgroundColor: `${colors.saffron}20` }}
        >
          <h2 className="text-xl font-bold mb-2" style={{ color: colors.navy }}>
            JIGYASA ANVESHAN III – JULY 2025
          </h2>
          <h3 className="text-lg font-bold" style={{ color: colors.darkgreen }}>
            Monthly Assessment Report
          </h3>
        </div>
      </div>

      {/* Student Information */}
      <div className="mb-6">
        <table className="w-full border-collapse border border-gray-400">
          <tr style={{ backgroundColor: colors.lightgray }}>
            <td className="border border-gray-400 p-2 font-bold" style={{ color: colors.navy }}>
              Student Name: {studentData.name}
            </td>
            <td className="border border-gray-400 p-2 font-bold" style={{ color: colors.navy }}>
              Class: {studentData.class}
            </td>
            <td className="border border-gray-400 p-2 font-bold" style={{ color: colors.navy }}>
              Roll No: {studentData.rollNo}
            </td>
            <td className="border border-gray-400 p-2 font-bold" style={{ color: colors.navy }}>
              Month: {studentData.month}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2 font-bold" style={{ color: colors.navy }} colSpan={2}>
              Father's Name: {studentData.fatherName}
            </td>
            <td className="border border-gray-400 p-2 font-bold" style={{ color: colors.navy }} colSpan={2}>
              Mother's Name: {studentData.motherName}
            </td>
          </tr>
        </table>
      </div>

      {/* Academic Subjects */}
      <div className="mb-6">
        <h3 className="text-center text-lg font-bold mb-3" style={{ color: colors.darkgreen }}>
          ACADEMIC SUBJECTS
        </h3>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr style={{ backgroundColor: `${colors.navy}20` }}>
              <th className="border border-gray-400 p-2 text-white font-bold" style={{ backgroundColor: colors.navy }}>
                Subject
              </th>
              <th className="border border-gray-400 p-2 text-white font-bold" style={{ backgroundColor: colors.navy }}>
                Raw Marks
              </th>
              <th className="border border-gray-400 p-2 text-white font-bold" style={{ backgroundColor: colors.navy }}>
                Total
              </th>
              <th className="border border-gray-400 p-2 text-white font-bold" style={{ backgroundColor: colors.navy }}>
                Scaled Marks
              </th>
              <th className="border border-gray-400 p-2 text-white font-bold" style={{ backgroundColor: colors.navy }}>
                Out of
              </th>
            </tr>
          </thead>
          <tbody>
            {studentData.academicMarks.map((subject, index) => (
              <tr key={index}>
                <td className="border border-gray-400 p-2">{subject.subject}</td>
                <td className="border border-gray-400 p-2 text-center">{subject.rawMarks}</td>
                <td className="border border-gray-400 p-2 text-center">{subject.total}</td>
                <td className="border border-gray-400 p-2 text-center">{subject.scaledMarks}</td>
                <td className="border border-gray-400 p-2 text-center">{subject.outOf}</td>
              </tr>
            ))}
            <tr style={{ backgroundColor: `${colors.saffron}20` }}>
              <td className="border border-gray-400 p-2 font-bold">Academic Subtotal</td>
              <td className="border border-gray-400 p-2 text-center font-bold">248</td>
              <td className="border border-gray-400 p-2 text-center font-bold">300</td>
              <td className="border border-gray-400 p-2 text-center font-bold">{academicSubtotal}</td>
              <td className="border border-gray-400 p-2 text-center font-bold">60</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Co-Curricular Activities */}
      <div className="mb-6">
        <h3 className="text-center text-lg font-bold mb-3" style={{ color: colors.darkgreen }}>
          CO-CURRICULAR & EXTRA-CURRICULAR ACTIVITIES
        </h3>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr style={{ backgroundColor: `${colors.darkgreen}20` }}>
              <th
                className="border border-gray-400 p-2 text-white font-bold"
                style={{ backgroundColor: colors.darkgreen }}
              >
                Activity
              </th>
              <th
                className="border border-gray-400 p-2 text-white font-bold"
                style={{ backgroundColor: colors.darkgreen }}
              >
                Marks
              </th>
              <th
                className="border border-gray-400 p-2 text-white font-bold"
                style={{ backgroundColor: colors.darkgreen }}
              >
                Out of
              </th>
              <th
                className="border border-gray-400 p-2 text-white font-bold"
                style={{ backgroundColor: colors.darkgreen }}
              >
                Activity
              </th>
              <th
                className="border border-gray-400 p-2 text-white font-bold"
                style={{ backgroundColor: colors.darkgreen }}
              >
                Marks
              </th>
              <th
                className="border border-gray-400 p-2 text-white font-bold"
                style={{ backgroundColor: colors.darkgreen }}
              >
                Out of
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil(studentData.coActivities.length / 2) }).map((_, rowIndex) => {
              const leftActivity = studentData.coActivities[rowIndex * 2]
              const rightActivity = studentData.coActivities[rowIndex * 2 + 1]
              return (
                <tr key={rowIndex}>
                  <td className="border border-gray-400 p-2">{leftActivity?.activity || ""}</td>
                  <td className="border border-gray-400 p-2 text-center">{leftActivity?.marks || ""}</td>
                  <td className="border border-gray-400 p-2 text-center">{leftActivity?.outOf || ""}</td>
                  <td className="border border-gray-400 p-2">{rightActivity?.activity || ""}</td>
                  <td className="border border-gray-400 p-2 text-center">{rightActivity?.marks || ""}</td>
                  <td className="border border-gray-400 p-2 text-center">{rightActivity?.outOf || ""}</td>
                </tr>
              )
            })}
            <tr style={{ backgroundColor: `${colors.saffron}20` }}>
              <td className="border border-gray-400 p-2 text-center font-bold" colSpan={6}>
                Co-Curricular Subtotal: {coActivitiesSubtotal} / {coActivitiesTotal}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Performance Summary */}
      <div className="mb-6">
        <div className="p-4 rounded-lg" style={{ backgroundColor: `${colors.navy}10` }}>
          <h3 className="text-center text-lg font-bold mb-3" style={{ color: colors.darkgreen }}>
            PERFORMANCE SUMMARY
          </h3>
          <table className="w-4/5 mx-auto border-collapse border border-gray-400">
            <thead>
              <tr style={{ backgroundColor: `${colors.saffron}30` }}>
                <th className="border border-gray-400 p-2 font-bold">Total Marks</th>
                <th className="border border-gray-400 p-2 font-bold">Maximum Marks</th>
                <th className="border border-gray-400 p-2 font-bold">Percentage</th>
                <th className="border border-gray-400 p-2 font-bold">Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2 text-center">{studentData.totalMarks}</td>
                <td className="border border-gray-400 p-2 text-center">{studentData.maxMarks}</td>
                <td className="border border-gray-400 p-2 text-center">{studentData.percentage}%</td>
                <td className="border border-gray-400 p-2 text-center font-bold">{studentData.grade}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Remarks Section */}
      <div className="mb-6">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr style={{ backgroundColor: colors.lightgray }}>
              <th className="border border-gray-400 p-2 text-left font-bold">Class Teacher's Remarks:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 p-2 h-20"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Signature Section */}
      <div className="mb-6">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr style={{ backgroundColor: colors.lightgray }}>
              <th className="border border-gray-400 p-2 font-bold">Class Teacher</th>
              <th className="border border-gray-400 p-2 font-bold">Date of Issue</th>
              <th className="border border-gray-400 p-2 font-bold">Principal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 p-2 h-16"></td>
              <td className="border border-gray-400 p-2 h-16"></td>
              <td className="border border-gray-400 p-2 h-16"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Line */}
      <div className="text-center">
        <hr className="w-3/4 mx-auto" style={{ borderColor: colors.saffron, borderWidth: "1px" }} />
      </div>
    </div>
  )
}
