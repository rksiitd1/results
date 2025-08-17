import QuestionPaper from "@/components/question-paper"
import ResultActions from "@/components/result-actions"
import { questionPapers } from "@/lib/data"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    class: string
    subject: string
    chapter: string
    set: string
  }
}

export default function QuestionPaperPage({ params }: PageProps) {
  const { class: className, subject, chapter, set } = params
  const setNumber = Number.parseInt(set)

  const decodedChapter = decodeURIComponent(decodeURIComponent(chapter))

  console.log("Page params:", { className, subject, chapter, decodedChapter, set, setNumber })

  // Validate that the question paper exists
  const classData = (questionPapers as any)[className]
  if (!classData) {
    console.log("Class not found:", className)
    return notFound()
  }

  // Case-insensitive and space-insensitive subject and chapter matching
  const normalizedSubject = Object.keys(classData).find(
    (key) => key.replace(/\s+/g, "").toLowerCase() === subject.replace(/\s+/g, "").toLowerCase(),
  )
  if (!normalizedSubject) {
    console.log("Subject not found:", subject)
    return notFound()
  }
  const subjectData = classData[normalizedSubject]

  const normalizedChapter = subjectData.chapters.find(
    (c: any) =>
      c && c.name && c.name.replace(/\s+/g, "").toLowerCase() === decodedChapter.replace(/\s+/g, "").toLowerCase(),
  )
  const chapterData = normalizedChapter
  if (!chapterData) {
    console.log("Chapter not found:", decodedChapter)
    console.log(
      "Available chapters:",
      subjectData.chapters.map((c: any) => (c && c.name ? c.name : "Invalid chapter")),
    )
    return notFound()
  }

  const setData = chapterData.sets.find((s: any) => s.set === setNumber)
  if (!setData) {
    console.log("Set not found:", setNumber)
    console.log(
      "Available sets:",
      chapterData.sets.map((s: any) => s.set),
    )
    return notFound()
  }

  const backUrl = `/question-paper`
  const paperTitle = `Class ${className} ${subject}`
  const examLabel = `${decodedChapter} - Set ${setNumber}`

  return (
    <>
      <ResultActions backUrl={backUrl} studentName={paperTitle} examLabel={examLabel} />
      <QuestionPaper className={className} subject={subject} chapter={decodedChapter} set={setNumber} />
    </>
  )
}

export async function generateStaticParams() {
  const params: Array<{
    class: string
    subject: string
    chapter: string
    set: string
  }> = []

  try {
    Object.entries(questionPapers).forEach(([className, classData]) => {
      if (!classData || typeof classData !== "object") {
        console.warn(`Invalid class data for ${className}`)
        return
      }

      Object.entries(classData).forEach(([subjectName, subjectData]) => {
        if (!subjectData || typeof subjectData !== "object") {
          console.warn(`Invalid subject data for ${className}.${subjectName}`)
          return
        }

        if (!subjectData.chapters || !Array.isArray(subjectData.chapters)) {
          console.warn(`No chapters array found for ${className}.${subjectName}`)
          return
        }

        subjectData.chapters.forEach((chapter: any) => {
          if (!chapter || typeof chapter !== "object" || !chapter.name) {
            console.warn(`Invalid chapter data in ${className}.${subjectName}`)
            return
          }

          if (!chapter.sets || !Array.isArray(chapter.sets)) {
            console.warn(`No sets array found for ${className}.${subjectName}.${chapter.name}`)
            return
          }

          chapter.sets.forEach((set: any) => {
            if (!set || typeof set !== "object" || typeof set.set !== "number") {
              console.warn(`Invalid set data in ${className}.${subjectName}.${chapter.name}`)
              return
            }

            params.push({
              class: className,
              subject: subjectName,
              chapter: encodeURIComponent(chapter.name),
              set: set.set.toString(),
            })
          })
        })
      })
    })
  } catch (error) {
    console.error("Error generating static params:", error)
  }

  console.log("Generated static params:", params)
  return params
}
