import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, GraduationCap, Users } from "lucide-react"
import { questionPapers } from "@/lib/data"

export default function QuestionPaperIndex() {
  // Calculate statistics
  const totalClasses = Object.keys(questionPapers).length
  const totalSubjects = Object.values(questionPapers).reduce((acc, classData) => acc + Object.keys(classData).length, 0)
  const totalChapters = Object.values(questionPapers).reduce(
    (acc, classData) =>
      acc + Object.values(classData).reduce((subAcc, subjectData) => subAcc + subjectData.chapters.length, 0),
    0,
  )
  const totalSets = Object.values(questionPapers).reduce(
    (acc, classData) =>
      acc +
      Object.values(classData).reduce(
        (subAcc, subjectData) =>
          subAcc + subjectData.chapters.reduce((chapterAcc, chapter) => chapterAcc + chapter.sets.length, 0),
        0,
      ),
    0,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Question Paper System</h1>
          <p className="text-lg text-gray-600">Divya Bihar Global Gurukulam</p>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <GraduationCap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{totalClasses}</div>
              <div className="text-sm text-blue-700">Classes</div>
            </CardContent>
          </Card>
          <Card className="bg-green-100 border-green-200">
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">{totalSubjects}</div>
              <div className="text-sm text-green-700">Subjects</div>
            </CardContent>
          </Card>
          <Card className="bg-purple-100 border-purple-200">
            <CardContent className="p-4 text-center">
              <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">{totalChapters}</div>
              <div className="text-sm text-purple-700">Chapters</div>
            </CardContent>
          </Card>
          <Card className="bg-orange-100 border-orange-200">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-900">{totalSets}</div>
              <div className="text-sm text-orange-700">Question Sets</div>
            </CardContent>
          </Card>
        </div>

        {/* Question Papers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(questionPapers).map(([className, subjects]) => (
            <Card key={className} className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardTitle className="text-xl">Class {className.replace("class-", "")}</CardTitle>
                <CardDescription className="text-blue-100">
                  {Object.keys(subjects).length} Subject{Object.keys(subjects).length > 1 ? "s" : ""} Available
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {Object.entries(subjects).map(([subjectKey, subjectData]) => (
                    <div key={subjectKey} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-gray-800">{subjectData.name}</h3>
                        <Badge variant="secondary">{subjectData.chapters.length} Chapters</Badge>
                      </div>
                      <div className="space-y-2">
                        {subjectData.chapters.map((chapter: any) => (
                          <div key={chapter.name} className="bg-white rounded p-3 border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-gray-700">{chapter.name}</span>
                              <Badge variant="outline">{chapter.sets.length} Sets</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {chapter.sets.map((set: any) => (
                                <Link
                                  key={set.set}
                                  href={`/question-paper/${className}/${subjectKey}/${encodeURIComponent(
                                    chapter.name,
                                  )}/${set.set}`}
                                >
                                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                                    Set {set.set}
                                  </Button>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Divya Bihar Global Gurukulam</span> - Education with Yogic Values
          </p>
          <p className="text-sm text-gray-500">Raghopur, Supaul, Bihar – 852111</p>
        </div>
      </div>
    </div>
  )
}
