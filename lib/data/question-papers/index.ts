import { class10Math } from "./class-10/math"
import { class10Science } from "./class-10/science"
import { class12Physics } from "./class-12/physics"

export const questionPapers = {
  "class-10": {
    math: {
      name: "Mathematics",
      chapters: class10Math,
    },
    science: {
      name: "Science",
      chapters: class10Science,
    },
  },
  "class-12": {
    physics: {
      name: "Physics",
      chapters: class12Physics,
    },
  },
}
