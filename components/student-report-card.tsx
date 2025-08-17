import type { StudentData, ExamResult } from "@/lib/data"
import Image from "next/image"

// Define the color scheme to match the new design
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

interface StudentReportCardProps {
  student: StudentData
  examResult: ExamResult
}

export default function StudentReportCard({ student, examResult }: StudentReportCardProps) {
  const academicSubtotal = examResult.academicMarks.reduce((sum, subject) => sum + subject.scaledMarks, 0)
  const coActivitiesSubtotal = examResult.coActivities.reduce((sum, activity) => sum + activity.marks, 0)
  const coActivitiesTotal = examResult.coActivities.reduce((sum, activity) => sum + activity.outOf, 0)
  const academicRawTotal = examResult.academicMarks.reduce((sum, subject) => sum + subject.rawMarks, 0)
  const academicMaxTotal = examResult.academicMarks.reduce((sum, subject) => sum + subject.total, 0)

  // Get exam title based on type
  const getExamTitle = () => {
    switch (examResult.examType) {
      case "jigyasa-anveshan":
        return `JIGYASA ANVESHAN ${examResult.examPeriod.toUpperCase()}`
      case "bodha-manthan":
        return `BODHA MANTHAN ${examResult.examPeriod.toUpperCase()}`
      case "pragya-siddhi":
        return `PRAGYA SIDDHI ${examResult.examPeriod.toUpperCase()}`
      default:
        return examResult.examPeriod.toUpperCase()
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
    // Example: "JIGYASAANVESHAN III....JULY 2025"
    const engTitle = getExamTitle()
    // Try to extract type, number, month, year
    const match = engTitle.match(/([A-Z ]+)(?:\s+([IVX]+))?\.*\s*([A-Z]+)\s*(\d{4})?/)
    if (!match) return ""
    const [, type, number, month, year] = match
    const hindiType = examTypeHindiMap[examResult.examType] || type
    const hindiMonth = monthHindiMap[month] || month
    return `${hindiType}${number ? ` ${number}` : ""}${month && year ? `....${hindiMonth} ${year}` : ""}`
  }

  // Mapping for grade to Hindi
  const gradeHindiMap: Record<string, string> = {
    A1: "ए1",
    A2: "ए2",
    B1: "बी1",
    B2: "बी2",
    C1: "सी1",
    C2: "सी2",
    D: "डी",
    E: "ई",
    Excellent: "प्रशंसनीय",
    "Very Good": "अति उत्तम",
    Good: "उत्तम",
    Average: "औसत",
    "Needs Improvement": "सुधार आवश्यक",
  }

  // Helper to format numbers: integer if whole, else one decimal
  function formatMark(val: number) {
    return Number.isInteger(val) ? val : val.toFixed(1)
  }

  return (
    <div className="w-full max-w-4xl mx-auto print:max-w-none print:mx-0">
      <div className="relative w-full bg-white shadow-lg" style={{ aspectRatio: "210/297" }}>
        {/* Inner container that scales content to fit A4 proportions */}
        <div
          className="absolute inset-0 origin-top-left"
          style={{
            transform: "scale(var(--scale-factor, 1))",
            transformOrigin: "top left",
            width: "210mm",
            height: "297mm",
            "--scale-factor": "min(100vw / 210mm, 100vh / 297mm)",
          }}
        >
          <div className="w-full h-full p-2 bg-white overflow-hidden" style={{ fontFamily: "serif" }}>
            {/* Decorative Border */}
            <div className="absolute inset-0 border-4 border-orange-300 m-1"></div>

            {/* Header Section */}
            <div className="relative z-10 mb-2">
              <div className="bg-yellow-50 p-2 border border-gray-200">
                <div className="flex items-center">
                  {/* Left Logo */}
                  <div className="flex-shrink-0 p-2">
                    <Logo type="dbg" />
                  </div>

                  {/* Center Content */}
                  <div className="text-center flex-1 mx-2">
                    <h1 className="text-xl font-bold text-blue-900 mb-1">
                      DIVYA BIHAR GLOBAL GURUKULAM
                      <span className="block text-yellow-700 text-base font-serif font-semibold">
                        दिव्य बिहार ग्लोबल गुरुकुलम्
                      </span>
                    </h1>
                    <p className="text-sm mb-1">Raghopur, Supaul, Bihar – 852111</p>
                    <p className="text-xs mb-1">
                      Managed by: <span className="font-bold">Divya Bihar Mission</span>
                    </p>
                    <p className="text-xs italic text-orange-500">Education with Yogic Values</p>
                  </div>

                  {/* Right Logo */}
                  <div className="flex-shrink-0 p-2">
                    <Logo type="dbm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mantra Section */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-md py-2 px-4 mb-2 text-center max-w-2xl mx-auto">
              <div className="text-yellow-800 font-semibold leading-snug text-sm font-serif">
                ॐ सह नाववतु। सह नौ भुनक्तु।
                <br />
                सह वीर्यं करवावहै।
                <br />
                तेजस्विनावधीतमस्तु मा विद्विषावहै॥
                <br />ॐ शांति, शांति, शांतिः
              </div>
            </div>

            {/* Assessment Title */}
            <div className="bg-orange-100 p-2 mb-2 text-center">
              <h3 className="text-base font-bold text-blue-900 mb-1">{getExamTitle()}</h3>
              <div className="text-sm font-bold text-yellow-800 mb-1 font-serif">{getDevanagariExamTitle()}</div>
              <h4 className="text-sm font-bold text-green-700">
                {examResult.examType === "jigyasa-anveshan"
                  ? "Monthly Assessment Report"
                  : examResult.examType === "bodha-manthan"
                    ? "Term-End Assessment Report"
                    : "Annual Assessment Report"}
              </h4>
            </div>

            {/* Student Information */}
            <div className="mb-2">
              <table className="w-full border-collapse border border-gray-400 text-xs">
                <tbody>
                  <tr className="bg-gray-100">
                    <td className="border border-gray-400 p-1 font-bold text-blue-900">
                      Student Name / विद्यार्थी नाम: {student.name}
                    </td>
                    <td className="border border-gray-400 p-1 font-bold text-blue-900">
                      Class / कक्षा: {student.class}
                    </td>
                    <td className="border border-gray-400 p-1 font-bold text-blue-900">
                      Roll No / क्रमांक: {student.rollNo}
                    </td>
                    <td className="border border-gray-400 p-1 font-bold text-blue-900">
                      Period / अवधि: {examResult.examPeriod}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-1 font-bold text-blue-900" colSpan={2}>
                      Father's Name / पिता का नाम: {student.fatherName}
                    </td>
                    <td className="border border-gray-400 p-1 font-bold text-blue-900" colSpan={2}>
                      Mother's Name / माता का नाम: {student.motherName}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Academic Subjects */}
            <div className="mb-2">
              <h3 className="text-center text-sm font-bold text-green-700 mb-1">ACADEMIC SUBJECTS / पाठ्यक्रम विषय</h3>
              <table className="w-full border-collapse border border-gray-400 text-xs">
                <thead>
                  <tr className="bg-blue-800 text-white">
                    <th className="border border-gray-400 p-1 font-bold">Subject / विषय</th>
                    <th className="border border-gray-400 p-1 font-bold">Raw Marks / कुल अंक</th>
                    <th className="border border-gray-400 p-1 font-bold">Total / पूर्णांक</th>
                    <th className="border border-gray-400 p-1 font-bold">Scaled Marks / स्केल्ड अंक</th>
                    <th className="border border-gray-400 p-1 font-bold">Out of / अधिकतम</th>
                  </tr>
                </thead>
                <tbody>
                  {examResult.academicMarks.map((subject, index) => (
                    <tr key={index}>
                      <td className="border border-gray-400 p-1">{subject.subject}</td>
                      <td className="border border-gray-400 p-1 text-center">{formatMark(Number(subject.rawMarks))}</td>
                      <td className="border border-gray-400 p-1 text-center">{formatMark(Number(subject.total))}</td>
                      <td className="border border-gray-400 p-1 text-center">
                        {Number(subject.scaledMarks).toFixed(1)}
                      </td>
                      <td className="border border-gray-400 p-1 text-center">{formatMark(Number(subject.outOf))}</td>
                    </tr>
                  ))}
                  <tr className="bg-orange-100">
                    <td className="border border-gray-400 p-1 font-bold">Academic Subtotal</td>
                    <td className="border border-gray-400 p-1 text-center font-bold">{formatMark(academicRawTotal)}</td>
                    <td className="border border-gray-400 p-1 text-center font-bold">{formatMark(academicMaxTotal)}</td>
                    <td className="border border-gray-400 p-1 text-center font-bold">{academicSubtotal.toFixed(1)}</td>
                    <td className="border border-gray-400 p-1 text-center font-bold">{formatMark(60)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Co-Curricular Activities */}
            <div className="mb-2">
              <h3 className="text-center text-sm font-bold text-green-700 mb-1">
                CO-CURRICULAR ACTIVITIES / सह-पाठ्यक्रम गतिविधियां
              </h3>
              <table className="w-full border-collapse border border-gray-400 text-xs">
                <thead>
                  <tr className="bg-green-700 text-white">
                    <th className="border border-gray-400 p-1 font-bold">Activity / गतिविधि</th>
                    <th className="border border-gray-400 p-1 font-bold">Marks / अंक</th>
                    <th className="border border-gray-400 p-1 font-bold">Out of / अधिकतम</th>
                    <th className="border border-gray-400 p-1 font-bold">Activity / गतिविधि</th>
                    <th className="border border-gray-400 p-1 font-bold">Marks / अंक</th>
                    <th className="border border-gray-400 p-1 font-bold">Out of / अधिकतम</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.ceil(examResult.coActivities.length / 2) }).map((_, rowIndex) => {
                    const leftActivity = examResult.coActivities[rowIndex * 2]
                    const rightActivity = examResult.coActivities[rowIndex * 2 + 1]
                    return (
                      <tr key={rowIndex}>
                        <td className="border border-gray-400 p-1">{leftActivity?.activity || ""}</td>
                        <td className="border border-gray-400 p-1 text-center">
                          {leftActivity?.marks !== undefined ? Number(leftActivity.marks).toFixed(1) : ""}
                        </td>
                        <td className="border border-gray-400 p-1 text-center">
                          {leftActivity?.outOf !== undefined ? Number(leftActivity.outOf).toFixed(1) : ""}
                        </td>
                        <td className="border border-gray-400 p-1">{rightActivity?.activity || ""}</td>
                        <td className="border border-gray-400 p-1 text-center">
                          {rightActivity?.marks !== undefined ? Number(rightActivity.marks).toFixed(1) : ""}
                        </td>
                        <td className="border border-gray-400 p-1 text-center">
                          {rightActivity?.outOf !== undefined ? Number(rightActivity.outOf).toFixed(1) : ""}
                        </td>
                      </tr>
                    )
                  })}
                  <tr className="bg-orange-100">
                    <td className="border border-gray-400 p-1 font-bold text-center" colSpan={6}>
                      Co-Curricular Subtotal: {coActivitiesSubtotal.toFixed(1)} / {formatMark(coActivitiesTotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Performance Summary */}
            <div className="mb-2">
              <div className="bg-blue-50 p-2 border border-gray-200">
                <h3 className="text-center text-sm font-bold text-green-700 mb-1">
                  PERFORMANCE SUMMARY / प्रदर्शन सारांश
                </h3>
                <div className="flex justify-center">
                  <table className="border-collapse border border-gray-400 w-full max-w-lg text-xs">
                    <thead>
                      <tr className="bg-orange-200">
                        <th className="border border-gray-400 p-1 font-bold">Total Marks</th>
                        <th className="border border-gray-400 p-1 font-bold">Maximum Marks</th>
                        <th className="border border-gray-400 p-1 font-bold">Percentage</th>
                        <th className="border border-gray-400 p-1 font-bold">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-400 p-1 text-center">
                          {formatMark(Number(examResult.totalMarks))}
                        </td>
                        <td className="border border-gray-400 p-1 text-center">
                          {formatMark(Number(examResult.maxMarks))}
                        </td>
                        <td className="border border-gray-400 p-1 text-center">
                          {Number(examResult.percentage).toFixed(1)}%
                        </td>
                        <td className="border border-gray-400 p-1 text-center font-bold">
                          {examResult.grade} / {gradeHindiMap[examResult.grade] || examResult.grade}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Signature Section */}
            <div className="mb-2">
              <table className="w-full border-collapse border border-gray-400 text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 p-1 font-bold">Class Teacher / कक्षा शिक्षक</th>
                    <th className="border border-gray-400 p-1 font-bold">Date of Issue / जारी तिथि</th>
                    <th className="border border-gray-400 p-1 font-bold">Principal / प्रधानाचार्य</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-1 h-8"></td>
                    <td className="border border-gray-400 p-1 h-8"></td>
                    <td className="border border-gray-400 p-1 h-8"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer Line */}
            <div className="flex justify-center">
              <div className="w-64 h-0.5 bg-orange-500"></div>
            </div>
            {/* Upanishad Quote */}
            <div className="text-center mt-1 mb-1">
              <span className="text-yellow-800 font-serif text-xs">
                ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्माऽमृतं गमय। ॐ शांति: शांति: शांति: ॥
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
