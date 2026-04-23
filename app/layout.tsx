import type { Metadata } from 'next'
import { Inter, Playfair_Display, Geist } from 'next/font/google'
import './globals.css'

import ReactLenis from 'lenis/react'
import { Providers } from '@/components/providers/providers'
import { Progress } from '@/components/ui/progress'
import { SectionDots } from '@/components/ui/section-dots'
import { cn } from "@/lib/utils";
import ReadingProgress from '@/components/ui/reading-progress'

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Nahidujjaman Hridoy | Software Engineer | Full-Stack & DevOps Expert',
  description:
    'Nahidujjaman Hridoy is a skilled Software Engineer specializing in React, Next.js, TypeScript, Django, and AWS. Builds high-performance web apps, e-commerce platforms, streaming services, ERP systems, and mobile applications for global clients. creativity is my source code.',
  keywords: [
    'Software Engineer',
    'Full-Stack Developer',
    'React Developer',
    'Next.js Expert',
    'TypeScript',
    'Django',
    'Python',
    'AWS',
    'DevOps',
    'Docker',
    'PostgreSQL',
    'E-Commerce',
    'Streaming Platform',
    'ERP System',
    'Mobile App Development',
    'Bangladesh',
    'Swiss Clients',
    'South Korean Clients',
    'Nahidujjaman Hridoy',
    'nhridoy',
    'Portfolio',
  ],
  authors: [{ name: 'Nahidujjaman Hridoy' }],
  creator: 'Nahidujjaman Hridoy',
  publisher: 'Nahidujjaman Hridoy',
  openGraph: {
    title: 'Nahidujjaman Hridoy | Software Engineer Portfolio',
    description:
      'Explore 15+ projects including e-commerce platforms, streaming services, ERP systems, and mobile apps. Specializing in React, Next.js, Django, and AWS for global clients.',
    url: 'https://nhridoy.github.io',
    siteName: 'Nahidujjaman Hridoy - Software Engineer',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nahidujjaman Hridoy - Software Engineer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nahidujjaman Hridoy | Software Engineer',
    description:
      'Building scalable web and mobile applications with React, Next.js, Django, and AWS. 15+ projects across e-commerce, streaming, ERP, and more.',
    creator: '@nhridoy',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nahidujjaman Hridoy',
    url: 'https://nhridoy.github.io',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'SELISE Bangladesh',
    },
    alumniOf: 'Nexis Ltd',
    sameAs: [
      'https://github.com/nhridoy',
      'https://linkedin.com/in/nahidujjaman-hridoy',
      'https://nhridoy.github.io',
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'Django',
      'Python',
      'AWS',
      'Docker',
      'PostgreSQL',
      'MongoDB',
      'Full-Stack Development',
      'DevOps',
    ],
  }

  return (
    <html
      lang="en"
      className={cn(inter.variable, playfair.variable, "font-sans", geist.variable)}
      suppressHydrationWarning={process.env.NODE_ENV === 'production'}
    >
      <ReactLenis root />
      <body className="min-h-screen bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="bg-grain" />
        <ReadingProgress />
        <Providers>
          <SectionDots />
          {children}
        </Providers>
      </body>
    </html>
  )
}
