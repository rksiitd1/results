import type { StudentData } from "@/lib/data"
import Image from "next/image"

// Import the new data structure
interface SubjectMarks {
  written: number | null
  oral: number | null
  project: number | null
}

interface Student {
  rollNo: number
  name: string
  subjects: {
    [subject: string]: SubjectMarks
  }
}

interface ClassData {
  className: string
  students: Student[]
}

// Define the color scheme to match the existing design
const colors = {
  saffron: "#FF9933",
  darkgreen: "#138808",
  navy: "#00008B",
  lightgray: "#F5F5F5",
  headerbg: "#FFF8DC",
}

// Logo component using actual PNG images
const Logo = ({ type }: { type: "dbg" | "dbm" }) => (
  <div className="flex items-center justify-center w-24 h-24 print:w-20 print:h-20">
    <div className="w-24 h-24 print:w-20 print:h-20 relative">
      <Image
        src={type === "dbg" ? "/DBGlogo.png" : "/DBMlogo.png"}
        alt={type === "dbg" ? "DBG Logo" : "DBM Logo"}
        fill
        className="object-contain"
        priority
      />
    </div>
  </div>
)

interface MultiModeReportCardProps {
  student: StudentData
  studentMarks: Student
  examType: string
  examPeriod: string
  academicYear: string
}

