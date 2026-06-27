export interface Paper {
  id: number
  subject: string
  university: string
  course: string
  year: number
  pdfUrl: string
  tags: string[]
}

export const papers: Paper[] = [
  {
    id: 1,
    subject: 'ELECTRONICS External Ist Year',
    university: 'AKTU',
    course: 'B.Tech ASH',
    year: 2025,
    pdfUrl: '/papers/ELECTRONICS_Faiz.pdf',
    tags: ['Common To All'],
  },
  {
    id: 2,
    subject: 'Maths 1st 1st-CT',
    university: 'AKTU',
    course: 'B.Tech ASH',
    year: 2025,
    pdfUrl: '/papers/C-1_Maths-1.pdf',
    tags: ['M1', 'CT1 Maths'],
  },
  {
    id: 3,
    subject: 'Maths 1st 2nd-CT',
    university: 'AKTU',
    course: 'B.Tech ASH',
    year: 2025,
    pdfUrl: '/papers/CT-2_Maths-1.pdf',
    tags: ['M1'],
  },
  {
    id: 4,
    subject: 'Ecology 2nd CT',
    university: 'AKTU',
    course: 'B.Tech ASH',
    year: 2025,
    pdfUrl: '/papers/C_2_Ecology.pdf',
    tags: ['Environment'],
  },
  {
    id: 5,
    subject: 'Electrical 1st CT',
    university: 'AKTU',
    course: 'B.Tech ASH',
    year: 2025,
    pdfUrl: '/papers/CT-1_Electrical.pdf',
    tags: ['Electrical'],
  },
  {
    id: 6,
    subject: 'Ecology 1st CT',
    university: 'AKTU',
    course: 'B.Tech IT',
    year: 2025,
    pdfUrl: '/papers/CT-1_Environment.pdf',
    tags: ['Environment'],
  },
  {
    id: 7,
    subject: 'Problem Solving 1st CT',
    university: 'AKTU',
    course: 'B.Tech ASH',
    year: 2025,
    pdfUrl: '/papers/CT-1_PPS.pdf',
    tags: ['PPS', 'C'],
  },
  {
    id: 8,
    subject: 'Problem Solving 2nd CT',
    university: 'AKTU',
    course: 'B.Tech ASH',
    year: 2025,
    pdfUrl: '/papers/CT-2_PPS.pdf',
    tags: ['PPS', 'C'],
  },
  {
    id: 9,
    subject: 'Electrical 2nd CT',
    university: 'AKTU',
    course: 'B.Tech ASH',
    year: 2025,
    pdfUrl: '/papers/CT-2_Electrical.pdf',
    tags: ['Electrical'],
  },
  {
    id: 10,
    subject: 'Physics 2nd CT',
    university: 'AKTU',
    course: 'B.Tech ASH',
    year: 2025,
    pdfUrl: '/papers/CT-2_physics.pdf',
    tags: ['Physics'],
  }
]
