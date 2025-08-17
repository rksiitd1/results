import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BookOpen, Award, BarChart3, CheckCircle } from "lucide-react"

const colors = {
  saffron: "#FF9933",
  darkgreen: "#138808",
  navy: "#00008B",
}

interface AssessmentSystemProps {
  isVisible: boolean
}

export default function AssessmentSystem({ isVisible }: AssessmentSystemProps) {
  const assessments = [
    {
      title: "Jigyāsa Anveshan",
      subtitle: "Monthly Assessment",
      description:
        "Regular monthly evaluations (I-X) conducted from April to January, tracking continuous progress across all academic subjects and co-curricular activities",
      icon: FileText,
      color: colors.saffron,
      bgColor: `${colors.saffron}10`,
      features: ["Monthly Tracking", "Holistic Evaluation", "Progress Analytics", "Skill Development"],
    },
    {
      title: "Bodha Manthan",
      subtitle: "Term-End Examination",
      description:
        "Comprehensive bi-annual assessments (Mid-term & Final) providing in-depth evaluation after extended learning periods with practical and theoretical components",
      icon: BookOpen,
      color: colors.darkgreen,
      bgColor: `${colors.darkgreen}10`,
      features: ["Bi-annual Assessment", "Practical Components", "Deep Analysis", "Comprehensive Review"],
    },
    {
      title: "Pragya Siddhi",
      subtitle: "Annual Examination",
      description:
        "Year-end culminating assessment including academic excellence, spiritual growth, moral development, and overall personality evaluation",
      icon: Award,
      color: colors.navy,
      bgColor: `${colors.navy}10`,
      features: ["Annual Review", "Character Assessment", "Spiritual Growth", "Personality Development"],
    },
  ]

  return (
    <Card
      className={`mb-12 shadow-2xl border-0 transition-all duration-1000 delay-1400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-4">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-3xl lg:text-4xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Comprehensive Assessment System
          </CardTitle>
        </div>
        <CardDescription className="text-center text-lg lg:text-xl max-w-3xl mx-auto">
          Our multi-tiered evaluation approach ensures holistic student development through continuous assessment and
          growth tracking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {assessments.map((assessment, index) => (
            <Card
              key={index}
              className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-gradient-to-br from-${assessment.color.replace("#", "")}-50 to-${assessment.color.replace("#", "")}-50 overflow-hidden group`}
              style={{ backgroundColor: assessment.bgColor }}
            >
              <CardContent className="p-8">
                <div
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: assessment.color, color: "white" }}
                >
                  <assessment.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">{assessment.title}</h3>
                <p className="text-lg font-semibold text-gray-600 mb-4 text-center">{assessment.subtitle}</p>
                <p className="text-gray-700 mb-6 leading-relaxed">{assessment.description}</p>
                <div className="space-y-2">
                  {assessment.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
