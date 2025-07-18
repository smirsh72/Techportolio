/**
 * Simplified Animation
 * Skip terminal animation and show hero section with smooth transition
 */

// Immediately hide terminal elements before page loads
(function() {
  // Create and inject styles to hide terminal elements immediately
  const hideTerminalStyle = document.createElement('style');
  hideTerminalStyle.textContent = `
    /* Hide all terminal-related elements */
    .ethereal-terminal, 
    .terminal-content, 
    .cursor-line, 
    .cursor,
    .ethereal-welcome, 
    .welcome-symbol, 
    .welcome-message,
    .pink-blinker {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      position: absolute !important;
      z-index: -999 !important;
      pointer-events: none !important;
      width: 0 !important;
      height: 0 !important;
      overflow: hidden !important;
    }
    
    /* Ensure hero section is ready to be shown */
    .hero-section {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 600ms ease-out, transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    /* Prepare about section */
    #about {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 800ms ease-out, transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
  `;
  
  // Insert at the beginning of head for highest priority
  document.head.insertBefore(hideTerminalStyle, document.head.firstChild);
})();

document.addEventListener('DOMContentLoaded', () => {
  // Get main elements
  const loadingScreen = document.getElementById('loading-screen');
  const hero = document.querySelector('.hero');
  const about = document.getElementById('about');
  
  // Check if URL has a hash to skip loading screen entirely
  if (window.location.hash) {
    // Hide loading screen immediately
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
    
    // Show hero section immediately
    if (hero) {
      hero.style.display = 'flex';
      hero.style.opacity = '1';
      hero.style.transform = 'translateY(0)';
      hero.style.position = 'relative';
      hero.style.zIndex = '10';
      
      // Animate hero elements immediately
      animateHeroElements();
    }
    
    // Show about section
    if (about) {
      setTimeout(() => {
        about.style.opacity = '1';
        about.style.transform = 'translateY(0)';
      }, 300);
    }
  } else {
    // Normal flow - show hero with smooth transition after brief delay
    setTimeout(() => {
      showHeroSection();
    }, 500); // Small delay to let the page settle
  }
});

// Function to show hero section with smooth transition
function showHeroSection() {
  const loadingScreen = document.getElementById('loading-screen');
  const hero = document.querySelector('.hero');
  const about = document.getElementById('about');
  
  // Hide loading screen
  if (loadingScreen) {
    loadingScreen.style.transition = 'opacity 400ms ease-out';
    loadingScreen.style.opacity = '0';
    
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 400);
  }
  
  // Show hero section with smooth animation
  if (hero) {
    // Prepare hero section
    hero.style.display = 'flex';
    hero.style.position = 'relative';
    hero.style.zIndex = '10';
    hero.style.willChange = 'opacity, transform';
    
    // Ensure we're at the top of the page
    window.scrollTo(0, 0);
    
    // Force a reflow to ensure styles are applied
    void hero.offsetHeight;
    
    // Animate hero in with cloud-like floating effect
    requestAnimationFrame(() => {
      hero.style.opacity = '1';
      hero.style.transform = 'translateY(0)';
      
      // Animate hero elements with staggered timing
      setTimeout(() => {
        animateHeroElements();
      }, 200);
      
      // Show about section after hero animation
      if (about) {
        setTimeout(() => {
          about.style.opacity = '1';
          about.style.transform = 'translateY(0)';
        }, 800);
      }
      
      // Clean up hardware acceleration
      setTimeout(() => {
        hero.style.willChange = 'auto';
      }, 1500);
    });
  }
}

// Animate hero elements with cloud-like floating effect
function animateHeroElements() {
  // Get hero elements
  const changingWord = document.getElementById('changing-word');
  const tagline = document.getElementById('tagline-text');
  const ctaButton = document.querySelector('.cta-button');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  // Animate changing word first (simple fade to avoid conflicts with word cycling)
  if (changingWord) {
    changingWord.style.opacity = '0';
    changingWord.style.transition = 'opacity 600ms ease-out';
    
    // Force a reflow
    void changingWord.offsetHeight;
    
    // Fade in
    changingWord.style.opacity = '1';
    
    // Mark as animated for word-cycle.js
    changingWord.setAttribute('data-animated', 'true');
  }
  
  // Animate remaining elements with staggered timing
  const elements = [tagline, ctaButton, scrollIndicator];
  let delay = 150;
  const staggerDelay = 120;
  
  elements.forEach(element => {
    if (element) {
      // Set initial state
      element.style.opacity = '0';
      element.style.transform = 'translateY(15px)';
      element.style.willChange = 'opacity, transform';
      
      // Force a reflow
      void element.offsetHeight;
      
      // Animate with cloud-like floating effect
      setTimeout(() => {
        element.style.transition = 'opacity 450ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Clean up hardware acceleration
        setTimeout(() => {
          element.style.willChange = 'auto';
        }, 500);
      }, delay);
      
      delay += staggerDelay;
    }
  });
}