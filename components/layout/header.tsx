import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, Search } from "lucide-react"

const colors = {
  saffron: "#FF9933",
  darkgreen: "#138808",
  navy: "#00008B",
  lightgray: "#F5F5F5",
  headerbg: "#FFF8DC",
}

interface HeaderProps {
  title?: string
  subtitle?: string
  showNavigation?: boolean
}

export default function Header({
  title = "DIVYA BIHAR GLOBAL GURUKULAM",
  subtitle = "(DBG Gurukulam)",
  showNavigation = true,
}: HeaderProps) {
  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: colors.headerbg }}>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-100/50 via-yellow-100/50 to-green-100/50"></div>

      <div className="relative p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {showNavigation && (
            <nav className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">DBG Gurukulam</h1>
                  <p className="text-sm text-gray-600">Result Portal</p>
                </div>
              </Link>

              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Home
                </Link>
                <Link href="/results" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Results
                </Link>
                <Link
                  href="/question-paper"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Question Papers
                </Link>
              </div>

              <Link href="/results">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Search className="w-4 h-4 mr-2" />
                  Check Results
                </Button>
              </Link>
            </nav>
          )}

          <div className="text-center">
            <div className="flex flex-col lg:flex-row items-center justify-center mb-8 lg:mb-12">
              <div
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 flex items-center justify-center mb-4 lg:mb-0 lg:mr-8 shadow-lg transform hover:scale-110 transition-transform duration-300"
                style={{
                  backgroundColor: `${colors.saffron}20`,
                  borderColor: colors.saffron,
                }}
              >
                <GraduationCap className="w-10 h-10 lg:w-12 lg:h-12" style={{ color: colors.navy }} />
              </div>
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  {title}
                </h1>
                <h2 className="text-2xl lg:text-3xl font-bold text-green-700">{subtitle}</h2>
              </div>
              <div
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 flex items-center justify-center mt-4 lg:mt-0 lg:ml-8 shadow-lg transform hover:scale-110 transition-transform duration-300"
                style={{
                  backgroundColor: `${colors.darkgreen}20`,
                  borderColor: colors.darkgreen,
                }}
              >
                <BookOpen className="w-10 h-10 lg:w-12 lg:h-12" style={{ color: colors.navy }} />
              </div>
            </div>

            <div className="space-y-3 text-lg lg:text-xl">
              <p className="font-semibold text-gray-800">Raghopur, Supaul, Bihar – 852111</p>
              <p className="text-gray-700">
                Managed by: <strong className="text-green-700">Divya Bihar Mission</strong>
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <p className="text-2xl font-medium text-amber-600 italic">शिक्षा योगिक मूल्यों के साथ</p>
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              </div>
              <p className="text-lg text-gray-600 italic">Education with Yogic Values</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
