"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Search, AlertCircle, Home, X, ChevronDown } from "lucide-react"
import { findStudent } from "@/lib/data"

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
const callout = "text-base font-normal leading-6 text-gray-600"

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
  const [isClassSelectorOpen, setClassSelectorOpen] = useState(false)

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
    if (nameError) setNameError("")
  }

  const handleRollNumberChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, '')
    setRollNumber(cleaned)
  }

  const normalizeRollNumber = (roll: string) => roll.trim().replace(/^0+/, '')
  const normalizeName = (name: string) => name.trim().toLowerCase().replace(/\s+/g, ' ')

  const isNameMatch = (searchName: string, studentName: string) => {
    if (!searchName || !studentName) return false
    const normalizedSearch = normalizeName(searchName)
    const normalizedStudent = normalizeName(studentName)
    return normalizedStudent.includes(normalizedSearch)
  }

  const handleSearch = () => {
    if (!selectedClass || !rollNumber || !studentName) return

    const normalizedRoll = normalizeRollNumber(rollNumber)
    const student = findStudent(selectedClass, normalizedRoll)

    if (!student || !isNameMatch(studentName, student.name)) {
      setNameError("Name does not match our records.")
      return
    }

    setIsVerifying(true)
    router.push(`/results/${academicYear}/${examType}/${encodeURIComponent(examPeriod)}/student/${student.id}`)
  }

  const canSearch = selectedClass && rollNumber && studentName.trim().length >= 3 && !nameError

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
      <div className="px-4 py-6 pb-32 max-w-md mx-auto">
        <motion.div 
          className="mb-8 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className={`${largeTitle} text-gray-900 mb-2`}>{getExamTitle()}</h1>
          <p className={`${callout}`}>Enter your details to view your results</p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-sm w-full"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.1 }}
        >
          <div className="space-y-6">
            {/* Class Selection */}
            <div className="relative">
              <button
                onClick={() => setClassSelectorOpen(!isClassSelectorOpen)}
                className="w-full h-16 px-6 text-lg text-left flex items-center justify-between bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <span>{classesData.find(c => c.id === selectedClass)?.name || "Select your class"}</span>
                <ChevronDown className={`h-6 w-6 text-gray-400 transition-transform ${isClassSelectorOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isClassSelectorOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
                  >
                    <ul className="py-2">
                      {classesData.map((cls) => (
                        <li key={cls.id}>
                          <button
                            onClick={() => {
                              setSelectedClass(cls.id)
                              setClassSelectorOpen(false)
                            }}
                            className="w-full text-left px-6 py-3 text-lg hover:bg-gray-100"
                          >
                            {cls.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Roll Number */}
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

            {/* Student Name */}
            <div className="relative">
              <input
                id="studentName"
                type="text"
                placeholder="Enter your full name"
                value={studentName}
                onChange={(e) => handleNameChange(e.target.value)}
                className={`w-full h-16 px-6 text-lg border-2 ${nameError ? 'border-red-300' : 'border-gray-200'} rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {studentName && !nameError && (
                 <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-gray-500"
                  onClick={() => setStudentName("")}
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              {nameError && (
                <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {nameError && (
              <p className="-mt-4 text-sm text-red-600 px-2">{nameError}</p>
            )}
          </div>

          <button
            disabled={!canSearch || isVerifying}
            onClick={handleSearch}
            className={`w-full h-16 mt-6 text-lg font-medium text-white rounded-2xl transition-all duration-200 disabled:cursor-not-allowed ${isVerifying || !canSearch ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {isVerifying ? 'Verifying...' : 'Show Result'}
          </button>
        </motion.div>
      </div>
    </div>
  )
}
