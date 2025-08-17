import { ExamResult } from "./jigyasa-anveshan"
import { jigyasaAnveshan2024_25, jigyasaAnveshan2025_26 } from "./jigyasa-anveshan"
import { bodhaManthan2024_25, bodhaManthan2025_26 } from "./bodha-manthan"
import { pragyaSiddhi2024_25, pragyaSiddhi2025_26 } from "./pragya-siddhi"

export const examTypes = {
  "jigyasa-anveshan": "Jigyāsa Anveshan (Monthly)",
  "bodha-manthan": "Bodha Manthan (Term-End)",
  "pragya-siddhi": "Pragya Siddhi (Annual)",
}

// Combined exam results
export const examResults: ExamResult[] = [
  ...jigyasaAnveshan2024_25,
  ...jigyasaAnveshan2025_26,
  ...bodhaManthan2024_25,
  ...bodhaManthan2025_26,
  ...pragyaSiddhi2024_25,
  ...pragyaSiddhi2025_26,
]

export { ExamResult }
