"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, AlertCircle, Users, BookOpen, Shield, Loader2, Home } from "lucide-react"
import { classes, findStudent, getClassStats } from "@/lib/data"

// Typography
const title1 = "text-2xl font-bold tracking-tight text-gray-900"
const title2 = "text-xl font-semibold tracking-tight text-gray-900"
const title3 = "text-lg font-semibold text-gray-900"
const body = "text-base font-normal leading-6 text-gray-700"
const subheadline = "text-sm font-normal text-gray-500"
const footnote = "text-xs font-normal text-gray-500"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
}

// Apple-inspired color palette
const colors = {
  systemBackground: "#ffffff",
  secondarySystemBackground: "#f2f2f7",
  systemBlue: "#007AFF",
  systemGreen: "#34C759",
  systemOrange: "#FF9500",
  systemRed: "#FF3B30",
  label: "#000000",
  secondaryLabel: "#3C3C43",
  tertiaryLabel: "#3C3C43",
  quaternaryLabel: "#3C3C43",
  systemGray: "#8E8E93",
  systemGray2: "#AEAEB2",
  systemGray3: "#C7C7CC",
  systemGray4: "#D1D1D6",
  systemGray5: "#E5E5EA",
  systemGray6: "#F2F2F7"
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
  const [isLoading, setIsLoading] = useState(true)
  const [resolvedParams, setResolvedParams] = useState<{
    academicYear: string
    examType: string
    examPeriod: string
  } | null>(null)

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolved = await params
        setResolvedParams(resolved)
      } catch (error) {
        console.error('Error resolving params:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    // Add a small delay to show loading state for better UX
    const timer = setTimeout(() => {
      resolveParams()
    }, 500)
    
    return () => clearTimeout(timer)
  }, [params])

  if (!resolvedParams || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Status Bar */}
        <div className="h-12 bg-white border-b border-gray-100 flex items-center justify-between px-4">
          <span className="font-medium">DBG Gurukulam</span>
          <Link href="/" className="p-2 -mr-2">
            <Home className="w-5 h-5 text-blue-500" />
          </Link>
        </div>
        
        {/* Loading State */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mb-4"></div>
          <p className="text-gray-600">Loading exam details...</p>
        </div>
      </div>
    )
  }

  const { academicYear, examType, examPeriod: rawExamPeriod } = resolvedParams
  const examPeriod = decodeURIComponent(rawExamPeriod)
  const [yearStart, yearEnd] = academicYear.split('-')

  const getExamTitle = () => {
    switch (examType) {
      case "jigyasa-anveshan":
        return `Jigyāsa Anveshan - ${examPeriod}`
      case "bodha-manthan":
        return `Bodha Manthan - ${examPeriod}`
      case "pragya-siddhi":
        return `Pragya Siddhi - ${examPeriod} ${yearEnd}`
      default:
        return examPeriod
    }
  }

  const handleNameChange = (value: string) => {
    setStudentName(value)
    setNameError("")
  }

  const handleSearch = () => {
    if (!selectedClass || !rollNumber || !studentName) {
      return
    }

    setIsVerifying(true)

    // Simulate verification delay
    setTimeout(() => {
      const student = findStudent(selectedClass, rollNumber, studentName)

      if (student) {
        const isMultiModeExam =
          examType === "bodha-manthan" && examPeriod === "I - July 2025" && academicYear === "2025-26"

        if (isMultiModeExam) {
          // Redirect to multi-mode result page
          router.push(
            `/results/${academicYear}/${examType}/${encodeURIComponent(examPeriod)}/student/${student.id}/multi-mode`,
          )
        } else {
          // Redirect to regular result page
          router.push(`/results/${academicYear}/${examType}/${encodeURIComponent(examPeriod)}/student/${student.id}`)
        }
      } else {
        setNameError("Student not found. Please check the name, class, and roll number.")
        setIsVerifying(false)
      }
    }, 1000)
  }

  const canSearch = selectedClass && rollNumber && studentName.trim().length >= 3
  const classStats = selectedClass ? getClassStats(selectedClass) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      {/* Status Bar */}
      <div className="h-12 bg-white border-b border-gray-100 flex items-center justify-between px-4">
        <Link href="/results" className="flex items-center text-blue-500">
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="font-medium">Back</span>
        </Link>
        <span className="font-medium">DBG Gurukulam</span>
        <Link href="/" className="p-2 -mr-2">
          <Home className="w-5 h-5 text-blue-500" />
        </Link>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            {getExamTitle()}
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Academic Year: {academicYear}
          </p>
          <p className="text-gray-500">Enter student details to view result</p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">View Your Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Class</label>
                <Select onValueChange={setSelectedClass} value={selectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Roll Number</label>
                <Input
                  type="text"
                  placeholder="Enter roll number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Student Name</label>
                <Input
                  type="text"
                  placeholder="Enter student name"
                  value={studentName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className={nameError ? 'border-red-500' : ''}
                />
                {nameError && (
                  <p className="mt-1.5 text-sm text-red-600">{nameError}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                className="w-full md:w-auto"
                size="lg"
                onClick={handleSearch}
                disabled={!canSearch || isVerifying}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    View Results
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="flex-1 p-4 md:p-6 max-w-4xl w-full mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Exam Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className={`${title1} mb-1`}>{getExamTitle()}</h1>
            <p className={subheadline}>Academic Year: {academicYear}</p>
          </motion.div>

          {/* Search Card */}
          <motion.div variants={itemVariants} className="mb-6">
            <Card className="overflow-hidden">
              <CardHeader className="bg-blue-50 border-b border-blue-100">
                <CardTitle className="text-lg">View Your Results</CardTitle>
                <CardDescription>Enter your details to access your exam results</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                  variants={containerVariants}
                >
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Class</label>
                    <Select onValueChange={setSelectedClass} value={selectedClass}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls} value={cls}>
                            {cls}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Roll Number</label>
                    <Input
                      type="text"
                      placeholder="Enter roll number"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      className="w-full"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Student Name</label>
                    <Input
                      type="text"
                      placeholder="Enter student name"
                      value={studentName}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className={`w-full ${nameError ? 'border-red-500' : ''}`}
                    />
                    {nameError && (
                      <p className="mt-1.5 text-sm text-red-600">{nameError}</p>
                    )}
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-end">
                  <Button 
                    className="w-full md:w-auto"
                    size="lg"
                    onClick={handleSearch}
                    disabled={!selectedClass || !rollNumber || !studentName || isVerifying}
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        View Results
                      </>
                    )}
                  </Button>
      >
        {/* Exam Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className={`${title1} mb-1`}>{getExamTitle()}</h1>
          <p className={subheadline}>Academic Year: {academicYear}</p>
        </motion.div>

        {/* Search Card */}
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="overflow-hidden">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-lg">View Your Results</CardTitle>
              <CardDescription>Enter your details to access your exam results</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Class</label>
                  <Select onValueChange={setSelectedClass} value={selectedClass}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Roll Number</label>
                  <Input
                    type="text"
                    placeholder="Enter roll number"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="w-full"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Student Name</label>
                  <Input
                    type="text"
                    placeholder="Enter student name"
                    value={studentName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className={`w-full ${nameError ? 'border-red-500' : ''}`}
                  />
                  {nameError && (
                    <p className="mt-1.5 text-sm text-red-600">{nameError}</p>
                  )}
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex justify-end">
                <Button 
                  className="w-full md:w-auto"
                  size="lg"
                  onClick={handleSearch}
                  disabled={!selectedClass || !rollNumber || !studentName || isVerifying}
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      View Results
                    </>
                  )}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardContent className="p-4 flex items-center">
                <div className="p-2.5 rounded-lg bg-blue-100 mr-4 text-blue-600">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Students</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {selectedClass ? (getClassStats(selectedClass)?.totalStudents || '--') : '--'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardContent className="p-4 flex items-center">
                <div className="p-2.5 rounded-lg bg-green-100 mr-4 text-green-600">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Subjects</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {selectedClass ? (getClassStats(selectedClass)?.subjects.length || '--') : '--'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full bg-gradient-to-br from-blue-50 to-blue-100 border-blue-100">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="p-2.5 rounded-lg bg-blue-100 mr-4 text-blue-600 mt-0.5">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-800">Secure Portal</p>
                    <p className="text-sm text-blue-700">
                      Your data is protected with end-to-end encryption
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Help Card */}
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="border-blue-100">
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3 mt-0.5">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Need Help?</h3>
                  <p className="text-sm text-gray-600">
                    If you encounter any issues or find discrepancies in your results, 
                    please contact the school administration within 7 days of result declaration.
                  </p>
                </div>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2" style={{ color: colors.saffron }}>
                      •
                    </span>
                    All three fields must match our records
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3" style={{ color: colors.darkgreen }}>
                  Need Help?
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="font-bold mr-2" style={{ color: colors.saffron }}>
                      •
                    </span>
                    Contact school office for assistance
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2" style={{ color: colors.saffron }}>
                      •
                    </span>
                    Verify spelling with class teacher
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2" style={{ color: colors.saffron }}>
                      •
                    </span>
                    Check admission records for exact name
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
