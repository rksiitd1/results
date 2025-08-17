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
      {/* Header */}
      <div className="relative overflow-hidden" style={{ backgroundColor: colors.headerbg }}>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/50 to-green-100/50"></div>
        <div className="relative p-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/results">
              <Button variant="outline" className="mb-6 bg-white/80 backdrop-blur shadow-md hover:shadow-lg">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Exam Selection
              </Button>
            </Link>
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-3" style={{ color: colors.navy }}>
                {getExamTitle()}
              </h1>
              <p className="text-xl mb-2" style={{ color: colors.darkgreen }}>
                Academic Year: {academicYear}
              </p>
              <p className="text-lg text-gray-600">Enter student details to view result</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6">
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-orange-500/10 to-green-500/10">
            <CardTitle className="text-2xl flex items-center" style={{ color: colors.navy }}>
              <Shield className="mr-3 h-6 w-6" />
              Student Verification
            </CardTitle>
            <CardDescription className="text-lg">
              Please provide the exact student details to access the result
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            {/* Class Selection */}
            <div className="space-y-3">
              <label className="text-lg font-semibold flex items-center" style={{ color: colors.darkgreen }}>
                <BookOpen className="mr-2 h-5 w-5" />
                Class *
              </label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls} className="text-lg">
                      Class {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {classStats && (
                <p className="text-sm text-gray-600 flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  {classStats.totalStudents} students in this class
                </p>
              )}
            </div>

            {/* Roll Number */}
            <div className="space-y-3">
              <label className="text-lg font-semibold" style={{ color: colors.darkgreen }}>
                Roll Number *
              </label>
              <Input
                type="text"
                placeholder="Enter Roll Number (e.g., 01, 02, 12)"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="h-12 text-center font-mono text-xl"
              />
            </div>

            {/* Student Name */}
            <div className="space-y-3">
              <label className="text-lg font-semibold" style={{ color: colors.darkgreen }}>
                Student Name *
              </label>
              <Input
                type="text"
                placeholder="Enter Full Name (exactly as registered)"
                value={studentName}
                onChange={(e) => handleNameChange(e.target.value)}
                className={`h-12 text-lg ${nameError ? "border-red-500" : ""}`}
              />
              {nameError && (
                <div className="flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {nameError}
                </div>
              )}
              <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                💡 <strong>Tip:</strong> Name must match exactly as registered in school records (case-insensitive)
              </p>
            </div>

            {/* Search Button */}
            <div className="pt-6">
              <Button
                onClick={handleSearch}
                disabled={!canSearch || isVerifying}
                className="w-full h-14 text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  backgroundColor: canSearch ? colors.darkgreen : undefined,
                  color: canSearch ? "white" : undefined,
                }}
              >
                {isVerifying ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Verifying Student Details...
                  </>
                ) : (
                  <>
                    <Search className="mr-3 h-5 w-5" />
                    Show Result
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Information Card */}
        <Card className="mt-8 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl flex items-center" style={{ color: colors.navy }}>
              <Shield className="mr-2 h-5 w-5" />
              Security & Privacy Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3" style={{ color: colors.darkgreen }}>
                  Verification Requirements
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="font-bold mr-2" style={{ color: colors.saffron }}>
                      •
                    </span>
                    Enter student's name exactly as registered
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2" style={{ color: colors.saffron }}>
                      •
                    </span>
                    Ensure correct class and roll number
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
