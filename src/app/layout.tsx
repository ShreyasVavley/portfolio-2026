import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: 'Shreyas Vavley | Software Engineer',
  description:
    'Professional portfolio of Shreyas Vavley, showcasing expertise in Full-Stack Development, AI/ML, and modern web technologies.',
  keywords: ['Shreyas Vavley', 'Software Engineer', 'Full-Stack', 'AI', 'React', 'Next.js', 'Python'],
  authors: [{ name: 'Shreyas Vavley' }],
  openGraph: {
    title: 'Shreyas Vavley | Software Engineer',
    description: 'Professional portfolio of Shreyas Vavley.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#09090b] text-zinc-50 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200" suppressHydrationWarning>
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-900 via-[#09090b] to-[#09090b]"></div>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
