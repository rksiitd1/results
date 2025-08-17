import Link from "next/link"
import { notFound } from "next/navigation"
import { getStudentById, getStudentResults, examTypes } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Calendar, TrendingUp } from "lucide-react"
import type { Metadata } from "next"

const colors = {
  saffron: "#FF9933",
  darkgreen: "#138808",
  navy: "#00008B",
  lightgray: "#F5F5F5",
  headerbg: "#FFF8DC",
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const student = getStudentById(resolvedParams.id)

  if (!student) {
    return {
      title: "Student Not Found | DBG Gurukulam",
    }
  }

  const results = getStudentResults(student.id)
  const avgPercentage =
    results.length > 0 ? (results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(1) : "0"
  const latestGrade = results.length > 0 ? results[results.length - 1].grade : "N/A"

  const ogImageUrl = "/logo.png"

  return {
    title: `${student.name} - Student Profile & Results | DBG Gurukulam`,
    description: `View ${student.name}'s complete academic profile, exam results, and performance statistics`,
    openGraph: {
      title: `${student.name} - Student Profile & Results`,
      description: `${student.name} (Class ${student.class}) - Average: ${avgPercentage}% across ${results.length} assessments`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${student.name}'s Academic Profile` }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${student.name} - Student Profile & Results`,
      description: `${student.name} (Class ${student.class}) - Average: ${avgPercentage}% across ${results.length} assessments`,
      images: [ogImageUrl],
    },
  }
}

export default async function StudentPage({ params }: PageProps) {
  const resolvedParams = await params
  const student = getStudentById(resolvedParams.id)

  if (!student) {
    notFound()
  }

  const results = getStudentResults(student.id)

  // Group results by exam type
  const resultsByType = results.reduce(
    (acc, result) => {
      if (!acc[result.examType]) {
        acc[result.examType] = []
      }
      acc[result.examType].push(result)
      return acc
    },
    {} as Record<string, typeof results>,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      {/* Header */}
      <div className="p-6" style={{ backgroundColor: colors.headerbg }}>
        <div className="max-w-6xl mx-auto">
          <Link href="/">
            <Button variant="outline" className="mb-4 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portal
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2" style={{ color: colors.navy }}>
              {student.name}
            </h1>
            <p className="text-lg">
              Class {student.class} • Roll No: {student.rollNo}
            </p>
            <p className="text-sm text-gray-600">
              Father: {student.fatherName} • Mother: {student.motherName}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Student Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Results</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{results.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Percentage</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {results.length > 0
                  ? (results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(1)
                  : 0}
                %
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Latest Grade</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{results.length > 0 ? results[results.length - 1].grade : "N/A"}</div>
            </CardContent>
          </Card>
        </div>

        {/* Results by Exam Type */}
        {Object.entries(resultsByType).map(([examType, examResults]) => (
          <Card key={examType} className="mb-6">
            <CardHeader>
              <CardTitle style={{ color: colors.navy }}>{examTypes[examType as keyof typeof examTypes]}</CardTitle>
              <CardDescription>
                {examResults.length} result{examResults.length !== 1 ? "s" : ""} available
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {examResults.map((result) => (
                  <Card key={`${result.examType}-${result.examPeriod}`} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg" style={{ color: colors.darkgreen }}>
                        {result.examPeriod}
                      </CardTitle>
                      <CardDescription>
                        {result.percentage}% • Grade: {result.grade}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Total Marks:</span>
                          <span className="font-medium">
                            {result.totalMarks}/{result.maxMarks}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${result.percentage}%`,
                              backgroundColor: colors.saffron,
                            }}
                          />
                        </div>
                      </div>
                      <Link
                        href={`/student/${student.id}/result/${result.examType}/${encodeURIComponent(result.examPeriod)}`}
                      >
                        <Button
                          className="w-full"
                          style={{
                            backgroundColor: colors.darkgreen,
                            color: "white",
                          }}
                        >
                          View Report Card
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {results.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Available</h3>
              <p className="text-gray-600">No exam results have been published for this student yet.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
