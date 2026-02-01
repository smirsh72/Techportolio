import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const reducedMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = ['hero', 'about', 'experience', 'certifications'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top <= 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const navLinks = [
    { id: 'about', label: 'About Me' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
  ];

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'sticky-nav' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: reducedMotion ? 0.1 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <div className="navbar-container">
        <div className="site-logo">
          <motion.a
            href="#hero"
            className="site-name"
            onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
            whileHover={reducedMotion ? {} : { scale: 1.02 }}
            whileTap={reducedMotion ? {} : { scale: 0.98 }}
          >
            shanirshad.com
          </motion.a>

          <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={reducedMotion ? {} : { scale: 1.1 }}
            whileTap={reducedMotion ? {} : { scale: 0.9, rotate: 180 }}
            transition={{ duration: 0.3 }}
            aria-label="Toggle dark mode"
          >
            <AnimatePresence mode="wait">
              {theme === 'light' ? (
                <motion.i
                  key="moon"
                  className="fas fa-moon"
                  initial={{ opacity: 0, y: 10, rotate: -90 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -10, rotate: 90 }}
                  transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
                />
              ) : (
                <motion.i
                  key="sun"
                  className="fas fa-sun"
                  initial={{ opacity: 0, y: 10, rotate: -90 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -10, rotate: 90 }}
                  transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <div className="navbar-links">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.id}
              href={`#${link.id}`}
              className={`navbar-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reducedMotion ? 0 : 0.1 * index,
                duration: reducedMotion ? 0.1 : 0.4
              }}
              whileHover={reducedMotion ? {} : {
                y: -2,
                transition: { duration: 0.2 }
              }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="/ghosted.html"
            className="navbar-link"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reducedMotion ? 0 : 0.3,
              duration: reducedMotion ? 0.1 : 0.4
            }}
            whileHover={reducedMotion ? {} : { y: -2 }}
          >
            Ghosted
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
