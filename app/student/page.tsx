import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, FileText, BookOpen } from "lucide-react"

export default function StudentPortalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">Student Portal</h1>
        <div className="space-y-6">
          {/* Question Paper Section */}
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-orange-700 mb-1 flex items-center"><BookOpen className="w-6 h-6 mr-2" /> Practice Question Papers</h2>
              <p className="text-gray-700">Access chapter-wise and syllabus-based test papers for practice.</p>
            </div>
            <Link href="/question-paper">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded shadow">Go</Button>
            </Link>
          </div>
          {/* Placeholder for other student features */}
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-green-700 mb-1 flex items-center"><FileText className="w-6 h-6 mr-2" /> Results & Report Cards</h2>
              <p className="text-gray-700">View your exam results and download report cards.</p>
            </div>
            <Link href="/results">
              <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded shadow">Go</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