export default function MultiModeReportCard({
  student,
  studentMarks,
  examType,
  examPeriod,
  academicYear,
}: MultiModeReportCardProps) {
  if (!studentMarks || !studentMarks.subjects) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 bg-white">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-bold mb-2">No Data Available</h2>
          <p>Student marks data not found for {student.name}</p>
        </div>
      </div>
    )
  }

  // Get exam title based on type
  const getExamTitle = () => {
    switch (examType) {
      case "jigyasa-anveshan":
        return `JIGYASA ANVESHAN ${examPeriod.toUpperCase()}`
      case "bodha-manthan":
        return `BODHA MANTHAN ${examPeriod.toUpperCase()}`
      case "pragya-siddhi":
        return `PRAGYA SIDDHI ${examPeriod.toUpperCase()}`
      default:
        return examPeriod.toUpperCase()
    }
  }

  // Mapping for Devanagari exam type and months
  const examTypeHindiMap: Record<string, string> = {
    "jigyasa-anveshan": "जिज्ञासा अन्वेषण",
    "bodha-manthan": "बोध मंथन",
    "pragya-siddhi": "प्रज्ञा सिद्धि",
  }

  const monthHindiMap: Record<string, string> = {
    JANUARY: "जनवरी",
    FEBRUARY: "फ़रवरी",
    MARCH: "मार्च",
    APRIL: "अप्रैल",
    MAY: "मई",
    JUNE: "जून",
    JULY: "जुलाई",
    AUGUST: "अगस्त",
    SEPTEMBER: "सितंबर",
    OCTOBER: "अक्टूबर",
    NOVEMBER: "नवंबर",
    DECEMBER: "दिसंबर",
  }

  function getDevanagariExamTitle() {
    const engTitle = getExamTitle()
    const match = engTitle.match(/([A-Z ]+)(?:\s+([IVX]+))?\.*\s*([A-Z]+)\s*(\d{4})?/)
    if (!match) return ""
    const [, type, number, month, year] = match
    const hindiType = examTypeHindiMap[examType] || type
    const hindiMonth = monthHindiMap[month] || month
    return `${hindiType}${number ? ` ${number}` : ""}${month && year ? `....${hindiMonth} ${year}` : ""}`
  }

  // Calculate totals for each mode
  const subjects = Object.keys(studentMarks.subjects)
  const calculateModeTotal = (mode: keyof SubjectMarks) => {
    return subjects.reduce((total, subject) => {
      const mark = studentMarks.subjects[subject][mode]
      return total + (mark || 0)
    }, 0)
  }

  const writtenTotal = calculateModeTotal("written")
  const oralTotal = calculateModeTotal("oral")
  const projectTotal = calculateModeTotal("project")
  const grandTotal = writtenTotal + oralTotal + projectTotal

  // Calculate maximum possible marks (assuming 80 for written, 10 for oral, 10 for project per subject)
  const maxWritten = subjects.length * 80
  const maxOral = subjects.length * 10
  const maxProject = subjects.length * 10
  const maxTotal = maxWritten + maxOral + maxProject

  const percentage = maxTotal > 0 ? (grandTotal / maxTotal) * 100 : 0

  // Calculate grade based on percentage
  const getGrade = (percentage: number) => {
    if (percentage >= 95) return "A1"
    if (percentage >= 90) return "A2"
    if (percentage >= 80) return "B1"
    if (percentage >= 70) return "B2"
    if (percentage >= 60) return "C1"
    if (percentage >= 50) return "C2"
    if (percentage >= 40) return "D"
    return "E"
  }

  const grade = getGrade(percentage)

  // Helper to format numbers: integer if whole, else one decimal
  function formatMark(val: number | null) {
    if (val === null) return "-"
    return Number.isInteger(val) ? val.toString() : val.toFixed(1)
  }

  return (
    <div
      className="w-full max-w-4xl mx-auto p-1 sm:p-4 print:p-2 bg-white relative print:max-w-none print:mx-0 overflow-x-hidden"
      style={{ fontFamily: "serif" }}
    >
      {/* Decorative Border */}
      <div className="absolute inset-0 border border-orange-300 sm:border-2 lg:border-4 m-0.5 sm:m-1 print:m-1"></div>

      {/* Header Section */}
      <div className="relative z-10 mb-1 sm:mb-2 print:mb-1">
        <div className="bg-yellow-50 p-1 sm:p-2 print:p-1 border border-gray-200">
          <div className="flex items-center">
            {/* Left Logo */}
            <div className="flex-shrink-0 p-0.5 sm:p-2 print:p-1">
              <Logo type="dbg" />
            </div>

            {/* Center Content */}
            <div className="text-center flex-1 mx-1 sm:mx-2 print:mx-2">
              <h1 className="text-sm sm:text-2xl lg:text-3xl print:text-2xl font-bold text-blue-900 mb-0.5 sm:mb-1 print:mb-1">
                DIVYA BIHAR GLOBAL GURUKULAM
                <span className="block text-yellow-700 text-xs sm:text-lg lg:text-xl print:text-lg font-serif font-semibold mt-0.5 sm:mt-1">
                  दिव्य बिहार ग्लोबल गुरुकुलम्
                </span>
              </h1>
              <p className="text-xs sm:text-sm lg:text-base print:text-sm mb-0.5 sm:mb-1 print:mb-0">
                Raghopur, Supaul, Bihar – 852111
              </p>
              <p className="text-xs sm:text-sm print:text-xs mb-0.5 sm:mb-1 print:mb-0">
                Managed by: <span className="font-bold">Divya Bihar Mission</span>
              </p>
              <p className="text-xs sm:text-sm print:text-xs italic text-orange-500">Education with Yogic Values</p>
            </div>

            {/* Right Logo */}
            <div className="flex-shrink-0 p-0.5 sm:p-2 print:p-1">
              <Logo type="dbm" />
            </div>
          </div>
        </div>
      </div>

      {/* Mantra Section */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-md py-0.5 sm:py-1 px-1 sm:px-3 mb-1 sm:mb-2 print:py-1 print:px-2 print:mb-1 text-center max-w-full sm:max-w-2xl mx-auto">
        <div className="text-yellow-800 font-semibold leading-tight sm:leading-relaxed text-xs sm:text-sm lg:text-base print:text-sm font-serif">
          ॐ सह नाववतु। सह नौ भुनक्तु।
          <br />
          सह वीर्यं करवावहै।
          <br />
          तेजस्विनावधीतमस्तु मा विद्विषावहै॥
          <br />ॐ शांति, शांति, शांतिः
        </div>
      </div>

      {/* Assessment Title */}
      <div className="bg-orange-100 p-1 sm:p-2 print:p-1 mb-1 sm:mb-2 print:mb-1 text-center">
        <h3 className="text-sm sm:text-lg lg:text-xl print:text-lg font-bold text-blue-900 mb-0.5 sm:mb-1 print:mb-0">
          {getExamTitle()}
        </h3>
        <div className="text-xs sm:text-base lg:text-lg print:text-base font-bold text-yellow-800 mb-0.5 sm:mb-1 print:mb-0 font-serif">
          {getDevanagariExamTitle()}
        </div>
        <h4 className="text-xs sm:text-base lg:text-lg print:text-base font-bold text-green-700">
          {examType === "jigyasa-anveshan"
            ? "Monthly Assessment Report"
            : examType === "bodha-manthan"
              ? "Term-End Assessment Report"
              : "Annual Assessment Report"}
        </h4>
      </div>

      {/* Student Information */}
      <div className="mb-1 sm:mb-2 print:mb-1">
        <table className="w-full border-collapse border border-gray-400 text-xs sm:text-sm lg:text-base print:text-sm">
          <tbody>
            <tr className="bg-gray-100">
              <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-bold text-blue-900">
                Student Name / विद्यार्थी नाम: {student.name}
              </td>
              <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-bold text-blue-900">
                Class / कक्षा: {student.class}
              </td>
              <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-bold text-blue-900">
                Roll No / क्रमांक: {studentMarks.rollNo}
              </td>
              <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-bold text-blue-900">
                Period / अवधि: {examPeriod}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Academic Subjects - Multi-Mode Assessment */}
      <div className="mb-1 sm:mb-2 print:mb-1">
        <h3 className="text-center text-xs sm:text-base lg:text-lg print:text-base font-bold text-green-700 mb-1 sm:mb-2 print:mb-1">
          ACADEMIC SUBJECTS - MULTI-MODE ASSESSMENT / पाठ्यक्रम विषय - बहु-मोड मूल्यांकन
        </h3>
        <div className="w-full">
          <table className="w-full border-collapse border border-gray-400 text-xs sm:text-sm lg:text-base print:text-sm">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-bold">Subject / विषय</th>
                <th className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-bold">
                  Written / लिखित
                  <br />
                  (80)
                </th>
                <th className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-bold">
                  Oral / मौखिक
                  <br />
                  (10)
                </th>
                <th className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-bold">
                  Project / परियोजना
                  <br />
                  (10)
                </th>
                <th className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-bold">
                  Total / कुल
                  <br />
                  (100)
                </th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => {
                const marks = studentMarks.subjects[subject]
                const subjectTotal = (marks.written || 0) + (marks.oral || 0) + (marks.project || 0)
                return (
                  <tr key={index} className="h-6 sm:h-9 print:h-8">
                    <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-semibold">{subject}</td>
                    <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 text-center">
                      {formatMark(marks.written)}
                    </td>
                    <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 text-center">
                      {formatMark(marks.oral)}
                    </td>
                    <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 text-center">
                      {formatMark(marks.project)}
                    </td>
                    <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 text-center font-bold">
                      {subjectTotal}
                    </td>
                  </tr>
                )
              })}
              <tr className="bg-orange-100 h-6 sm:h-9 print:h-8">
                <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-bold">TOTAL / कुल योग</td>
                <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 text-center font-bold">{writtenTotal}</td>
                <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 text-center font-bold">{oralTotal}</td>
                <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 text-center font-bold">{projectTotal}</td>
                <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 text-center font-bold">{grandTotal}</td>
              </tr>
              <tr className="bg-blue-100 h-6 sm:h-9 print:h-8">
                <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-bold">MAXIMUM / अधिकतम</td>
                <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 text-center font-bold">{maxWritten}</td>
                <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 text-center font-bold">{maxOral}</td>
                <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 text-center font-bold">{maxProject}</td>
                <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 text-center font-bold">{maxTotal}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mb-1 sm:mb-2 print:mb-1">
        <div className="bg-blue-50 p-1 sm:p-2 print:p-1 border border-gray-200">
          <h3 className="text-center text-xs sm:text-base lg:text-lg print:text-base font-bold text-green-700 mb-1 sm:mb-2 print:mb-1">
            PERFORMANCE SUMMARY / प्रदर्शन सारांश
          </h3>
          <div className="flex justify-center">
            <table className="border-collapse border border-gray-400 w-full sm:w-4/5 max-w-2xl text-xs sm:text-sm lg:text-base print:text-sm">
              <thead>
                <tr className="bg-orange-200">
                  <th className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-bold">Total Marks / कुल अंक</th>
                  <th className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-bold">Maximum Marks / अधिकतम अंक</th>
                  <th className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-bold">Percentage / प्रतिशत</th>
                  <th className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-bold">Grade / श्रेणी</th>
                </tr>
              </thead>
              <tbody>
                <tr className="h-6 sm:h-10 print:h-9">
                  <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 text-center font-bold text-sm sm:text-lg">
                    {grandTotal}
                  </td>
                  <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 text-center font-bold text-sm sm:text-lg">
                    {maxTotal}
                  </td>
                  <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 text-center font-bold text-sm sm:text-lg">
                    {percentage.toFixed(1)}%
                  </td>
                  <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 text-center font-bold text-base sm:text-2xl print:text-xl">
                    {grade}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Signature Section */}
      <div className="mb-1 sm:mb-2 print:mb-1">
        <table className="w-full border-collapse border border-gray-400 text-xs sm:text-sm lg:text-base print:text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-bold">Class Teacher / कक्षा शिक्षक</th>
              <th className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-bold">Date of Issue / जारी तिथि</th>
              <th className="border border-gray-400 p-0.5 sm:p-2 print:p-2 font-bold">Principal / प्रधानाचार्य</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 h-8 sm:h-12 print:h-10"></td>
              <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 h-8 sm:h-12 print:h-10"></td>
              <td className="border border-gray-400 p-0.5 sm:p-2 print:p-2 h-8 sm:h-12 print:h-10"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Line */}
      <div className="flex justify-center mb-1 print:mb-1">
        <div className="w-32 sm:w-64 lg:w-96 print:w-64 h-0.5 bg-orange-500"></div>
      </div>

      {/* Upanishad Quote */}
      <div className="text-center mt-1 mb-1 print:mt-1 print:mb-1 px-1 sm:px-2">
        <span className="text-yellow-800 font-serif text-xs sm:text-sm lg:text-base print:text-sm leading-tight sm:leading-relaxed">
          ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्माऽमृतं गमय। ॐ शांति: शांति: शांति: ॥
        </span>
      </div>
    </div>
  )
}
