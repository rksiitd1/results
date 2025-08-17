"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, Calendar, BookOpen, Award } from "lucide-react"
import { academicYears, getAvailableExamPeriods } from "@/lib/data"

const colors = {
  saffron: "#FF9933",
  darkgreen: "#138808",
  navy: "#00008B",
  lightgray: "#F5F5F5",
  headerbg: "#FFF8DC",
}

export default function ResultsPage() {
  const [academicYear, setAcademicYear] = useState("")
  const [examType, setExamType] = useState("")
  const [examSubType, setExamSubType] = useState("")

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      {/* Header */}
      <div className="relative overflow-hidden" style={{ backgroundColor: colors.headerbg }}>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/50 to-green-100/50"></div>
        <div className="relative p-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/">
              <Button variant="outline" className="mb-6 bg-white/80 backdrop-blur shadow-md hover:shadow-lg">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4" style={{ color: colors.navy }}>
                Check Examination Results
              </h1>
              <p className="text-xl text-gray-700">Select examination details to proceed to student search</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6">
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-orange-500/10 to-green-500/10">
            <CardTitle className="text-2xl" style={{ color: colors.navy }}>
              Result Search Form
            </CardTitle>
            <CardDescription className="text-lg">
              Please select the examination details to search for results
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            {/* Academic Year Selection */}
            <div className="space-y-3">
              <label className="text-lg font-semibold flex items-center" style={{ color: colors.darkgreen }}>
                <Calendar className="mr-2 h-5 w-5" />
                Academic Year *
              </label>
              <Select value={academicYear} onValueChange={setAcademicYear}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="Select Academic Year" />
                </SelectTrigger>
                <SelectContent>
                  {academicYears.map((year) => (
                    <SelectItem key={year} value={year} className="text-lg">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Exam Type Selection */}
            <div className="space-y-3">
              <label className="text-lg font-semibold flex items-center" style={{ color: colors.darkgreen }}>
                <BookOpen className="mr-2 h-5 w-5" />
                Examination Type *
              </label>
              <Select
                value={examType}
                onValueChange={(value) => {
                  setExamType(value)
                  setExamSubType("")
                }}
              >
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="Select Examination Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jigyasa-anveshan" className="text-lg">
                    Jigyāsa Anveshan (Monthly)
                  </SelectItem>
                  <SelectItem value="bodha-manthan" className="text-lg">
                    Bodha Manthan (Term-End)
                  </SelectItem>
                  <SelectItem value="pragya-siddhi" className="text-lg">
                    Pragya Siddhi (Annual)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sub-type Selection */}
            {examType === "jigyasa-anveshan" && (
              <div className="space-y-3">
                <label className="text-lg font-semibold flex items-center" style={{ color: colors.darkgreen }}>
                  <Award className="mr-2 h-5 w-5" />
                  Monthly Examination *
                </label>
                <Select value={examSubType} onValueChange={setExamSubType}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableSubTypes().map((subType) => (
                      <SelectItem key={subType?.value} value={subType?.value || ""} className="text-lg">
                        {subType?.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {examType === "bodha-manthan" && (
              <div className="space-y-3">
                <label className="text-lg font-semibold flex items-center" style={{ color: colors.darkgreen }}>
                  <Award className="mr-2 h-5 w-5" />
                  Term Selection *
                </label>
                <Select value={examSubType} onValueChange={setExamSubType}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Select Term" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableSubTypes().map((subType) => (
                      <SelectItem key={subType?.value} value={subType?.value || ""} className="text-lg">
                        {subType?.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {examType === "pragya-siddhi" && (
              <div className="p-6 rounded-xl" style={{ backgroundColor: `${colors.saffron}10` }}>
                <p className="text-lg" style={{ color: colors.navy }}>
                  <strong>Pragya Siddhi</strong> is the annual examination conducted in March. No additional selection
                  required.
                </p>
              </div>
            )}

            {/* Proceed Button */}
            <div className="pt-6">
              {canProceed ? (
                <Link href={getNextUrl()}>
                  <Button
                    className="w-full h-14 text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                      backgroundColor: colors.darkgreen,
                      color: "white",
                    }}
                  >
                    Proceed to Student Search
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Button disabled className="w-full h-14 text-xl">
                  Please complete all selections
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardContent className="pt-8 pb-6">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl shadow-lg"
                style={{ backgroundColor: colors.saffron }}
              >
                1-10
              </div>
              <h4 className="font-bold text-lg mb-2">Jigyāsa Anveshan</h4>
              <p className="text-gray-600">Monthly assessments I through X (April to January)</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardContent className="pt-8 pb-6">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl shadow-lg"
                style={{ backgroundColor: colors.darkgreen }}
              >
                2
              </div>
              <h4 className="font-bold text-lg mb-2">Bodha Manthan</h4>
              <p className="text-gray-600">Mid-term (September) and Final (March) examinations</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardContent className="pt-8 pb-6">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl shadow-lg"
                style={{ backgroundColor: colors.navy }}
              >
                1
              </div>
              <h4 className="font-bold text-lg mb-2">Pragya Siddhi</h4>
              <p className="text-gray-600">Annual comprehensive assessment (March)</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
