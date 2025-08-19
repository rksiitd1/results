'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { marksData } from '@/lib/data/marks-data'

function TestRedirectContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const testRollNo = searchParams.get('test')
  const [testResults, setTestResults] = useState<Array<{
    rollNo: number
    name: string
    status: 'pending' | 'success' | 'error'
    error?: string
  }>>([])

  const class4Students = marksData.find(c => c.className === '4')?.students || []

  // Initialize test results
  useEffect(() => {
    if (class4Students.length > 0 && testResults.length === 0) {
      setTestResults(class4Students.map(student => ({
        rollNo: student.rollNo,
        name: student.name,
        status: 'pending' as const
      })))
    }
  }, [class4Students, testResults.length])

  // Test a single student
  const testStudent = (rollNo: number) => {
    const student = class4Students.find(s => s.rollNo === rollNo)
    if (!student) return

    // Update status to testing
    setTestResults(prev => 
      prev.map(t => 
        t.rollNo === rollNo 
          ? { ...t, status: 'pending', error: undefined }
          : t
      )
    )

    // Simulate the verification and redirection
    try {
      // This would be the actual verification logic from your search page
      const studentId = `dbg-4-${rollNo.toString().padStart(3, '0')}`
      const url = `/results/2025-26/bodha-manthan/First%20Term%20-%20July%202025/student/${studentId}/multi-mode`
      
      // A mock check that might fail
      if (student.name.includes('Error')) { 
        throw new Error('Simulated verification error')
      }

      // Update to success
      setTestResults(prev => 
        prev.map(t => 
          t.rollNo === rollNo 
            ? { ...t, status: 'success' }
            : t
        )
      )

    } catch (error) {
      setTestResults(prev => 
        prev.map(t => 
          t.rollNo === rollNo 
            ? { 
                ...t, 
                status: 'error', 
                error: error instanceof Error ? error.message : 'Unknown error' 
              }
            : t
        )
      )
    }
  }

  // Test all students
  const testAllStudents = () => {
    class4Students.forEach(student => {
      setTimeout(() => testStudent(student.rollNo), Math.random() * 500)
    })
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Test Student Verification Flow</h1>
        
        <div className="mb-8 p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Test Controls</h2>
          <div className="flex gap-4">
            <Button 
              onClick={testAllStudents}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Test All Students
            </Button>
            <Button 
              variant="outline"
              onClick={() => setTestResults([])}
            >
              Clear Results
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {testResults.map((test) => (
                <tr key={test.rollNo}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {test.rollNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {test.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${test.status === 'success' ? 'bg-green-100 text-green-800' : 
                        test.status === 'error' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {test.status}
                    </span>
                    {test.error && (
                      <div className="text-xs text-red-600 mt-1">{test.error}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => testStudent(test.rollNo)}
                    >
                      Test
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function TestRedirectPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TestRedirectContent />
    </Suspense>
  )
}
