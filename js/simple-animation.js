/**
 * Simple Animation
 * Skip loading screen and show hero section immediately
 */

document.addEventListener('DOMContentLoaded', () => {
  // Get main sections
  const loadingScreen = document.getElementById('loading-screen');
  const hero = document.querySelector('.hero');
  const about = document.getElementById('about');
  
  // Ensure about section is not visible initially
  if (about) {
    about.style.opacity = '0';
  }
  
  // Check if we should show loading animation or go directly to hero
  const skipLoading = false; // Set to true to skip loading animation
  
  if (skipLoading) {
    // Hide loading screen
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
    
    // Show hero immediately
    if (hero) {
      // Force scroll to top
      window.scrollTo(0, 0);
      
      // Show hero
      hero.style.display = 'flex';
      hero.style.opacity = '1';
      hero.style.position = 'relative';
      hero.style.zIndex = '10';
      
      // Animate hero elements
      animateHeroElements();
    }
  } else {
    // Start normal loading sequence
    // The loading sequence will handle the transition to hero
    startTerminalAnimation();
  }
});

// Main terminal animation function
function startTerminalAnimation() {
  // Commands to display in sequence
  const commands = [
    { text: 'initialize', isCommand: true },
    { text: 'Initializing portfolio...', isOutput: true },
    { text: 'load-components', isCommand: true },
    { text: 'Loading components...', isOutput: true },
    { text: 'prepare-experience', isCommand: true },
    { text: 'Preparing experience...', isOutput: true },
    { text: 'launch', isCommand: true },
    { text: 'Ready to launch!', isOutput: true },
    { text: 'welcome', isCommand: true }
  ];
  
  const terminalContent = document.querySelector('.terminal-content');
  
  // Use the existing cursor line in the HTML
  // No need to clear or add a new one
  
  // Add blinking cursor style immediately
  addCursorStyle();
  
  let currentCommandIndex = 0;
  
  // Process commands one by one
  function processNextCommand() {
    if (currentCommandIndex >= commands.length) {
      // All commands processed - no need to add another cursor line
      // as we'll keep the one from the last command
      
      // Make sure cursor style is applied
      addCursorStyle();
      
      // Wait a moderate time before transitioning to hero
      setTimeout(() => {
        transitionToHero();
      }, 1000);
      return;
    }
    
    const command = commands[currentCommandIndex];
    typeCommand(command, () => {
      currentCommandIndex++;
      // Balanced delays between commands and outputs
      setTimeout(processNextCommand, command.isCommand ? 180 : 300);
    });
  }
  
  // Start processing commands
  processNextCommand();
}

// Type a command with animation effect
function typeCommand(command, callback) {
  const terminalContent = document.querySelector('.terminal-content');
  if (!terminalContent) return;
  
  // First, remove any existing cursor
  const existingCursor = terminalContent.querySelector('.cursor');
  if (existingCursor) {
    existingCursor.parentElement.remove();
  }
  
  // Create new line element
  const lineElement = document.createElement('div');
  lineElement.className = command.isCommand ? 'terminal-line' : 'terminal-line output';
  
  // For commands, add the prefix
  if (command.isCommand) {
    lineElement.innerHTML = '$ ';
  }
  
  // Add text span that will be typed
  const textSpan = document.createElement('span');
  textSpan.className = command.isCommand ? 'command' : '';
  lineElement.appendChild(textSpan);
  
  // Add cursor span (using CSS styling instead of block character)
  const cursorSpan = document.createElement('span');
  cursorSpan.className = 'cursor';
  cursorSpan.textContent = '';
  lineElement.appendChild(cursorSpan);
  
  // Add line to terminal
  terminalContent.appendChild(lineElement);
  
  // Type characters one by one (faster)
  let charIndex = 0;
  function typeNextChar() {
    if (charIndex < command.text.length) {
      // Add next character
      textSpan.textContent += command.text.charAt(charIndex);
      charIndex++;
      
      // Balanced typing speed - not too fast, not too slow
      const delay = command.isCommand ? 25 + Math.random() * 15 : 8 + Math.random() * 5;
      setTimeout(typeNextChar, delay);
    } else {
      // Typing complete for this command
      cursorSpan.remove();
      callback();
    }
  }
  
  // Start typing
  typeNextChar();
}

