export interface Paper {
  id: number
  subject: string
  university: string
  course: string
  year: number
  /** Replace this with the real PDF link when available. */
  pdfUrl: string
  tags: string[]
}

export const papers: Paper[] = [
  {
    id: 1,
    subject: 'Data Structures',
    university: 'AKTU',
    course: 'B.Tech CSE',
    year: 2024,
    pdfUrl: '#',
    tags: ['DSA', 'Algorithms', 'Trees', 'Graphs'],
  },
  {
    id: 2,
    subject: 'Operating System',
    university: 'AKTU',
    course: 'B.Tech CSE',
    year: 2023,
    pdfUrl: '#',
    tags: ['OS', 'Processes', 'Scheduling', 'Deadlocks'],
  },
  {
    id: 3,
    subject: 'DBMS',
    university: 'AKTU',
    course: 'B.Tech IT',
    year: 2024,
    pdfUrl: '#',
    tags: ['Database', 'SQL', 'Normalization', 'ER Model'],
  },
  {
    id: 4,
    subject: 'Java Programming',
    university: 'AKTU',
    course: 'B.Tech CSE',
    year: 2023,
    pdfUrl: '#',
    tags: ['Java', 'OOP', 'Multithreading', 'Collections'],
  },
  {
    id: 5,
    subject: 'Computer Networks',
    university: 'AKTU',
    course: 'B.Tech CSE',
    year: 2024,
    pdfUrl: '#',
    tags: ['Networking', 'TCP/IP', 'OSI', 'Routing'],
  },
  {
    id: 6,
    subject: 'Cyber Security',
    university: 'AKTU',
    course: 'B.Tech IT',
    year: 2023,
    pdfUrl: '#',
    tags: ['Security', 'Cryptography', 'Ethical Hacking', 'Network Security'],
  },
  {
    id: 7,
    subject: 'Engineering Mathematics',
    university: 'AKTU',
    course: 'B.Tech',
    year: 2024,
    pdfUrl: '#',
    tags: ['Maths', 'Calculus', 'Linear Algebra', 'Probability'],
  },
  {
    id: 8,
    subject: 'Web Technologies',
    university: 'AKTU',
    course: 'B.Tech IT',
    year: 2023,
    pdfUrl: '#',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
]
