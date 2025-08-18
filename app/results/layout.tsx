import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DBG Gurukulam - Student Results Portal',
  description: 'Access and view student examination results for DBG Gurukulam',
  keywords: ['DBG Gurukulam', 'student results', 'exam results', 'academic performance', 'education'],
  openGraph: {
    title: 'DBG Gurukulam - Student Results Portal',
    description: 'View and track your academic progress with DBG Gurukulam\'s comprehensive results portal.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'DBG Gurukulam',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DBG Gurukulam - Student Results Portal',
    description: 'Access your academic results and track your progress at DBG Gurukulam.',
  },
}

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