// Add blinking cursor style
function addCursorStyle() {
  if (!document.querySelector('#cursor-blink-style')) {
    const style = document.createElement('style');
    style.id = 'cursor-blink-style';
    style.textContent = `
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      .cursor {
        animation: blink 1s infinite;
        display: inline-block;
        margin-left: 2px;
      }
    `;
    document.head.appendChild(style);
  }
}

// Transition from terminal to hero section
function transitionToHero() {
  const terminal = document.querySelector('.ethereal-terminal');
  const etherealWelcome = document.querySelector('.ethereal-welcome');
  const hero = document.querySelector('.hero');
  const loadingScreen = document.getElementById('loading-screen');
  const about = document.getElementById('about');
  
  // Ensure about section is not visible initially
  if (about) {
    about.style.opacity = '0';
  }
  
  // Fade out terminal (faster)
  if (terminal) {
    terminal.style.transition = 'opacity 400ms ease-out, transform 400ms ease-out';
    terminal.style.opacity = '0';
    terminal.style.transform = 'translateY(-20px)';
  }
  
  // After terminal fades out, show welcome message or hero (faster)
  setTimeout(() => {
    // Show welcome message if it exists
    if (etherealWelcome) {
      // Show welcome message
      etherealWelcome.style.display = 'flex';
      etherealWelcome.style.opacity = '0';
      
      // Fade in welcome message (faster)
      setTimeout(() => {
        etherealWelcome.style.transition = 'opacity 400ms ease-out';
        etherealWelcome.style.opacity = '1';
        
        // Show welcome message for a moment, then fade out (faster)
        setTimeout(() => {
          etherealWelcome.style.transition = 'opacity 400ms ease-out';
          etherealWelcome.style.opacity = '0';
          
          // After welcome fades out, show hero (faster)
          setTimeout(showHero, 400);
        }, 800);
      }, 10);
    } else {
      // No welcome message, go directly to hero
      showHero();
    }
  }, 450);
  
  // Function to show hero section
  function showHero() {
    // Hide loading screen
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
      loadingScreen.style.opacity = '0';
    }
    
    // Ensure about section is not visible during hero transition
    const about = document.getElementById('about');
    if (about) {
      about.style.opacity = '0';
      about.style.transition = 'opacity 0ms';
    }
    
    // Show hero
    if (hero) {
      // Force hero to be visible and positioned correctly
      hero.style.display = 'flex';
      hero.style.opacity = '0';
      hero.style.position = 'relative';
      hero.style.zIndex = '10';
      
      // Ensure the document is scrolled to the top
      window.scrollTo(0, 0);
      
      // Fade in hero with a slight delay to ensure DOM updates
      setTimeout(() => {
        hero.style.transition = 'opacity 500ms ease-out';
        hero.style.opacity = '1';
        
        // Animate hero elements after hero fades in
        setTimeout(animateHeroElements, 300);
        
        // Allow about section to fade in normally after hero is shown
        if (about) {
          setTimeout(() => {
            about.style.transition = 'opacity 600ms ease-out';
            about.style.opacity = '1';
          }, 1000);
        }
      }, 50);
    }
  }
}

// Animate hero elements with staggered timing
function animateHeroElements() {
  // Get hero elements
  const changingWord = document.getElementById('changing-word');
  const tagline = document.getElementById('tagline-text');
  const ctaButton = document.querySelector('.cta-button');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  // Improved handling for the changing word to prevent glitches
  if (changingWord) {
    // Store the initial text but don't modify it
    // Let word-cycle.js handle all text changes
    const initialText = changingWord.textContent;
    
    // Just ensure it's visible with a transition
    changingWord.style.transition = 'opacity 600ms ease-out';
    changingWord.style.opacity = '1';
    
    // Signal that we've handled the initial animation
    changingWord.setAttribute('data-animated', 'true');
  }
  
  // Create array of remaining elements to animate in sequence
  const elements = [tagline, ctaButton, scrollIndicator];
  
  // Staggered animation for other elements
  let delay = 200;
  const staggerDelay = 120;
  
  // Animate each element
  elements.forEach(element => {
    if (element) {
      // Set initial state
      element.style.opacity = '0';
      element.style.transform = 'translateY(15px)';
      
      // Animate with delay
      setTimeout(() => {
        element.style.transition = 'opacity 400ms ease-out, transform 400ms ease-out';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, delay);
      
      delay += staggerDelay;
    }
  });
  
  // Word cycling is handled by word-cycle.js
  // The improved implementation will check if animation is already complete
}

// Word cycling functionality has been moved to word-cycle.js
