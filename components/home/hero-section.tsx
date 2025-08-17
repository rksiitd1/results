import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, ArrowRight, Play, Shield, BarChart3, Clock, Trophy, Star, Calendar } from "lucide-react"

interface HeroSectionProps {
  isVisible: boolean
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
  return (
    <Card
      className={`mb-12 shadow-2xl border-0 overflow-hidden transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="bg-gradient-to-r from-orange-500/10 via-yellow-500/10 to-green-500/10 p-8 lg:p-12 relative">
        <div className="relative z-10">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-green-500 flex items-center justify-center mr-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Welcome to DBG Gurukulam
              </CardTitle>
            </div>
            <CardDescription className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto">
              Experience comprehensive examination results and academic progress reports designed to nurture holistic
              development
            </CardDescription>
          </CardHeader>

          <div className="mb-8">
            <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-xl border-0 transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-yellow-300 mr-3 animate-pulse" />
                  <h3 className="text-2xl lg:text-3xl font-bold">Results Now Available!</h3>
                  <Star className="w-8 h-8 text-yellow-300 ml-3 animate-pulse" />
                </div>
                <div className="text-center mb-6">
                  <p className="text-lg lg:text-xl mb-2">
                    <strong>Bodha Manthan I - July 2025</strong>
                  </p>
                  <p className="text-base opacity-90 flex items-center justify-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Academic Year 2025-26 Results
                  </p>
                </div>
                <div className="text-center">
                  <Link href="/results/2025-26/bodha-manthan/I%20-%20July%202025">
                    <Button
                      size="lg"
                      className="bg-white text-green-600 hover:bg-gray-100 text-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                    >
                      <Trophy className="mr-3 h-6 w-6" />
                      Check Your Results Now
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <CardContent className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/results">
                <Button
                  size="lg"
                  className="text-xl px-12 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                >
                  <FileText className="mr-3 h-6 w-6" />
                  Explore Results
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/question-paper">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-xl px-12 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-blue-600 text-blue-700 hover:bg-blue-50 bg-transparent"
                >
                  <Play className="mr-3 h-6 w-6" />
                  Question Papers
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-600" />
                Secure Access
              </div>
              <div className="flex items-center">
                <BarChart3 className="w-4 h-4 mr-2 text-blue-600" />
                Detailed Analytics
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-orange-600" />
                Real-time Updates
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}
