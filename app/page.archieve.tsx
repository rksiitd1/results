"use client"
import { students, examResults, classes } from "@/lib/data"
import { useState, useEffect } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HeroSection from "@/components/home/hero-section"
import StatsDashboard from "@/components/home/stats-dashboard"
import AssessmentSystem from "@/components/home/assessment-system"
import MissionValues from "@/components/home/mission-values"
import ContactSection from "@/components/home/contact-section"

const colors = {
  saffron: "#FF9933",
  darkgreen: "#138808",
  navy: "#00008B",
  lightgray: "#F5F5F5",
  headerbg: "#FFF8DC",
}

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const totalStudents = students.length
  const totalResults = examResults.length
  const totalClasses = classes.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <Header />

      <div className="max-w-7xl mx-auto p-6 lg:p-8 relative z-10">
        <StatsDashboard
          totalStudents={totalStudents}
          totalClasses={totalClasses}
          totalResults={totalResults}
          isVisible={isVisible}
        />

        <HeroSection isVisible={isVisible} />

        <MissionValues isVisible={isVisible} />

        <AssessmentSystem isVisible={isVisible} />
      </div>

      <ContactSection isVisible={isVisible} />

      <Footer />
    </div>
  )
}
