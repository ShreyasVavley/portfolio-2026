import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shreyas Vavley — Deep Space Portfolio',
  description:
    'An immersive, scroll-driven 3D portfolio showcasing 26 production-grade projects by Shreyas Vavley. Built with Next.js, React Three Fiber, and GSAP.',
  keywords: ['Shreyas Vavley', 'portfolio', 'developer', 'WebGL', 'Three.js', 'GSAP', 'Next.js', 'AI', 'Python'],
  authors: [{ name: 'Shreyas Vavley' }],
  openGraph: {
    title: 'Shreyas Vavley — Deep Space Portfolio',
    description: 'Immersive 3D portfolio by Shreyas Vavley.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-obsidian text-white overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
