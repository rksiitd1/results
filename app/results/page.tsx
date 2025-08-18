"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Calendar, BookOpen, Award, Home, Search, BarChart3, Award as Trophy } from "lucide-react"
import { academicYears, getAvailableExamPeriods } from "@/lib/data"

const colors = {
  primary: "#1a365d",
  secondary: "#2c5282",
  accent: "#3182ce",
  success: "#38a169",
  warning: "#dd6b20",
  light: "#f7fafc",
  dark: "#2d3748"
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const examTypes = [
  {
    id: "jigyasa-anveshan",
    name: "Jigyāsa Anveshan",
    description: "Monthly assessments I through X (April to January)",
    icon: <Search className="w-8 h-8 text-white" />,
    color: "from-blue-600 to-blue-400"
  },
  {
    id: "bodha-manthan",
    name: "Bodha Manthan",
    description: "Mid-term (September) and Final (March) examinations",
    icon: <BarChart3 className="w-8 h-8 text-white" />,
    color: "from-green-600 to-green-400"
  },
  {
    id: "pragya-siddhi",
    name: "Pragya Siddhi",
    description: "Annual comprehensive assessment (March)",
    icon: <Trophy className="w-8 h-8 text-white" />,
    color: "from-purple-600 to-purple-400"
  }
]

export default function ResultsPage() {
  const [academicYear, setAcademicYear] = useState("")
  const [examType, setExamType] = useState("")
  const [examSubType, setExamSubType] = useState("")
  const [activeTab, setActiveTab] = useState("")

  const canProceed = academicYear && examType && (examType === "pragya-siddhi" || examSubType)

  const getAvailableSubTypes = () => {
    if (!academicYear || !examType) return []

    const availablePeriods = getAvailableExamPeriods(academicYear, examType)

    if (examType === "jigyasa-anveshan") {
      return availablePeriods
        .map((period) => {
          const match = period.match(/^([IVX]+) - (\w+) (\d+)$/)
          if (match) {
            const [, roman, month, year] = match
            const romanToNumber: { [key: string]: string } = {
              I: "1",
              II: "2",
              III: "3",
              IV: "4",
              V: "5",
              VI: "6",
              VII: "7",
              VIII: "8",
              IX: "9",
              X: "10",
            }
            return {
              value: romanToNumber[roman] || "1",
              label: `${roman} - ${month} ${year}`,
              period,
            }
          }
          return null
        })
        .filter(Boolean)
    } else if (examType === "bodha-manthan") {
      return availablePeriods
        .map((period) => {
          if (period.includes("Mid-term")) {
            return { value: "first", label: period, period }
          } else if (period.includes("Final")) {
            return { value: "second", label: period, period }
          }
          return null
        })
        .filter(Boolean)
    }

    return []
  }

  const getNextUrl = () => {
    if (!canProceed) return ""

    const subTypes = getAvailableSubTypes()
    const selectedSubType = subTypes.find((st) => st?.value === examSubType)

    if (examType === "pragya-siddhi") {
      const availablePeriods = getAvailableExamPeriods(academicYear, examType)
      if (availablePeriods.length > 0) {
        return `/results/${academicYear}/${examType}/${encodeURIComponent(availablePeriods[0])}`
      }
    } else if (selectedSubType) {
      return `/results/${academicYear}/${examType}/${encodeURIComponent(selectedSubType.period)}`
    }

    return ""
  }

  const handleExamTypeSelect = (type: string) => {
    setExamType(type)
    setActiveTab(type)
    setExamSubType("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Home className="h-6 w-6 text-blue-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">Gurukulam</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-blue-700/70"></div>
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-[length:100px_100px] opacity-10"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Examination Results Portal
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-100 max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={{ ...fadeIn, transition: { delay: 0.2 } }}
          >
            Access your academic progress and examination results with ease. Select the examination details below to get started.
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {/* Left Column - Exam Type Selection */}
          <motion.div 
            className="space-y-6"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-gray-800">Select Exam Type</h2>
            <div className="space-y-4">
              {examTypes.map((type) => (
                <motion.div
                  key={type.id}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeTab === type.id 
                      ? 'ring-2 ring-offset-2 ring-blue-500 bg-white shadow-lg' 
                      : 'bg-white hover:shadow-md'
                  }`}
                  whileHover={{ y: -2 }}
                  onClick={() => handleExamTypeSelect(type.id)}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r ${type.color}`}>
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{type.name}</h3>
                  <p className="text-gray-600">{type.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Middle Column - Form */}
          <motion.div 
            className="lg:col-span-2"
            variants={fadeIn}
          >
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <CardTitle className="text-2xl font-bold">Examination Details</CardTitle>
                <p className="text-blue-100 opacity-90">
                  {!examType 
                    ? "Select an exam type to continue" 
                    : `Selected: ${examTypes.find(t => t.id === examType)?.name}`}
                </p>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Academic Year Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Academic Year <span className="text-red-500">*</span>
                  </label>
                  <Select value={academicYear} onValueChange={setAcademicYear}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select Academic Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {academicYears.map((year) => (
                        <SelectItem key={year} value={year} className="text-base">
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sub-type Selection */}
                {examType === "jigyasa-anveshan" && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Examination <span className="text-red-500">*</span>
                    </label>
                    <Select value={examSubType} onValueChange={setExamSubType}>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableSubTypes().map((subType) => (
                          <SelectItem key={subType?.value} value={subType?.value || ""} className="text-base">
                            {subType?.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {examType === "bodha-manthan" && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Term Selection <span className="text-red-500">*</span>
                    </label>
                    <Select value={examSubType} onValueChange={setExamSubType}>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select Term" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableSubTypes().map((subType) => (
                          <SelectItem key={subType?.value} value={subType?.value || ""} className="text-base">
                            {subType?.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {examType === "pragya-siddhi" && (
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                    <p className="text-blue-800">
                      <span className="font-semibold">Pragya Siddhi</span> is the annual examination conducted in March. 
                      No additional selection is required.
                    </p>
                  </div>
                )}

                {/* Proceed Button */}
                <div className="pt-4">
                  {canProceed ? (
                    <Link href={getNextUrl()} className="block">
                      <Button
                        className="w-full h-14 text-lg font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        View Results
                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  ) : (
                    <Button 
                      disabled 
                      className="w-full h-14 text-lg font-medium bg-gray-200 text-gray-500 cursor-not-allowed"
                    >
                      {!examType ? "Select an exam type" : !academicYear ? "Select academic year" : "Select examination period"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Need Help?</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Select the type of examination from the left panel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Choose the academic year and examination period</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Click "View Results" to see your performance</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
