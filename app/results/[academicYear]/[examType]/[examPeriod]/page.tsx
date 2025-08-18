"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, AlertCircle, Home, X } from "lucide-react"
import { classes, findStudent } from "@/lib/data"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      damping: 25,
      stiffness: 300
    } 
  },
  exit: { opacity: 0, y: -10 }
}

// Typography
const largeTitle = "text-3xl font-semibold tracking-tight"
const title1 = "text-2xl font-semibold tracking-tight"
const title2 = "text-xl font-semibold tracking-tight"
const title3 = "text-lg font-semibold tracking-tight"
const headline = "text-base font-medium tracking-tight text-blue-500"
const body = "text-base font-normal leading-6"
const callout = "text-base font-normal leading-6 text-gray-600"
const subheadline = "text-sm font-normal text-gray-500"
const footnote = "text-xs font-normal text-gray-500"

// Classes data
const classesData = Array.from({ length: 8 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Class ${i + 1}${i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'}`
}))

interface PageProps {
  params: {
    academicYear: string
    examType: string
    examPeriod: string
  }
}

export default function StudentSearchPage({ params }: PageProps) {
  const router = useRouter()
  const [selectedClass, setSelectedClass] = useState("4")
  const [rollNumber, setRollNumber] = useState("")
  const [studentName, setStudentName] = useState("")
  const [nameError, setNameError] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const { academicYear, examType, examPeriod: rawExamPeriod } = params
  const examPeriod = decodeURIComponent(rawExamPeriod)
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
    const cleaned = value.replace(/[^0-9\s]/g, '')
    setRollNumber(cleaned)
    setNameError("")
  }

  const handleSearch = () => {
    if (!selectedClass || !rollNumber || !studentName) return

    const normalizedRoll = normalizeRollNumber(rollNumber)
    const student = findStudent(selectedClass, normalizedRoll)

    if (!student) {
      setNameError("No student found with the provided details.")
      return
    }

    if (!isNameMatch(studentName, student.name)) {
      setNameError("Name does not match our records.")
      return
    }

    setIsVerifying(true)
    router.replace(
      `/results/${academicYear}/${examType}/${encodeURIComponent(examPeriod)}/student/${student.id}/multi-mode`,
      undefined,
      { shallow: true }
    )
  }

  const canSearch = selectedClass && rollNumber && studentName.trim().length >= 3

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="h-12 bg-white border-b border-gray-100 flex items-center justify-between px-4">
        <span className="font-medium">Gurukulam</span>
        <Link href="/" className="p-2 -mr-2">
          <Home className="w-5 h-5 text-blue-500" />
        </Link>
      </div>
      
      {/* Main Content */}
      <div className="px-4 py-6 pb-32 max-w-4xl mx-auto lg:px-6">
        <motion.div 
          className="mb-8 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className={`${largeTitle} text-gray-900 mb-2`}>{getExamTitle()}</h1>
          <p className={`${callout} text-gray-600`}>Enter your details to view your results</p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-2xl p-6 mb-6 shadow-sm w-full"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.1 }}
        >
          
          {/* Class Selection */}
          <div className="mb-6">
            <div className="relative w-full">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full h-16 px-6 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">Select your class</option>
                {classesData.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm sm:text-base mt-6 mb-6">
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full flex items-center">
              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {academicYear}
            </span>
            <span className="hidden sm:block text-gray-400">•</span>
            <span className="text-gray-600">Enter student details to view results</span>
          </div>
          {/* Roll Number */}
          <div className="mb-6">
            <div className="relative">
              <input
                id="rollNumber"
                type="text"
                inputMode="numeric"
                placeholder="Enter your roll number"
                value={rollNumber}
                onChange={(e) => handleRollNumberChange(e.target.value)}
                className="w-full h-16 px-6 text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {rollNumber && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-gray-500"
                  onClick={() => setRollNumber("")}
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Student Name */}
          <div className="mb-8">
            <div className="relative">
              <input
                id="studentName"
                type="text"
                placeholder="Enter your full name (as per school records)"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className={`w-full h-16 px-6 text-lg border-2 ${
                  nameError ? 'border-red-300' : 'border-gray-200'
                } rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {nameError && (
                <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {nameError && (
              <p className="mt-2 text-sm text-red-600 px-2">{nameError}</p>
            )}
          </div>

          <button
            disabled={!selectedClass || !rollNumber || !studentName || isVerifying}
            onClick={handleSearch}
            className={`w-full h-16 text-lg font-medium text-white rounded-2xl transition-all duration-200 ${
              !selectedClass || !rollNumber || !studentName || isVerifying
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transform active:scale-95'
            }`}
          >
            {isVerifying ? 'Verifying...' : 'Show Result'}
          </button>
        </motion.div>
      </div>
    </div>
  )
}
