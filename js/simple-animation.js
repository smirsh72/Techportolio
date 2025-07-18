/**
 * Simple Animation
 * Skip loading screen and show hero section immediately
 */

// Simplified preload function - no cursor image loading
function preloadResources() {
  return new Promise((resolve) => {
    // Small delay to ensure browser is ready
    setTimeout(() => {
      resolve();
    }, 50);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Pre-load critical elements and apply hardware acceleration hints
  const loadingScreen = document.getElementById('loading-screen');
  const hero = document.querySelector('.hero');
  const about = document.getElementById('about');
  const terminal = document.querySelector('.ethereal-terminal');
  
  // Apply hardware acceleration to terminal immediately to prevent animation lag
  if (terminal) {
    terminal.style.willChange = 'opacity, transform';
    terminal.style.transform = 'translateZ(0)';
    
    // Ensure terminal is visible immediately to prevent flicker
    terminal.style.opacity = '1';
    
    // Force a reflow to ensure styles are applied immediately
    void terminal.offsetHeight;
  }
  
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
    // Preload resources first, then start animation
    preloadResources().then(() => {
      // Use double requestAnimationFrame to ensure browser is ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Start animation immediately without delay
          startTerminalAnimation();
        });
      });
    });
  }
});

// Main terminal animation function with optimizations for desktop
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
  const terminal = document.querySelector('.ethereal-terminal');
  
  // Ensure terminal is visible and has hardware acceleration
  if (!terminal || !terminalContent) {
    console.error('Terminal elements not found, skipping animation');
    // Fallback to showing hero section directly
    transitionToHero();
    return;
  }
  
  // Clear any existing content to prevent duplicate animations
  terminalContent.innerHTML = '';
  
  // Make sure terminal is visible with hardware acceleration
  terminal.style.opacity = '1';
  terminal.style.willChange = 'opacity, transform';
  terminal.style.transform = 'translateZ(0)';
  
  // Force a reflow to ensure styles are applied immediately
  void terminal.offsetHeight;
  
  // Add blinking cursor style immediately
  addCursorStyle();
  
  // Add a simple pink terminal blinker
  const pinkBlinker = document.createElement('div');
  pinkBlinker.className = 'pink-blinker';
  terminalContent.appendChild(pinkBlinker);
  
  // Add CSS for the pink blinker
  const pinkBlinkerStyle = document.createElement('style');
  pinkBlinkerStyle.textContent = `
    .pink-blinker {
      width: 10px;
      height: 18px;
      background-color: #ff69b4; /* Hot pink */
      margin: 5px 0;
      animation: blink 1s step-end infinite;
    }
  `;
  document.head.appendChild(pinkBlinkerStyle);
  
  let currentCommandIndex = 0;
  
  // Process commands one by one
  function processNextCommand() {
    if (currentCommandIndex >= commands.length) {
      // All commands processed - no need to add another cursor line
      // as we'll keep the one from the last command
      
      // Make sure cursor style is applied
      addCursorStyle();
      
      // Transition to hero section with minimal delay
      requestAnimationFrame(() => {
        setTimeout(transitionToHero, 200);
      });
      return;
    }
    
    const command = commands[currentCommandIndex];
    typeCommand(command, () => {
      currentCommandIndex++;
      // Add a small delay between commands for better readability
      setTimeout(processNextCommand, command.isCommand ? 100 : 150);
    });
  }
  
  // Start processing commands using requestAnimationFrame
  // This ensures the animation starts in sync with the browser's refresh rate
  requestAnimationFrame(() => {
    processNextCommand();
  });
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
  
  // Create line element
  const lineElement = document.createElement('div');
  lineElement.className = 'line';
  lineElement.style.opacity = '1';
  
  // Append the line to the terminal content
  terminalContent.appendChild(lineElement);
  
  // Add prompt if this is a command (not output)
  if (command.isCommand) {
    const promptSpan = document.createElement('span');
    promptSpan.className = 'prompt';
    promptSpan.textContent = '$ ';
    lineElement.appendChild(promptSpan);
    
    // Add text span that will be typed for commands
    const textSpan = document.createElement('span');
    textSpan.className = 'command';
    lineElement.appendChild(textSpan);
    
    // Add cursor span for commands
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor';
    cursorSpan.textContent = '';
    lineElement.appendChild(cursorSpan);
    
    // Add line to terminal
    terminalContent.appendChild(lineElement);
    
    // Force a reflow to ensure the element is rendered immediately
    void lineElement.offsetHeight;
    
    // Type characters one by one for commands (fast)
    let charIndex = 0;
    function typeNextChar() {
      if (charIndex < command.text.length) {
        // Add next character
        textSpan.textContent += command.text.charAt(charIndex);
        charIndex++;
        
        // Slightly slower, more natural typing speed
        setTimeout(typeNextChar, 15 + Math.random() * 10);
      } else {
        // Typing complete for this command
        cursorSpan.remove();
        
        // Add a slightly longer pause after command is typed
        setTimeout(callback, 150);
      }
    }
    
    // Start typing
    typeNextChar();
  } else {
    // For outputs, show complete text with a cloud-like floating effect
    lineElement.style.opacity = '0';
    lineElement.style.transform = 'translateY(12px)';
    
    // Add output prompt (>)
    const outputPromptSpan = document.createElement('span');
    outputPromptSpan.className = 'output-prompt';
    outputPromptSpan.textContent = '> ';
    outputPromptSpan.style.color = '#888'; // Gray color for prompt
    lineElement.appendChild(outputPromptSpan);
    
    // Add text span with complete output text in gray
    const textSpan = document.createElement('span');
    textSpan.className = 'output-text';
    textSpan.textContent = command.text;
    textSpan.style.color = '#aaa'; // Light gray for output text
    lineElement.appendChild(textSpan);
    
    // Add line to terminal
    terminalContent.appendChild(lineElement);
    
    // Force a reflow to ensure the element is rendered immediately
    void lineElement.offsetHeight;
    
    // Add hardware acceleration for smoother animation
    lineElement.style.willChange = 'opacity, transform';
    
    // Smoothly fade in the output with enhanced cloud-like floating effect
    requestAnimationFrame(() => {
      // Use a more pronounced easing curve for cloud-like motion
      lineElement.style.transition = 'opacity 300ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)';
      lineElement.style.opacity = '1';
      lineElement.style.transform = 'translateY(0)';
      
      // Call the callback after the transition with a longer delay for smoother flow
      setTimeout(() => {
        // Clean up hardware acceleration
        lineElement.style.willChange = 'auto';
        
        // Call the callback to process next command
        callback();
      }, 250);
    });
  }
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

