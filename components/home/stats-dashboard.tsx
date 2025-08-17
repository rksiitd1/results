import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Award, Calendar } from "lucide-react"

interface StatsDashboardProps {
  totalStudents: number
  totalClasses: number
  totalResults: number
  isVisible: boolean
}

export default function StatsDashboard({ totalStudents, totalClasses, totalResults, isVisible }: StatsDashboardProps) {
  const stats = [
    {
      icon: Users,
      label: "Active Students",
      value: totalStudents,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      icon: BookOpen,
      label: "Grade Levels",
      value: totalClasses,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      icon: Award,
      label: "Total Assessments",
      value: totalResults,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
    },
    {
      icon: Calendar,
      label: "Academic Years",
      value: 2,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
  ]

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 -mt-8 relative z-10 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="shadow-xl border-0 bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                <p className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                </p>
                <p className="text-xs text-green-600 font-medium mt-1">Active</p>
              </div>
              <div
                className={`p-3 rounded-full ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className={`h-8 w-8 ${stat.textColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
