import { notFound } from "next/navigation"
import { questionPapers } from "@/lib/data"
import Image from "next/image"

// --- Utility ---------------------------------------------------------------
/**
 * Normalize legacy `setData` (which only had a `questions` array) into the
 * new shape that contains `objectiveQuestions`, `shortAnswerQuestions`,
 * and `longAnswerQuestions`.  If the new keys already exist we return them
 * unchanged; otherwise we partition by the marks on each question.
 */
function normalizeSetData(setData: any) {
  if (setData.objectiveQuestions && setData.shortAnswerQuestions && setData.longAnswerQuestions) {
    return {
      objectiveQuestions: setData.objectiveQuestions,
      shortAnswerQuestions: setData.shortAnswerQuestions,
      longAnswerQuestions: setData.longAnswerQuestions,
    }
  }

  // fallback for old schema
  const objectives = (setData.questions ?? []).filter((q: any) => q.marks === 1)
  const shorts = (setData.questions ?? []).filter((q: any) => q.marks === 2)
  const longs = (setData.questions ?? []).filter((q: any) => q.marks === 5)

  // Ensure the expected counts, but don't crash if fewer are present.
  return {
    objectiveQuestions: objectives.slice(0, 25),
    shortAnswerQuestions: shorts.slice(0, 10),
    longAnswerQuestions:
      longs.length > 0
        ? [
            {
              ...longs[0],
              orQuestion: longs[1]?.text ?? null,
            },
          ]
        : [],
  }
}

