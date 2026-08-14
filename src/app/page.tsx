import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsGrid from '@/components/ProjectsGrid';
import Certifications from '@/components/Certifications';
import ActivitySection from '@/components/ActivitySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import TerminalOverlay from '@/components/TerminalOverlay';

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <PageTransition>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsGrid />
        <Certifications />
        <ActivitySection />
        <ContactSection />
        <Footer />
        <TerminalOverlay />
      </PageTransition>
    </main>
  );
}
