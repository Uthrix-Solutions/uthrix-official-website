import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Clients } from '../components/Clients';
import { Portfolio } from '../components/Portfolio';
import { Testimonials } from '../components/Testimonials';
import { About } from '../components/About';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { FloatingThemeToggle } from '../components/FloatingThemeToggle';
import { ScrollToTopButton } from '../components/ScrollToTopButton';
import { AnimatedBackground } from '../components/AnimatedBackground';
import WhatsAppButton from '../components/WhatsAppButton';

export function Home() {
  return <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navigation />
        <FloatingThemeToggle />
        <ScrollToTopButton />
        <WhatsAppButton />
        <main>
          <Hero />
          <Services />
          <Portfolio />
          <Clients />
          <Testimonials />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>;
}