// Logo component using actual PNG images
const Logo = ({ type }: { type: "dbg" | "dbm" }) => (
  <div className="flex items-center justify-center w-12 h-12 print:w-8 print:h-8">
    <div className="w-12 h-12 print:w-8 print:h-8 relative">
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

interface QuestionPaperProps {
  className: string
  subject: string
  chapter: string
  set: number
}

export default function QuestionPaper({ className, subject, chapter, set }: QuestionPaperProps) {
  const classData = (questionPapers as any)[className]
  if (!classData) {
    console.log("Class data not found:", className)
    return notFound()
  }

  // Case-insensitive and space-insensitive subject and chapter matching
  const normalizedSubject = Object.keys(classData).find(
    (key) => key.replace(/\s+/g, "").toLowerCase() === subject.replace(/\s+/g, "").toLowerCase(),
  )
  if (!normalizedSubject) {
    console.log("Subject data not found:", subject)
    return notFound()
  }
  const subjectData = classData[normalizedSubject]
  if (!subjectData) {
    console.log("Subject data not found:", subject)
    return notFound()
  }

  const normalizedChapter = subjectData.chapters?.find(
    (c: any) => c && c.name && c.name.replace(/\s+/g, "").toLowerCase() === chapter.replace(/\s+/g, "").toLowerCase(),
  )
  const chapterData = normalizedChapter
  if (!chapterData) {
    console.log("Chapter data not found:", chapter)
    return notFound()
  }

  const rawSetData = chapterData.sets.find((s: any) => s.set === set)
  if (!rawSetData) {
    console.log("Set data not found:", set)
    return notFound()
  }

  const { objectiveQuestions, shortAnswerQuestions, longAnswerQuestions } = normalizeSetData(rawSetData)

  console.log("Questions found:", {
    objective: objectiveQuestions.length,
    short: shortAnswerQuestions.length,
    long: longAnswerQuestions.length,
  })

  return (
    <div className="text-sm print:text-[9px] leading-normal print:leading-tight">
      {/* PAGE 1 - A4 Optimized */}
      <div
        className="w-full max-w-[210mm] min-h-[297mm] mx-auto p-6 print:p-3 bg-white relative border border-gray-300 print:border-0 print:w-full print:min-h-full"
        style={{ fontFamily: "serif" }}
      >
        {/* Decorative Border */}
        <div className="absolute inset-3 print:inset-1 border-2 border-orange-300 pointer-events-none"></div>

        {/* Header Section */}
        <div className="relative z-10 mb-4 print:mb-2">
          <div className="bg-yellow-50 p-3 print:p-1 border border-gray-200 rounded">
            <div className="flex items-center justify-between">
              {/* Left Logo */}
              <div className="flex-shrink-0">
                <Logo type="dbg" />
              </div>

              {/* Center Content */}
              <div className="text-center flex-1 mx-4 print:mx-2">
                <h1 className="text-lg print:text-xs font-bold text-blue-900 mb-1 print:mb-0">
                  DIVYA BIHAR GLOBAL GURUKULAM
                  <span className="block text-yellow-700 text-sm print:text-[8px] font-serif font-semibold">
                    दिव्य बिहार ग्लोबल गुरुकुलम्
                  </span>
                </h1>
                <p className="text-sm print:text-[8px] mb-1 print:mb-0">Raghopur, Supaul, Bihar – 852111</p>
                <p className="text-sm print:text-[8px] mb-1 print:mb-0">
                  Managed by: <span className="font-bold">Divya Bihar Mission</span>
                </p>
                <p className="text-sm print:text-[8px] italic text-orange-500">Education with Yogic Values</p>
              </div>

              {/* Right Logo */}
              <div className="flex-shrink-0">
                <Logo type="dbm" />
              </div>
            </div>
          </div>
        </div>

        {/* Mantra Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded py-2 px-3 print:py-1 print:px-1 mb-4 print:mb-2 text-center">
          <div className="text-yellow-800 font-semibold text-sm print:text-[8px] font-serif">
            ॐ सह नाववतु। सह नौ भुनक्तु। सह वीर्यं करवावहै। तेजस्विनावधीतमस्तु मा विद्विषावहै॥ ॐ शांति, शांति, शांतिः
          </div>
        </div>

        {/* Question Paper Title */}
        <div className="bg-orange-100 p-3 print:p-1 mb-4 print:mb-2 text-center rounded">
          <h3 className="text-lg print:text-xs font-bold text-blue-900 mb-1 print:mb-0">QUESTION PAPER / प्रश्न पत्र</h3>
          <div className="text-base print:text-[9px] font-bold text-green-700">
            Class {className} - {subject}
          </div>
          <div className="text-sm print:text-[9px] text-gray-700 mt-1">
            Chapter: {chapter} | Set: {set}
          </div>
        </div>

        {/* Exam Details */}
        <div className="mb-4 print:mb-2">
          <table className="w-full border-collapse border border-gray-400 text-sm print:text-[9px]">
            <tbody>
              <tr className="bg-gray-100">
                <td className="border border-gray-400 p-2 print:p-1 font-bold text-blue-900">Time / समय: 1 Hour</td>
                <td className="border border-gray-400 p-2 print:p-1 font-bold text-blue-900">Max Marks / पूर्णांक: 50</td>
                <td className="border border-gray-400 p-2 print:p-1 font-bold text-blue-900">
                  Class / कक्षा: {className}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 print:p-1 font-bold text-blue-900" colSpan={2}>
                  Subject / विषय: {subject}
                </td>
                <td className="border border-gray-400 p-2 print:p-1 font-bold text-blue-900">
                  Chapter / अध्याय: {chapter}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Instructions */}
        <div className="mb-4 print:mb-2 bg-blue-50 p-3 print:p-1 border border-blue-200 rounded">
          <h4 className="text-sm print:text-[9px] font-bold text-blue-900 mb-2 print:mb-1">INSTRUCTIONS / निर्देश:</h4>
          <ul className="text-sm print:text-[8px] text-gray-700 space-y-1 print:space-y-0 list-disc list-inside">
            <li>All questions are compulsory / सभी प्रश्न अनिवार्य हैं</li>
            <li>Section A: 25 MCQs (1 mark each) / खंड अ: 25 वस्तुनिष्ठ प्रश्न (प्रत्येक 1 अंक)</li>
            <li>Section B: 10 Short Questions (2 marks each) / खंड ब: 10 लघु उत्तरीय प्रश्न (प्रत्येक 2 अंक)</li>
            <li>Section C: 1 Long Question with OR (5 marks) / खंड स: 1 दीर्घ उत्तरीय प्रश्न अथवा सहित (5 अंक)</li>
          </ul>
        </div>

        {/* Section A - Objective Questions */}
        <div className="mb-4 print:mb-2">
          <h3 className="text-center text-base print:text-[9px] font-bold text-green-700 mb-3 print:mb-1 bg-green-100 p-2 print:p-1 rounded">
            SECTION A - OBJECTIVE QUESTIONS / खंड अ - वस्तुनिष्ठ प्रश्न (25 × 1 = 25 marks)
          </h3>
          <div className="text-sm print:text-[8px] text-center mb-3 print:mb-1 text-gray-600">
            Choose the correct option / सही विकल्प चुनें
          </div>

          <div className="space-y-3 print:space-y-1">
            {objectiveQuestions.map((question: any, index: number) => (
              <div key={index} className="border border-gray-300 p-3 print:p-1 rounded bg-white">
                <div className="flex items-start justify-between mb-2 print:mb-1">
                  <div className="flex items-start flex-1">
                    <span className="font-bold text-blue-900 mr-2 print:mr-1 text-sm print:text-[9px] flex-shrink-0">
                      {question.number}.
                    </span>
                    <span className="text-sm print:text-[9px] flex-1 leading-relaxed">{question.text}</span>
                  </div>
                  <span className="text-xs print:text-[8px] text-gray-500 ml-2 print:ml-1 flex-shrink-0 bg-gray-100 px-2 py-1 rounded">
                    [{question.marks}]
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1 ml-6 print:ml-3 text-sm print:text-[8px]">
                  <div className="p-1 bg-gray-50 rounded">(a) {question.options.a}</div>
                  <div className="p-1 bg-gray-50 rounded">(b) {question.options.b}</div>
                  <div className="p-1 bg-gray-50 rounded">(c) {question.options.c}</div>
                  <div className="p-1 bg-gray-50 rounded">(d) {question.options.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PAGE 2 - A4 Optimized */}
      <div
        className="w-full max-w-[210mm] min-h-[297mm] mx-auto p-6 print:p-3 bg-white relative border border-gray-300 print:border-0 print:w-full print:min-h-full print:break-before-page mt-8 print:mt-0"
        style={{ fontFamily: "serif" }}
      >
        {/* Decorative Border */}
        <div className="absolute inset-3 print:inset-1 border-2 border-orange-300 pointer-events-none"></div>

        {/* Page 2 Header */}
        <div className="relative z-10 mb-4 print:mb-2 text-center">
          <div className="bg-orange-100 p-3 print:p-1 rounded">
            <h3 className="text-base print:text-[9px] font-bold text-blue-900">
              Class {className} - {subject} | Chapter: {chapter} | Set: {set} | Page 2
            </h3>
          </div>
        </div>

        {/* Section B - Short Answer Questions */}
        <div className="mb-6 print:mb-3">
          <h3 className="text-center text-base print:text-[9px] font-bold text-green-700 mb-4 print:mb-2 bg-green-100 p-2 print:p-1 rounded">
            SECTION B - SHORT ANSWER QUESTIONS / खंड ब - लघु उत्तरीय प्रश्न (10 × 2 = 20 marks)
          </h3>

          <div className="space-y-4 print:space-y-2">
            {shortAnswerQuestions.map((question: any, index: number) => (
              <div
                key={index}
                className="border-l-4 border-blue-500 pl-4 print:pl-2 py-3 print:py-1 bg-blue-50 rounded-r"
              >
                <div className="flex justify-between items-start mb-2 print:mb-1">
                  <span className="font-bold text-blue-900 text-sm print:text-[9px]">{question.number}.</span>
                  <span className="text-xs print:text-[8px] text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    [{question.marks} marks]
                  </span>
                </div>
                <p className="text-sm print:text-[9px] text-gray-700 leading-relaxed">{question.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section C - Long Answer Questions */}
        <div className="mb-6 print:mb-3">
          <h3 className="text-center text-base print:text-[9px] font-bold text-green-700 mb-4 print:mb-2 bg-green-100 p-2 print:p-1 rounded">
            SECTION C - LONG ANSWER QUESTION / खंड स - दीर्घ उत्तरीय प्रश्न (1 × 5 = 5 marks)
          </h3>

          <div className="space-y-4 print:space-y-2">
            {longAnswerQuestions.map((question: any, index: number) => (
              <div key={index} className="border border-gray-400 p-4 print:p-2 rounded bg-yellow-50">
                <div className="flex justify-between items-start mb-3 print:mb-1">
                  <span className="font-bold text-blue-900 text-sm print:text-[9px]">{question.number}.</span>
                  <span className="text-xs print:text-[8px] text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    [{question.marks} marks]
                  </span>
                </div>
                <p className="text-sm print:text-[9px] text-gray-700 leading-relaxed mb-4 print:mb-2">
                  {question.text}
                </p>

                {question.orQuestion && (
                  <>
                    <div className="text-center my-4 print:my-2">
                      <span className="bg-yellow-200 px-4 print:px-2 py-2 print:py-1 text-sm print:text-[9px] font-bold text-blue-900 rounded-full">
                        OR / अथवा
                      </span>
                    </div>
                    <p className="text-sm print:text-[9px] text-gray-700 leading-relaxed">{question.orQuestion}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Line */}
        <div className="flex justify-center mb-4 print:mb-2">
          <div className="w-32 print:w-24 h-1 bg-orange-500 rounded"></div>
        </div>

        {/* Upanishad Quote */}
        <div className="text-center mt-4 print:mt-2">
          <span className="text-yellow-800 font-serif text-sm print:text-[8px] bg-yellow-50 px-4 py-2 rounded">
            ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्माऽमृतं गमय। ॐ शान्ति: शान्ति: शान्ति: ॥
          </span>
        </div>
      </div>
    </div>
  )
}
