import { GraduationCap } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-green-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">DBG Gurukulam</h3>
                <p className="text-sm text-gray-300">Result Portal</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering minds through education with traditional yogic values and modern academic excellence.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/results" className="text-gray-300 hover:text-white transition-colors">
                  Check Results
                </Link>
              </li>
              <li>
                <Link href="/question-paper" className="text-gray-300 hover:text-white transition-colors">
                  Question Papers
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Raghopur, Supaul, Bihar – 852111</p>
              <p>Managed by Divya Bihar Mission</p>
              <p className="text-amber-400 italic">शिक्षा योगिक मूल्यों के साथ</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-300">© {currentYear} Divya Bihar Global Gurukulam. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">Nurturing minds, building character, creating leaders</p>
        </div>
      </div>
    </footer>
  )
}
