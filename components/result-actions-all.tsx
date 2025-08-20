"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Printer, ImageIcon, FolderDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface ResultActionsAllProps {
  backUrl: string
}

export default function ResultActionsAll({ backUrl }: ResultActionsAllProps) {
  const router = useRouter()
  const [isPdfDownloading, setIsPdfDownloading] = useState(false)
  const [isPngDownloading, setIsPngDownloading] = useState(false)

  const getCards = () => Array.from(document.querySelectorAll<HTMLElement>(".report-card"))

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadMergedPdf = async () => {
    setIsPdfDownloading(true)
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ])

      const cards = getCards()
      if (!cards.length) throw new Error("No report cards found")

      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = 210
      const pageHeight = 297
      const margin = 10
      const availableWidth = pageWidth - margin * 2
      const availableHeight = pageHeight - margin * 2

      let first = true
      for (const card of cards) {
        const canvas = await html2canvas(card, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          width: card.scrollWidth,
          height: card.scrollHeight,
        })
        const imgData = canvas.toDataURL("image/png")

        const canvasAspect = canvas.width / canvas.height
        const availAspect = availableWidth / availableHeight
        let w: number, h: number
        if (canvasAspect > availAspect) {
          w = availableWidth
          h = availableWidth / canvasAspect
        } else {
          h = availableHeight
          w = availableHeight * canvasAspect
        }
        const x = (pageWidth - w) / 2
        const y = (pageHeight - h) / 2

        if (!first) pdf.addPage()
        first = false
        pdf.addImage(imgData, "PNG", x, y, w, h)
      }

      const fileName = `All_Results_${new Date().toISOString().slice(0,10)}.pdf`
      pdf.save(fileName)
    } catch (e) {
      console.error("[all] PDF error:", e)
      alert("Error generating merged PDF.")
    } finally {
      setIsPdfDownloading(false)
    }
  }

  const handleDownloadAllPngZip = async () => {
    setIsPngDownloading(true)
    try {
      const [{ default: html2canvas }, JSZipMod, FileSaverMod] = await Promise.all([
        import("html2canvas"),
        import("jszip").catch(() => null),
        import("file-saver").catch(() => null),
      ])

      if (!JSZipMod || !FileSaverMod) {
        alert("PNG ZIP requires jszip and file-saver packages. Please install them: npm i jszip file-saver")
        setIsPngDownloading(false)
        return
      }

      const JSZip = (JSZipMod as any).default || (JSZipMod as any)
      const saveAs = (FileSaverMod as any).saveAs

      const zip = new JSZip()
      const folder = zip.folder("all-results")
      const cards = getCards()
      if (!cards.length) throw new Error("No report cards found")

      let idx = 1
      for (const card of cards) {
        const canvas = await html2canvas(card, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          width: card.scrollWidth,
          height: card.scrollHeight,
        })
        const dataUrl = canvas.toDataURL("image/png")
        const base64 = dataUrl.split(",")[1]
        const name = card.getAttribute("data-filename") || `result_${idx}`
        folder.file(`${String(idx).padStart(3, "0")}_${name}.png`, base64, { base64: true })
        idx++
      }

      const blob = await zip.generateAsync({ type: "blob" })
      saveAs(blob, `All_Results_${new Date().toISOString().slice(0,10)}.zip`)
    } catch (e) {
      console.error("[all] PNG ZIP error:", e)
      alert("Error generating PNGs ZIP.")
    } finally {
      setIsPngDownloading(false)
    }
  }

  return (
    <div className="print:hidden bg-white border-b border-gray-200 p-3 md:p-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(backUrl)}
              className="shrink-0 bg-stone-300 hover:bg-stone-400"
            >
              <ArrowLeft className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div className="min-w-0 flex-1">
              <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">All Students</h1>
              <p className="text-xs sm:text-sm text-gray-600 truncate">Merged downloads and batch print</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadMergedPdf}
              disabled={isPdfDownloading}
              className="flex-1 sm:flex-none text-xs sm:text-sm bg-transparent"
            >
              {isPdfDownloading ? (
                <>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                  <span className="text-xs sm:text-sm">PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm">Merged PDF</span>
                </>
              )}
            </Button>
            <Button
              size="sm"
              onClick={handleDownloadAllPngZip}
              disabled={isPngDownloading}
              className="flex-1 sm:flex-none text-xs sm:text-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
            >
              {isPngDownloading ? (
                <>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span className="text-xs sm:text-sm">PNG ZIP...</span>
                </>
              ) : (
                <>
                  <FolderDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm">All PNGs (ZIP)</span>
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="hidden sm:flex flex-1 sm:flex-none text-xs sm:text-sm bg-black text-white hover:bg-gray-800"
            >
              <Printer className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Print All</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
