"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Home, Search, BarChart3, Award as Trophy, ChevronRight, Info, X } from "lucide-react"
import { academicYears, getAvailableExamPeriods } from "@/lib/data"

// Apple-inspired color palette
const colors = {
  systemBackground: "#ffffff",
  secondarySystemBackground: "#f2f2f7",
  systemGray6: "#f2f2f7",
  systemGray5: "#e5e5ea",
  systemGray4: "#d1d1d6",
  systemGray3: "#c7c7cc",
  systemGray2: "#aeaeb2",
  systemGray: "#8e8e93",
  label: "#000000",
  secondaryLabel: "#3c3c4399",
  tertiaryLabel: "#3c3c434c",
  quaternaryLabel: "#3c3c432d",
  systemBlue: "#007aff",
  systemGreen: "#34c759",
  systemIndigo: "#5856d6",
  systemTeal: "#5ac8fa",
  systemPink: "#ff2d55",
  systemRed: "#ff3b30",
  systemOrange: "#ff9500",
  systemYellow: "#ffcc00"
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      damping: 25,
      stiffness: 300
    } 
  },
  exit: { opacity: 0, y: -10 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

// Typography
const largeTitle = "text-3xl font-semibold tracking-tight"
const title1 = "text-2xl font-semibold tracking-tight"
const title2 = "text-xl font-semibold tracking-tight"
const title3 = "text-lg font-semibold tracking-tight"
const headline = "text-base font-medium tracking-tight text-blue-500"
const body = "text-base font-normal leading-6"
const callout = "text-base font-normal leading-6 text-gray-600"
const subheadline = "text-sm font-normal text-gray-500"
const footnote = "text-xs font-normal text-gray-500"

// Exam types with updated styling
const examTypes = [
  {
    id: "jigyasa-anveshan",
    name: "Jigyāsa Anveshan",
    description: "Monthly assessments (April to January, excluding July & November)",
    icon: <Search className="w-5 h-5 text-white" />,
    color: colors.systemBlue,
    bgColor: "bg-blue-500",
  },
  {
    id: "bodha-manthan",
    name: "Bodha Manthan",
    description: "Term examinations (July & November)",
    icon: <BarChart3 className="w-5 h-5 text-white" />,
    color: colors.systemGreen,
    bgColor: "bg-green-500",
  },
  {
    id: "pragya-siddhi",
    name: "Pragya Siddhi",
    description: "Annual assessment (March)",
    icon: <Trophy className="w-5 h-5 text-white" />,
    color: colors.systemOrange,
    bgColor: "bg-orange-500",
  }
]

// Custom Select Component for iOS-like experience
const IOSSelect = ({ 
  value, 
  onValueChange, 
  items, 
  placeholder, 
  disabled = false 
}: {
  value: string
  onValueChange: (value: string) => void
  items: { value: string; label: string }[]
  placeholder: string
  disabled?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState("")

  useEffect(() => {
    const selected = items.find(item => item.value === value)
    setSelectedLabel(selected?.label || "")
  }, [value, items])

  return (
    <div className="relative w-full">
      <button
        className={`w-full text-left p-3 rounded-xl border ${
          disabled 
            ? 'bg-gray-100 text-gray-400 border-gray-200' 
            : 'bg-white text-gray-900 border-gray-300 active:bg-gray-50'
        }`}
        onClick={() => !disabled && setIsOpen(true)}
        disabled={disabled}
      >
        <div className="flex justify-between items-center">
          <span className={`truncate ${!value ? 'text-gray-400' : ''}`}>
            {selectedLabel || placeholder}
          </span>
          <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'transform rotate-90' : ''}`} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              className="w-full max-w-4xl bg-white rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto mx-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">{placeholder}</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 -mr-2 text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-2">
                {items.map((item) => (
                  <button
                    key={item.value}
                    className={`w-full text-left p-3 rounded-lg ${
                      value === item.value 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-900 active:bg-gray-50'
                    }`}
                    onClick={() => {
                      onValueChange(item.value)
                      setIsOpen(false)
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ResultsPage() {
  const [academicYear, setAcademicYear] = useState("")
  const [examType, setExamType] = useState("")
  const [examSubType, setExamSubType] = useState("")
  const [activeTab, setActiveTab] = useState("")

  const canProceed = academicYear && examType && (examType === "pragya-siddhi" || examSubType)

  const getAvailableSubTypes = () => {
    if (!academicYear || !examType) return []

    const availablePeriods = getAvailableExamPeriods(academicYear, examType)

    if (examType === "jigyasa-anveshan") {
      // For Jigyasa Anveshan, show monthly assessments (April to January, excluding July & November)
      const months = [
        { name: 'April', roman: 'I' },
        { name: 'May', roman: 'II' },
        { name: 'June', roman: 'III' },
        // Skip July (Bodha Manthan)
        { name: 'August', roman: 'IV' },
        { name: 'September', roman: 'V' },
        { name: 'October', roman: 'VI' },
        // Skip November (Bodha Manthan)
        { name: 'December', roman: 'VII' },
        { name: 'January', roman: 'VIII' }
      ]
      
      const [startYear, endYear] = academicYear.split('-')
      
      return months.map(({ name, roman }, index) => {
        // Use startYear for April-June, endYear for August-January
        const year = index < 3 ? startYear : endYear
        return {
          value: roman,
          label: `${roman} - ${name} ${year}`,
          period: `${roman} - ${name} ${year}`
        }
      })
    } else if (examType === "bodha-manthan") {
      // For Bodha Manthan, show July and November exams
      const year = academicYear.split('-')
      return [
        {
          value: "first",
          label: `First Term - July ${year[0]}`,
          period: `First Term - July ${year[0]}`
        },
        {
          value: "second",
          label: `Second Term - November ${year[0]}`,
          period: `Second Term - November ${year[0]}`
        }
      ]
    } else if (examType === "pragya-siddhi") {
      // For Pragya Siddhi, show March of the academic year end
      const year = academicYear.split('-')[1]
      return [
        {
          value: "annual",
          label: `Annual - March ${year}`,
          period: `Annual - March ${year}`
        }
      ]
    }

    return []
  }

  const getNextUrl = () => {
    if (!canProceed) return ""

    const subTypes = getAvailableSubTypes()
    const selectedSubType = subTypes.find((st) => st?.value === examSubType)

    if (examType === "pragya-siddhi") {
      const availablePeriods = getAvailableExamPeriods(academicYear, examType)
      if (availablePeriods.length > 0) {
        return `/results/${academicYear}/${examType}/${encodeURIComponent(availablePeriods[0])}`
      }
    } else if (selectedSubType) {
      return `/results/${academicYear}/${examType}/${encodeURIComponent(selectedSubType.period)}`
    }

    return ""
  }

  const handleExamTypeSelect = (type: string) => {
    setExamType(type)
    setActiveTab(type)
    setExamSubType("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="h-12 bg-white border-b border-gray-100 flex items-center justify-between px-4">
        <span className="font-medium">Gurukulam</span>
        <Link href="/" className="p-2 -mr-2">
          <Home className="w-5 h-5 text-blue-500" />
        </Link>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 pb-32 max-w-4xl mx-auto lg:px-6">
        <motion.div 
          className="mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className={`${title1} text-gray-900 mb-2`}>Results</h1>
          <p className={`${callout} text-gray-600`}>Check your examination results by selecting the details below</p>
        </motion.div>

        {/* Exam Type Selection */}
        <motion.div 
          className="mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <h2 className={`${title3} text-gray-900 mb-4`}>Select Exam Type</h2>
          <div className="space-y-3">
            {examTypes.map((type) => (
              <motion.button
                key={type.id}
                variants={fadeIn}
                className={`w-full p-4 rounded-xl text-left flex items-center transition-all ${
                  activeTab === type.id 
                    ? 'ring-2 ring-blue-500 bg-white shadow-sm' 
                    : 'bg-white active:bg-gray-50'
                }`}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleExamTypeSelect(type.id)}
              >
                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center mr-4 ${type.bgColor}`}>
                  {type.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`${title3} text-gray-900 truncate`}>{type.name}</h3>
                  <p className={`${subheadline} text-gray-500 truncate`}>{type.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Form Section */}
        {examType && (
          <motion.div 
            className="bg-white rounded-2xl p-6 mb-6 shadow-sm w-full"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`${title3} text-gray-900`}>Examination Details</h2>
                <p className={`${subheadline} text-gray-500`}>
                  {examTypes.find(t => t.id === examType)?.name}
                </p>
              </div>
              <button 
                onClick={() => setShowHelp(true)}
                className="p-2 -mr-2"
              >
                <Info className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Academic Year Selection */}
              <div>
                <label className={`${subheadline} block text-gray-500 mb-1.5`}>
                  Academic Year
                </label>
                <IOSSelect
                  value={academicYear}
                  onValueChange={setAcademicYear}
                  items={academicYears.map(year => ({
                    value: year,
                    label: year
                  }))}
                  placeholder="Select academic year"
                />
              </div>

              {/* Sub-type Selection */}
              {examType === "jigyasa-anveshan" && (
                <div>
                  <label className={`${subheadline} block text-gray-500 mb-1.5`}>
                    Monthly Examination
                  </label>
                  <IOSSelect
                    value={examSubType}
                    onValueChange={setExamSubType}
                    items={getAvailableSubTypes().map(subType => ({
                      value: subType?.value || "",
                      label: subType?.label || ""
                    }))}
                    placeholder="Select month"
                    disabled={!academicYear}
                  />
                </div>
              )}

              {examType === "bodha-manthan" && (
                <div>
                  <label className={`${subheadline} block text-gray-500 mb-1.5`}>
                    Term Selection
                  </label>
                  <IOSSelect
                    value={examSubType}
                    onValueChange={setExamSubType}
                    items={getAvailableSubTypes().map(subType => ({
                      value: subType?.value || "",
                      label: subType?.label || ""
                    }))}
                    placeholder="Select term"
                    disabled={!academicYear}
                  />
                </div>
              )}

              {examType === "pragya-siddhi" && (
                <div className="p-4 rounded-xl bg-blue-50">
                  <p className={`${callout} text-blue-800`}>
                    <span className="font-medium">Pragya Siddhi</span> is the annual examination conducted in March. 
                    No additional selection is required.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Action Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm border-t border-gray-100 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <Link 
              href={canProceed ? getNextUrl() : '#'}
              className={`block w-full rounded-xl py-4 text-center font-medium ${
                canProceed 
                  ? 'bg-blue-500 text-white active:bg-blue-600' 
                  : 'bg-gray-200 text-gray-500'
              } transition-colors`}
            >
              {canProceed ? 'View Results' : 'Select exam details to continue'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