// Transition from terminal to hero section with optimizations for desktop
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
  
  // Prepare hero section before animation starts
  if (hero) {
    // Pre-position hero but keep it hidden
    hero.style.display = 'flex';
    hero.style.opacity = '0';
    hero.style.position = 'relative';
    hero.style.zIndex = '10';
    
    // Force a reflow to ensure styles are applied immediately
    void hero.offsetHeight;
  }
  
  // Fade out terminal (faster)
  if (terminal) {
    terminal.style.transition = 'opacity 350ms ease-out, transform 350ms ease-out';
    terminal.style.opacity = '0';
    terminal.style.transform = 'translateY(-20px)';
  }
  
  // Use requestAnimationFrame for smoother transition
  requestAnimationFrame(() => {
    if (etherealWelcome) {
      // Hide welcome message completely
      etherealWelcome.style.display = 'none';
    }
    
    // Show hero immediately without delay
    showHero();
  });
  
  // Function to show hero section with optimized performance
  function showHero() {
    // Hide loading screen immediately
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
    
    // Show hero with optimized rendering
    if (hero) {
      // Force hero to be visible and positioned correctly
      hero.style.display = 'flex';
      hero.style.position = 'relative';
      hero.style.zIndex = '10';
      
      // Ensure the document is scrolled to the top
      window.scrollTo(0, 0);
      
      // Add hardware acceleration for smoother animation
      hero.style.willChange = 'opacity, transform';
      hero.style.transform = 'translateY(15px)';
      hero.style.opacity = '0';
      
      // Force a reflow to ensure styles are applied immediately
      void hero.offsetHeight;
      
      // Use requestAnimationFrame for smoother animation timing
      requestAnimationFrame(() => {
        // Fade in hero with enhanced cloud-like floating effect
        hero.style.transition = 'opacity 500ms ease-out, transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1)';
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
        
        // Animate hero elements with staggered timing
        // Use requestAnimationFrame to ensure browser is ready
        requestAnimationFrame(animateHeroElements);
        
        // Allow about section to fade in with enhanced cloud-like effect
        if (about) {
          about.style.willChange = 'opacity, transform';
          about.style.transform = 'translateY(20px)';
          
          // Delay about section animation until hero is visible
          setTimeout(() => {
            about.style.transition = 'opacity 800ms ease-out, transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1)';
            about.style.opacity = '1';
            about.style.transform = 'translateY(0)';
          }, 800);
        }
        
        // Clean up hardware acceleration after animations complete
        setTimeout(() => {
          hero.style.willChange = 'auto';
          if (about) about.style.willChange = 'auto';
        }, 1500);
      });
    }
  }
}

// Animate hero elements with cloud-like floating effect
function animateHeroElements() {
  // Get hero elements
  const changingWord = document.getElementById('changing-word');
  const tagline = document.getElementById('tagline-text');
  const ctaButton = document.querySelector('.cta-button');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  // Simple fade-in for the changing word to avoid bouncing issues
  if (changingWord) {
    // Just fade in without transform to avoid conflict with word-cycle.js
    changingWord.style.opacity = '0';
    
    // Force a reflow
    void changingWord.offsetHeight;
    
    // Simple fade-in without bounce
    changingWord.style.transition = 'opacity 600ms ease-out';
    changingWord.style.opacity = '1';
    
    // Signal that we've handled the initial animation
    changingWord.setAttribute('data-animated', 'true');
  }
  
  // Create array of remaining elements to animate in sequence
  const elements = [tagline, ctaButton, scrollIndicator];
  
  // Faster staggered animation with cloud-like effect
  let delay = 150;
  const staggerDelay = 120;
  
  // Animate each element with cloud-like floating (faster)
  elements.forEach(element => {
    if (element) {
      // Add hardware acceleration
      element.style.willChange = 'opacity, transform';
      
      // Set initial state with moderate offset for floating effect
      element.style.opacity = '0';
      element.style.transform = 'translateY(15px)';
      
      // Force a reflow
      void element.offsetHeight;
      
      // Animate with cloud-like floating effect (faster)
      setTimeout(() => {
        element.style.transition = 'opacity 450ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Clean up hardware acceleration after animation
        setTimeout(() => element.style.willChange = 'auto', 500);
      }, delay);
      
      delay += staggerDelay;
    }
  });
  
  // Word cycling is handled by word-cycle.js
  // The improved implementation will check if animation is already complete
}

// Word cycling functionality has been moved to word-cycle.js
