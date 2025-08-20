"use client"

import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"

interface Props {
  targetId?: string
}

export default function MonochromeToggle({ targetId = "mono-root" }: Props) {
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const el = document.getElementById(targetId)
    if (!el) return
    if (enabled) el.classList.add("monochrome-print")
    else el.classList.remove("monochrome-print")
  }, [enabled, targetId])

  return (
    <div className="print:hidden bg-white/70 border-b border-gray-200 px-3 py-2">
      <div className="max-w-6xl mx-auto flex items-center gap-2">
        <Switch checked={enabled} onCheckedChange={setEnabled} />
        <span className="text-sm">Monochrome mode</span>
      </div>
    </div>
  )
}
