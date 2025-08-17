import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Heart, Lightbulb, Trophy } from "lucide-react"

interface MissionValuesProps {
  isVisible: boolean
}

export default function MissionValues({ isVisible }: MissionValuesProps) {
  const values = [
    "Excellence in Academic Achievement",
    "Character Development through Yoga",
    "Cultural Heritage Preservation",
    "Community Service and Social Responsibility",
  ]

  const achievements = [
    {
      icon: Star,
      title: "Academic Excellence",
      description: "95% students achieved above 80% in recent assessments",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Heart,
      title: "Character Development",
      description: "100% participation in yoga and meditation programs",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: Lightbulb,
      title: "Innovation Award",
      description: "Recognized for innovative teaching methodologies",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
      <div
        className={`transition-all duration-1000 delay-1100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
      >
        <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">Our Mission</Badge>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Nurturing Minds with <span className="text-green-600">Yogic Values</span>
        </h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          At DBG Gurukulam, we are committed to providing holistic education that combines modern academic excellence
          with traditional yogic values. Our mission is to nurture young minds and develop well-rounded individuals who
          contribute positively to society while maintaining strong cultural roots.
        </p>
        <div className="space-y-4">
          {values.map((value, index) => (
            <div key={index} className="flex items-center">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`transition-all duration-1000 delay-1300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
      >
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Recent Achievements</h3>
            </div>

            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${achievement.bgColor} flex items-center justify-center flex-shrink-0`}
                  >
                    <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
