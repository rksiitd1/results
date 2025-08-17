"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { getStudentById, getExamResult } from "@/lib/data"
import StudentReportCard from "@/components/student-report-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Printer } from "lucide-react"
import { useState, useEffect } from "react"

interface PageProps {
  params: Promise<{
    id: string
    examType: string
    examPeriod: string
  }>
}

export default function ResultPage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = useState<{
    id: string
    examType: string
    examPeriod: string
  } | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params
      setResolvedParams(resolved)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (resolvedParams) {
      const { id, examType, examPeriod: rawExamPeriod } = resolvedParams
      const student = getStudentById(id)
      const examPeriod = decodeURIComponent(rawExamPeriod)

      if (student) {
        const examTypeFormatted = examType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
        const examPeriodFormatted = examPeriod.replace(/\b\w/g, (l) => l.toUpperCase())
        document.title = `${student.name} - ${examTypeFormatted} ${examPeriodFormatted} Results | DBG Gurukulam`

        const examResult = getExamResult(id, examType, examPeriod)
        if (examResult) {
          const ogImageUrl = `${window.location.origin}/logo.png`

          const updateMetaTag = (property: string, content: string) => {
            let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
            if (!meta) {
              meta = document.createElement("meta")
              meta.setAttribute("property", property)
              document.head.appendChild(meta)
            }
            meta.content = content
          }

          updateMetaTag("og:title", `${student.name} - ${examTypeFormatted} ${examPeriodFormatted} Results`)
          updateMetaTag(
            "og:description",
            `${student.name} scored ${examResult.percentage}% (Grade: ${examResult.grade}) in ${examTypeFormatted} ${examPeriodFormatted}`,
          )
          updateMetaTag("og:image", ogImageUrl)
          updateMetaTag("og:type", "website")
          updateMetaTag("twitter:card", "summary_large_image")
          updateMetaTag("twitter:title", `${student.name} - ${examTypeFormatted} ${examPeriodFormatted} Results`)
          updateMetaTag(
            "twitter:description",
            `${student.name} scored ${examResult.percentage}% (Grade: ${examResult.grade}) in ${examTypeFormatted} ${examPeriodFormatted}`,
          )
          updateMetaTag("twitter:image", ogImageUrl)
        }
      }
    }
  }, [resolvedParams])

  if (!resolvedParams) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  const { id, examType, examPeriod: rawExamPeriod } = resolvedParams
  const student = getStudentById(id)
  const examPeriod = decodeURIComponent(rawExamPeriod)
  const examResult = getExamResult(id, examType, examPeriod)

  if (!student || !examResult) {
    notFound()
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")])

      const mainContent = document.querySelector("div.min-h-screen.bg-white > div:not(.print\\:hidden)")

      if (!mainContent) {
        throw new Error("Could not find report card content")
      }

      // Capture only the report card content
      const canvas = await html2canvas(mainContent as HTMLElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: 1200,
        windowWidth: 1200,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      const examTypeFormatted = examType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
      const examPeriodFormatted = examPeriod.replace(/\b\w/g, (l) => l.toUpperCase())
      const fileName = `${student.name.replace(/\s+/g, "_")}_${examTypeFormatted.replace(/\s+/g, "_")}_${examPeriodFormatted.replace(/\s+/g, "_")}_Result.pdf`

      pdf.save(fileName)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again or use the Print option.")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="print:hidden p-4 bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href={`/student/${student.id}`}>
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Student
            </Button>
          </Link>

          <div className="flex gap-2">
            <Button onClick={handlePrint} variant="outline">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button onClick={handleDownload} disabled={isDownloading}>
              {isDownloading ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div id="report-card-content">
        <StudentReportCard student={student} examResult={examResult} />
      </div>
    </div>
  )
}
