import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentName = searchParams.get("studentName") || "Student"
    const examType = searchParams.get("examType") || "Assessment"
    const examPeriod = searchParams.get("examPeriod") || "Results"
    const academicYear = searchParams.get("academicYear") || "2024-25"
    const grade = searchParams.get("grade") || "A"
    const percentage = searchParams.get("percentage") || "85"
    const totalMarks = searchParams.get("totalMarks") || "85"
    const maxMarks = searchParams.get("maxMarks") || "100"

    // Format exam type for display
    const formatExamType = (type: string) => {
      switch (type) {
        case "jigyasa-anveshan":
          return "Jigyāsa Anveshan"
        case "bodha-manthan":
          return "Bodha Manthan"
        case "pragya-siddhi":
          return "Pragya Siddhi"
        default:
          return type
      }
    }

    const formattedExamType = formatExamType(examType)

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFF8DC",
          backgroundImage: "linear-gradient(45deg, #FFF8DC 0%, #F5F5DC 100%)",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Decorative Border */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            right: "20px",
            bottom: "20px",
            border: "8px solid #FF9933",
            borderRadius: "20px",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "40px",
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#00008B",
              margin: "0 0 10px 0",
              textAlign: "center",
            }}
          >
            DBG GURUKULAM
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#138808",
              margin: "0 0 10px 0",
              fontWeight: "bold",
            }}
          >
            दिव्य बिहार ग्लोबल गुरुकुलम्
          </p>
          <p
            style={{
              fontSize: "18px",
              color: "#FF9933",
              margin: "0",
              fontStyle: "italic",
            }}
          >
            Education with Yogic Values
          </p>
        </div>

        {/* Student Result Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            border: "3px solid #FF9933",
            maxWidth: "600px",
            width: "90%",
          }}
        >
          {/* Exam Title */}
          <div
            style={{
              backgroundColor: "#FF993320",
              padding: "15px 30px",
              borderRadius: "10px",
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#00008B",
                margin: "0 0 5px 0",
              }}
            >
              {formattedExamType} {examPeriod}
            </h2>
            <p
              style={{
                fontSize: "20px",
                color: "#138808",
                margin: "0",
                fontWeight: "bold",
              }}
            >
              Academic Year {academicYear}
            </p>
          </div>

          {/* Student Name */}
          <h3
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#00008B",
              margin: "0 0 30px 0",
              textAlign: "center",
            }}
          >
            {studentName}
          </h3>

          {/* Results Summary */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#13880820",
                padding: "20px",
                borderRadius: "10px",
                minWidth: "120px",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  color: "#138808",
                  margin: "0 0 5px 0",
                  fontWeight: "bold",
                }}
              >
                Total Marks
              </p>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#00008B",
                  margin: "0",
                }}
              >
                {totalMarks}/{maxMarks}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#FF993320",
                padding: "20px",
                borderRadius: "10px",
                minWidth: "120px",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  color: "#FF9933",
                  margin: "0 0 5px 0",
                  fontWeight: "bold",
                }}
              >
                Percentage
              </p>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#00008B",
                  margin: "0",
                }}
              >
                {percentage}%
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#00008B20",
                padding: "20px",
                borderRadius: "10px",
                minWidth: "120px",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  color: "#00008B",
                  margin: "0 0 5px 0",
                  fontWeight: "bold",
                }}
              >
                Grade
              </p>
              <p
                style={{
                  fontSize: "40px",
                  fontWeight: "bold",
                  color: "#138808",
                  margin: "0",
                }}
              >
                {grade}
              </p>
            </div>
          </div>

          {/* Sanskrit Quote */}
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#FFF8DC",
              borderRadius: "8px",
              border: "2px solid #FF9933",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                color: "#138808",
                margin: "0",
                fontWeight: "bold",
                fontFamily: "serif",
              }}
            >
              ॐ सह नाववतु। सह नौ भुनक्तु। सह वीर्यं करवावहै।
            </p>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
