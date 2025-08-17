import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users } from "lucide-react"

interface ContactSectionProps {
  isVisible: boolean
}

export default function ContactSection({ isVisible }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-1500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">Get in Touch</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Connect with Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to answer your questions, provide information about our programs, and help you become part of our
            mission to transform Bihar from the ground up.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-green-50">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Visit Our Campus</h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Divya Bihar Global Gurukulam</p>
                    <p className="text-gray-700">Jiaram Raghopur, Simrahi Bazaar</p>
                    <p className="text-gray-700">Supaul District, Bihar 852111, India</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">Distance from Railway Station</p>
                <p className="font-semibold text-gray-900">~200m from Raghopur Railway Station</p>
              </div>

              <Badge className="bg-green-100 text-green-700">Always Open for Visitors</Badge>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Management</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Managed by</h4>
                  <p className="text-lg text-green-700 font-semibold">Divya Bihar Mission</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Our Commitment</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Educational Excellence</li>
                    <li>• Traditional Yogic Values</li>
                    <li>• Character Development</li>
                    <li>• Community Service</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 italic">"संपर्क में रहें, साथ चलें, समाज को बदलें"</p>
                  <p className="text-sm text-gray-600 italic mt-1">
                    "Stay connected, walk together, transform society"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
