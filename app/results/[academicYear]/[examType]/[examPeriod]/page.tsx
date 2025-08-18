"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, AlertCircle, Users, BookOpen, Shield, ChevronRight, X as XIcon } from "lucide-react"
import { classes, findStudent, getClassStats } from "@/lib/data"

// Typography tokens (aligned with main results page)
const largeTitle = "text-3xl font-semibold tracking-tight"
const callout = "text-base font-normal leading-6 text-gray-600"

interface PageProps {
  params: Promise<{
    academicYear: string
    examType: string
    examPeriod: string
  }>
}

/**
 * iOS-style bottom sheet select (presentation only).
 * Uses the string `value` you pass through — we pass values from `classes` so logic stays intact.
 * Minor visual polish added (backdrop blur, smoother button).
 */
const IOSSelect = ({
  value,
  onValueChange,
  items,
  placeholder,
  disabled = false
}: {
  value: string
  onValueChange: (value: string) => void
  items: { value: string; label: string }[]
  placeholder: string
  disabled?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState("")

  useEffect(() => {
    const selected = items.find(item => item.value === value)
    setSelectedLabel(selected?.label || "")
  }, [value, items])

  return (
    <div className="relative w-full">
      <button
        className={`w-full text-left rounded-2xl border-2 flex items-center justify-between transition-shadow duration-150 ${
          disabled
            ? "p-3 sm:p-4 bg-gray-100 text-gray-400 border-gray-200"
            : "p-3 sm:p-4 bg-white text-gray-900 border-gray-200 hover:shadow-sm active:bg-gray-50"
        }`}
        onClick={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className={`truncate ${!value ? "text-gray-400" : ""}`}>{selectedLabel || placeholder}</span>
        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "transform rotate-90" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            {/* backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            <motion.div
              className="relative w-full max-w-4xl bg-white rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto mx-auto z-10 shadow-2xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">{placeholder}</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 -mr-2 text-gray-500"
                  aria-label="Close picker"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                {items.map((item) => (
                  <button
                    key={item.value}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      value === item.value ? "bg-blue-50 text-blue-600" : "text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      onValueChange(item.value)
                      setIsOpen(false)
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function StudentSearchPage({ params }: PageProps) {
  const router = useRouter()
  const [selectedClass, setSelectedClass] = useState("")
  const [rollNumber, setRollNumber] = useState("")
  const [studentName, setStudentName] = useState("")
  const [nameError, setNameError] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [resolvedParams, setResolvedParams] = useState<{
    academicYear: string
    examType: string
    examPeriod: string
  } | null>(null)

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params
      setResolvedParams(resolved)
    }
    resolveParams()
  }, [params])

  if (!resolvedParams) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  const { academicYear, examType, examPeriod: rawExamPeriod } = resolvedParams
  const examPeriod = decodeURIComponent(rawExamPeriod)

  // keep exact title logic
  const getExamTitle = () => {
    switch (examType) {
      case "jigyasa-anveshan":
        return `Jigyāsa Anveshan ${examPeriod}`
      case "bodha-manthan":
        return `Bodha Manthan ${examPeriod}`
      case "pragya-siddhi":
        return `Pragya Siddhi ${examPeriod}`
      default:
        return examPeriod
    }
  }

  // --- PRESERVE LOGIC: name cleaning, normalization, matching, roll normalization ---
  const handleNameChange = (value: string) => {
    const cleaned = value.replace(/[^\p{L}\s'-]/gu, '')
    setStudentName(cleaned)
    setNameError("")
  }

  const normalizeRollNumber = (roll: string) => {
    return roll.trim().replace(/^0+/, '')
  }

  const normalizeName = (name: string) => {
    return name.trim().toLowerCase().replace(/\s+/g, ' ')
  }

  const isNameMatch = (searchName: string, studentName: string) => {
    if (!searchName || !studentName) return false
    const normalizedSearch = normalizeName(searchName)
    const normalizedStudent = normalizeName(studentName)
    return normalizedStudent.includes(normalizedSearch)
  }

  const handleRollNumberChange = (value: string) => {
    const normalized = value.replace(/[^0-9\s]/g, '')
    setRollNumber(normalized)
  }

  // ORIGINAL handleSearch logic preserved exactly
  const handleSearch = () => {
    if (!selectedClass || !rollNumber || !studentName.trim()) return

    setIsVerifying(true)

    requestAnimationFrame(() => {
      const normalizedRoll = normalizeRollNumber(rollNumber)
      const student = findStudent(selectedClass, normalizedRoll)

      if (student && !isNameMatch(studentName, student.name)) {
        setNameError("No matching student found. Please check the details and try again.")
        setIsVerifying(false)
        return
      }

      if (student) {
        router.replace(
          `/results/${academicYear}/${examType}/${encodeURIComponent(examPeriod)}/student/${student.id}/multi-mode`,
          undefined,
          { shallow: true }
        )
      } else {
        setNameError("Student not found. Please check the name, class, and roll number.")
        setIsVerifying(false)
      }
    })
  }

  const canSearch = selectedClass && rollNumber && studentName.trim().length >= 3
  const classStats = selectedClass ? getClassStats(selectedClass) : null

  // class items built from original `classes` so findStudent receives expected values
  const classItems = classes.map((cls) => ({ value: cls, label: `Class ${cls}` }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-100 to-green-100">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="relative py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <Link href="/results" className="p-0">
                <Button
                  variant="outline"
                  className="bg-white/90 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-200 border-gray-200 hover:border-gray-300"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Exams
                </Button>
              </Link>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm w-full max-w-2xl mx-auto text-center">
              <h1 className={`${largeTitle} mb-2 bg-gradient-to-r from-amber-600 to-green-700 bg-clip-text text-transparent`}>
                {getExamTitle()}
              </h1>
              <p className={`${callout} text-gray-600`}>Enter student details to view results</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content — note the pb-32 so fixed bottom CTA doesn't overlap content */}
      <div className="px-4 py-6 pb-32 max-w-4xl mx-auto lg:px-6">
        {/* Form Card - subtle hover and smoother shadow */}
        <Card className="rounded-2xl shadow-sm border-0 bg-white overflow-visible hover:shadow-md transition-shadow">
          <CardHeader className="pt-6 pb-0 px-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-4">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800">Student Verification</CardTitle>
                <CardDescription className="text-gray-500">Please provide the exact student details to access the result</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Class Selection */}
              <div className="mb-6">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Select your class <span className="text-red-500">*</span></label>
                <IOSSelect
                  value={selectedClass}
                  onValueChange={setSelectedClass}
                  items={classItems}
                  placeholder="Select your class"
                  disabled={false}
                />
                {classStats && (
                  <p className="text-sm text-gray-500 flex items-center mt-2">
                    <Users className="mr-2 h-4 w-4 text-gray-400" />
                    <span>{classStats.totalStudents} students in this class</span>
                  </p>
                )}
              </div>

              {/* Roll Number */}
              <div className="mb-6">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Roll Number <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9\s]*"
                    placeholder="Enter Roll Number (e.g., 01, 2, 13)"
                    value={rollNumber}
                    onChange={(e) => handleRollNumberChange(e.target.value)}
                    // responsive heights/padding and responsive text size to avoid overflow on small screens
                    className="h-14 sm:h-16 w-full text-left pl-4 sm:pl-6 pr-10 sm:pr-14 text-base sm:text-lg font-mono border-2 border-gray-200 rounded-2xl shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-100"
                    style={{ maxWidth: "100%" }}
                  />
                  {rollNumber && (
                    <button
                      onClick={() => setRollNumber("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2"
                      aria-label="Clear roll number"
                    >
                      <XIcon className="h-5 w-5 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              {/* Student Name */}
              <div className="mb-6">
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Student Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Full Name (as per school records)"
                    value={studentName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    // responsive sizes and shorter padding on mobile so text doesn't disappear
                    className={`h-14 sm:h-16 w-full text-left pl-4 sm:pl-6 pr-10 sm:pr-14 text-base sm:text-lg border-2 ${nameError ? "border-red-400" : "border-gray-200"} rounded-2xl shadow-sm transition-colors focus:outline-none focus:ring-2 ${nameError ? "focus:ring-red-100" : "focus:ring-blue-100"}`}
                    style={{ maxWidth: "100%" }}
                  />
                  {studentName && (
                    <button
                      onClick={() => {
                        setStudentName("")
                        setNameError("")
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2"
                      aria-label="Clear student name"
                    >
                      <XIcon className="h-5 w-5 text-gray-400" />
                    </button>
                  )}
                </div>

                {nameError ? (
                  <div className="flex items-start p-3 rounded-lg bg-red-50 border border-red-100 mt-3">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-600">{nameError}</p>
                  </div>
                ) : (
                  <div className="flex items-start p-3 rounded-lg bg-blue-50 border border-blue-100 mt-3">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-blue-700">
                      <span className="font-medium">Important:</span> Name must match exactly as registered in school records (case-insensitive)
                    </p>
                  </div>
                )}
              </div>

              {/* Small note above bottom CTA */}
              <div>
                <p className="text-sm text-gray-500 text-center">By continuing, you agree to our terms of service and privacy policy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50 overflow-hidden rounded-2xl">
            <div className="p-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-4">
                  <Shield className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-800">Verification Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3">
                {[
                  "Enter student's name exactly as registered",
                  "Ensure correct class and roll number",
                  "All three fields must match our records"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100/50 overflow-hidden rounded-2xl">
            <div className="p-1 bg-gradient-to-r from-green-500 to-green-600 rounded-t-2xl"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-green-100 text-green-600 mr-4">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-800">Need Help?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3">
                {[
                  "Contact school office for assistance",
                  "Verify spelling with class teacher",
                  "Check admission records for exact name"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 text-green-600 text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fixed bottom CTA (matches /results page style and placement) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm border-t border-gray-100 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleSearch}
            disabled={!canSearch || isVerifying}
            className={`block w-full rounded-2xl py-4 text-center font-medium h-16 text-lg transition-colors ${
              canSearch && !isVerifying ? "bg-blue-500 text-white active:bg-blue-600" : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isVerifying ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
                <span>Verifying...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Search className="h-5 w-5 mr-3" />
                <span className="text-lg">Show Result</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
