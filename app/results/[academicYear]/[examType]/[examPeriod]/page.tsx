"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, AlertCircle, Users, BookOpen, Shield } from "lucide-react"
import { classes, findStudent, getClassStats } from "@/lib/data"

const colors = {
  saffron: "#FF9933",
  darkgreen: "#138808",
  navy: "#00008B",
  lightgray: "#F5F5F5",
  headerbg: "#FFF8DC",
}

interface PageProps {
  params: Promise<{
    academicYear: string
    examType: string
    examPeriod: string
  }>
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
    // Allow letters, spaces, and common name characters
    const cleaned = value.replace(/[^\p{L}\s'-]/gu, '')
    setStudentName(cleaned)
    setNameError("")
  }

  // Normalize roll number by removing leading zeros and extra spaces
  const normalizeRollNumber = (roll: string) => {
    return roll.trim().replace(/^0+/, '') // Remove leading zeros and trim spaces
  }

  // Normalize name for search (trim, lowercase, and remove extra spaces)
  const normalizeName = (name: string) => {
    return name.trim().toLowerCase().replace(/\s+/g, ' ')
  }

  // Check if search name matches student name (case-insensitive and partial match)
  const isNameMatch = (searchName: string, studentName: string) => {
    if (!searchName || !studentName) return false
    const normalizedSearch = normalizeName(searchName)
    const normalizedStudent = normalizeName(studentName)
    return normalizedStudent.includes(normalizedSearch)
  }

  const handleRollNumberChange = (value: string) => {
    // Only allow numbers and spaces, then normalize
    const normalized = value.replace(/[^0-9\s]/g, '')
    setRollNumber(normalized)
  }

  const handleSearch = () => {
    if (!selectedClass || !rollNumber || !studentName.trim()) return
    
    // Show loading state
    setIsVerifying(true)
    
    // Use requestAnimationFrame to ensure UI updates before heavy computation
    requestAnimationFrame(() => {
      // Normalize roll number before search
      const normalizedRoll = normalizeRollNumber(rollNumber)
      
      // Find student with class and roll number match first
      const student = findStudent(selectedClass, normalizedRoll)
      
      // Then verify name matches (case-insensitive and partial match)
      if (student && !isNameMatch(studentName, student.name)) {
        // If name doesn't match, treat as not found
        setNameError("No matching student found. Please check the details and try again.")
        setIsVerifying(false)
        return
      }
      
      if (student) {
        // Use replace instead of push to prevent adding to history stack
        router.replace(
          `/results/${academicYear}/${examType}/${encodeURIComponent(examPeriod)}/student/${student.id}/multi-mode`,
          undefined, // No need to specify URL object when using string URL
          { shallow: true } // Prevents unnecessary data fetching if already on the same page
        )
      } else {
        setNameError("Student not found. Please check the name, class, and roll number.")
        setIsVerifying(false)
      }
    })
  }

  const canSearch = selectedClass && rollNumber && studentName.trim().length >= 3
  const classStats = selectedClass ? getClassStats(selectedClass) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-100 to-green-100">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="relative py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-6">
              <Link href="/results" className="self-start">
                <Button 
                  variant="outline" 
                  className="bg-white/90 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-200 border-gray-200 hover:border-gray-300"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Exams
                </Button>
              </Link>
              
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm w-full max-w-2xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-amber-600 to-green-700 bg-clip-text text-transparent">
                  {getExamTitle()}
                </h1>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm sm:text-base">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full flex items-center">
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {academicYear}
                  </span>
                  <span className="hidden sm:block text-gray-400">•</span>
                  <span className="text-gray-600">Enter student details to view results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 border-b border-gray-100">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-4">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Student Verification
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Please provide the exact student details to access the result
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Class Selection */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <label className="text-base font-medium text-gray-700">
                    Class <span className="text-red-500">*</span>
                  </label>
                </div>
                
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="h-14 text-base border-2 border-gray-200 hover:border-blue-300 focus:border-blue-400 transition-colors rounded-xl shadow-sm">
                    <SelectValue placeholder="Select your class" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-0 shadow-lg">
                    {classes.map((cls) => (
                      <SelectItem 
                        key={cls} 
                        value={cls} 
                        className="text-base px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center">
                          <span className="font-medium">Class {cls}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {classStats && (
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Users className="mr-2 h-4 w-4 text-gray-400" />
                    <span>{classStats.totalStudents} students in this class</span>
                  </p>
                )}
              </div>

              {/* Roll Number */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <label className="text-base font-medium text-gray-700">
                    Roll Number <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9\s]*"
                    placeholder="Enter Roll Number (e.g., 01, 2, 13)"
                    value={rollNumber}
                    onChange={(e) => handleRollNumberChange(e.target.value)}
                    className="h-14 text-left pl-4 font-mono text-lg border-2 border-gray-200 hover:border-blue-300 focus:border-blue-400 rounded-xl shadow-sm transition-colors"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Student Name */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <label className="text-base font-medium text-gray-700">
                    Student Name <span className="text-red-500">*</span>
                  </label>
                </div>
                
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter Full Name (as per school records)"
                    value={studentName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className={`h-14 text-base border-2 ${nameError ? "border-red-400" : "border-gray-200 hover:border-blue-300 focus:border-blue-400"} rounded-xl shadow-sm transition-colors pl-12`}
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                
                {nameError ? (
                  <div className="flex items-start p-3 rounded-lg bg-red-50 border border-red-100">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-600">{nameError}</p>
                  </div>
                ) : (
                  <div className="flex items-start p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-blue-700">
                      <span className="font-medium">Important:</span> Name must match exactly as registered in school records (case-insensitive)
                    </p>
                  </div>
                )}
              </div>

              {/* Search Button */}
              <div className="pt-2">
                <Button
                  onClick={handleSearch}
                  disabled={!canSearch || isVerifying}
                  className={`w-full h-16 text-lg font-medium rounded-xl shadow-md hover:shadow-lg transform transition-all duration-300 ${
                    canSearch 
                      ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' 
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {isVerifying ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
                      <span>Verifying Student Details...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Search className="h-5 w-5 mr-3" />
                      <span className="text-lg">View Result</span>
                    </div>
                  )}
                </Button>
                
                <p className="mt-3 text-center text-sm text-gray-500">
                  By continuing, you agree to our terms of service and privacy policy
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Information Card */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50 overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-4">
                  <Shield className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Verification Requirements
                </CardTitle>
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

          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100/50 overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-green-500 to-green-600"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-green-100 text-green-600 mr-4">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Need Help?
                </CardTitle>
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
    </div>
  )
}
