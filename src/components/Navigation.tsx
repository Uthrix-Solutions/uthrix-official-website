import { useEffect, useRef, useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/logo5.png";

// Single source of truth for WhatsApp contact number
const WHATSAPP_NUMBER = '94786733516';

const navLinks = [
  { name: 'Home', path: 'home', isRoute: false },
  { name: 'Services', path: 'services', isRoute: false },
  { name: 'Projects', path: 'portfolio', isRoute: false },
  { name: 'About', path: 'about', isRoute: false },
  { name: 'Contact', path: 'contact', isRoute: false },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Ref to store a pending scroll-to-section target after navigating to '/'
  const pendingScrollRef = useRef<string | null>(null);

  const { scrollY } = useScroll();

  // Derive isSticky from scrollY MotionValue — single subscription, no extra state
  const isSticky = useRef(false);
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (value) => {
      isSticky.current = value > 12;
    });
    return () => unsubscribe();
  }, [scrollY]);

  const smoothProgress = useSpring(
    useTransform(scrollY, [0, 180], [0, 1]),
    { stiffness: 140, damping: 22, mass: 0.9 }
  );

  const navWidth = useTransform(smoothProgress, [0, 1], ['min(96vw, 1200px)', 'min(84vw, 980px)']);
  const navHeight = useTransform(smoothProgress, [0, 1], [72, 56]);
  const paddingX = useTransform(smoothProgress, [0, 1], [28, 18]);
  const paddingY = useTransform(smoothProgress, [0, 1], [14, 10]);
  const topOffset = useTransform(smoothProgress, [0, 1], [32, 16]);
  const logoScale = useTransform(smoothProgress, [0, 1], [1, 0.9]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Scroll to a section by element ID, accounting for the navbar height
  const scrollToElement = (path: string) => {
    const element = document.getElementById(path);
    if (element) {
      const navbarHeight = isSticky.current ? 72 : 96;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  // When we navigate back to '/', execute any pending scroll target
  useEffect(() => {
    if (location.pathname === '/' && pendingScrollRef.current) {
      const target = pendingScrollRef.current;
      pendingScrollRef.current = null;
      // Use requestAnimationFrame to ensure the page has rendered before scrolling
      const raf = requestAnimationFrame(() => scrollToElement(target));
      return () => cancelAnimationFrame(raf);
    }
  }, [location.pathname]);

  // Scroll to section handler
  const scrollToSection = (path: string, isRoute?: boolean) => {
    setActiveSection(path);
    setIsMenuOpen(false);

    // Handle route navigation
    if (isRoute) {
      navigate(path);
      return;
    }

    // Handle scroll to section when not on the homepage
    if (location.pathname !== '/') {
      pendingScrollRef.current = path;
      navigate('/');
    } else {
      scrollToElement(path);
    }
  };

  // Track active section on scroll (scroll spy)
  useEffect(() => {
    const handleScrollSpy = () => {
      const sectionLinks = navLinks.filter(link => !link.isRoute);
      const sections = sectionLinks.map(link => document.getElementById(link.path));
      const scrollPosition = window.scrollY + 150;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionLinks[index].path);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Hide navbar on careers page — placed AFTER all hooks
  if (location.pathname === '/careers') {
    return null;
  }

  return (
    <motion.header
      layout
      initial={false}
      style={{
        width: navWidth,
        height: navHeight,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        top: topOffset,
      }}
      className={`fixed left-1/2 -translate-x-1/2 z-50 rounded-full border backdrop-blur-2xl transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_18px_50px_-28px_rgba(0,0,0,0.55)] ${
        isSticky.current
          ? 'bg-white/20 dark:bg-black/60 border-white/10 dark:border-white/10'
          : 'bg-white/30 dark:bg-white/10 border-white/20 dark:border-white/10'
      }`}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-60 blur-2xl pointer-events-none" />
      <nav className="relative flex items-center justify-between gap-4 w-full text-sm font-semibold text-gray-800 dark:text-gray-100">
        {/* Logo — uses React Router Link to avoid a full page reload */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setIsMenuOpen(false)}
        >
          <motion.img
            src={logo}
            alt="logo"
            style={{ scale: logoScale }}
            className="w-9 h-9 cursor-pointer transition-transform duration-300 ease-out hover:scale-110 hover:-rotate-[2deg] hover:drop-shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
          />
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map(({ name, path, isRoute }) => (
            <li key={path} className="cursor-pointer">
              <a
                href={isRoute ? path : `#${path}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(path, isRoute);
                }}
                className={`relative px-3 py-2 rounded-full transition-all duration-300 ease-out group whitespace-nowrap ${
                  (isRoute && location.pathname === path) || activeSection === path
                    ? 'text-primary'
                    : 'text-gray-700 dark:text-gray-200 hover:text-primary'
                }`}
              >
                <span
                  className={`absolute inset-0 rounded-full bg-white/50 dark:bg-white/10 transition-opacity duration-300 ease-out blur-[1px] ${
                    (isRoute && location.pathname === path) || activeSection === path
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-60'
                  }`}
                  aria-hidden
                />
                <span className="relative z-10">{name}</span>
              </a>
            </li>
          ))}

          {/* Desktop Contact Button */}
          <li>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-primary-light text-white px-5 py-2 shadow-lg shadow-primary/30 transition-all duration-300 ease-out hover:shadow-primary/50 hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
              <MessageCircle className="w-4 h-4" />
              Talk to Us
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full right-0 mt-2 bg-white dark:bg-[#141414] rounded-lg shadow-lg py-4 px-6 w-48 border border-gray-200 dark:border-white/10"
          >
            <ul className="flex flex-col space-y-3 text-center">
              {navLinks.map(({ name, path, isRoute }) => (
                <li key={path} className="cursor-pointer">
                  <a
                    href={isRoute ? path : `#${path}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(path, isRoute);
                    }}
                    className={`block py-2 font-medium hover:text-primary transition-colors ${
                      (isRoute && location.pathname === path) || activeSection === path ? 'text-primary' : ''
                    }`}
                  >
                    {name}
                  </a>
                </li>
              ))}

              {/* Mobile Contact Button */}
              <li className="mt-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-primary text-white w-full h-10 flex items-center justify-center gap-2 rounded-md font-medium hover:bg-primary/80 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact Us
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}