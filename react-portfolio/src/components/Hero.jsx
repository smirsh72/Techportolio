import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Ethereal Horizon Background - living, breathing atmosphere
function EtherealHorizon({ reducedMotion }) {
  return (
    <div className="ethereal-horizon">
      {/* Base gradient layer */}
      <div className="ethereal-base" />

      {/* Organic light leak - warm white/cream (top left) */}
      <motion.div
        className="light-leak light-leak-1"
        animate={reducedMotion ? {} : {
          scale: [1, 1.15, 1.05, 1.1, 1],
          x: [0, 30, -20, 10, 0],
          y: [0, 20, -10, 15, 0],
          opacity: [0.4, 0.6, 0.45, 0.55, 0.4],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Organic light leak - petal pink (center right) */}
      <motion.div
        className="light-leak light-leak-2"
        animate={reducedMotion ? {} : {
          scale: [1, 1.2, 1.1, 1.15, 1],
          x: [0, -40, 20, -15, 0],
          y: [0, 30, -20, 25, 0],
          opacity: [0.35, 0.5, 0.4, 0.45, 0.35],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Organic light leak - sky blue (bottom) */}
      <motion.div
        className="light-leak light-leak-3"
        animate={reducedMotion ? {} : {
          scale: [1, 1.1, 1.2, 1.05, 1],
          x: [0, 25, -30, 15, 0],
          y: [0, -25, 15, -10, 0],
          opacity: [0.3, 0.45, 0.35, 0.4, 0.3],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Secondary warm glow (sunrise horizon) */}
      <motion.div
        className="light-leak light-leak-4"
        animate={reducedMotion ? {} : {
          opacity: [0.2, 0.35, 0.25, 0.3, 0.2],
          scale: [1, 1.08, 1.02, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Subtle accent glow */}
      <motion.div
        className="light-leak light-leak-5"
        animate={reducedMotion ? {} : {
          opacity: [0.15, 0.25, 0.18, 0.22, 0.15],
          x: [0, 15, -10, 5, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />

      {/* Film grain overlay */}
      <div className="film-grain" />
    </div>
  );
}

// Word carousel component
function WordCarousel({ reducedMotion }) {
  const words = useMemo(() => [
    'Shan Irshad',
    'An Innovator',
    'A Builder',
    'A Cloud Engineer',
    'A Product Manager',
    'An AI Engineer'
  ], []);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, 4000);
      return () => clearInterval(interval);
    }, 8000);

    return () => clearTimeout(timer);
  }, [words.length]);

  const slideVariants = {
    enter: {
      y: reducedMotion ? 0 : 40,
      opacity: 0,
      rotateX: reducedMotion ? 0 : -45,
      filter: 'blur(4px)',
    },
    center: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      filter: 'blur(0px)',
    },
    exit: {
      y: reducedMotion ? 0 : -20,
      opacity: 0,
      rotateX: reducedMotion ? 0 : 45,
      filter: 'blur(4px)',
    },
  };

  return (
    <div className="word-carousel-container">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className="gradient-text glow-effect"
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: reducedMotion ? 0.2 : 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0.1 : 0.6,
        staggerChildren: reducedMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.1 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.section
      id="hero"
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: reducedMotion ? 0.1 : 0.5 }}
    >
      {/* Ethereal Horizon Background */}
      <EtherealHorizon reducedMotion={reducedMotion} />

      {/* Main content */}
      <motion.div
        className="content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="intro-sequence">
          <div className="intro-text">
            <h1 className="hero-text">
              <motion.div className="greeting-line" variants={itemVariants}>
                <motion.span
                  className="static-text hi"
                  initial={{ opacity: 0, x: reducedMotion ? 0 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 0.2, duration: 0.5 }}
                >
                  Hi,
                </motion.span>
                <motion.span
                  className="static-text im"
                  initial={{ opacity: 0, x: reducedMotion ? 0 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 0.4, duration: 0.5 }}
                >
                  I'm
                </motion.span>
              </motion.div>

              <motion.div variants={itemVariants}>
                <WordCarousel reducedMotion={reducedMotion} />
              </motion.div>
            </h1>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{
          delay: reducedMotion ? 0 : 2,
          duration: reducedMotion ? 0.1 : 0.6,
        }}
        onClick={scrollToNext}
        whileHover={{ opacity: 1 }}
        style={{ cursor: 'pointer' }}
      >
        <motion.div
          className="scroll-arrow-wrapper"
          animate={reducedMotion ? {} : {
            y: [0, 6, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="scroll-arrow" />
        </motion.div>
        <span className="scroll-text">Scroll</span>
      </motion.div>
    </motion.section>
  );
}
