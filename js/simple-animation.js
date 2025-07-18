/**
 * Simple Animation
 * Skip loading screen and show hero section immediately
 */

// Immediately execute code to optimize loading sequence before DOM loads
(function() {
  // Detect if we're on desktop
  const isDesktop = window.innerWidth >= 768;
  
  // Create and inject a style element with high priority rules
  const style = document.createElement('style');
  
  // More aggressive hiding for desktop
  if (isDesktop) {
    style.textContent = `
      /* Completely hide welcome elements */
      .ethereal-welcome, .welcome-symbol, .welcome-message {
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
      
      /* Force terminal to be visible */
      .ethereal-terminal {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 999 !important;
        transform: translateZ(0) !important;
        will-change: opacity, transform !important;
      }
      
      /* Force terminal content to be visible */
      .terminal-content {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      /* Ensure pink cursor is visible */
      .cursor {
        display: inline-block !important;
        visibility: visible !important;
        opacity: 1 !important;
        background-color: #f472b6 !important;
      }
    `;
  } else {
    // Less aggressive for mobile since it's already working
    style.textContent = `
      .ethereal-welcome, .welcome-symbol, .welcome-message {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
      .ethereal-terminal {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
    `;
  }
  
  // Insert at the beginning of head for highest priority
  document.head.insertBefore(style, document.head.firstChild);
  
  // For desktop, also modify the DOM as soon as it's available
  if (isDesktop) {
    document.addEventListener('DOMContentLoaded', function() {
      // Hide welcome elements again to be extra sure
      const welcomeElements = document.querySelectorAll('.ethereal-welcome, .welcome-symbol, .welcome-message');
      welcomeElements.forEach(el => {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
        el.style.width = '0';
        el.style.height = '0';
        el.style.overflow = 'hidden';
      });
      
      // Force terminal to be visible
      const terminal = document.querySelector('.ethereal-terminal');
      if (terminal) {
        terminal.style.display = 'block';
        terminal.style.visibility = 'visible';
        terminal.style.opacity = '1';
      }
    }, { once: true });
  }
})();

// Enhanced preload function with desktop-specific optimizations
function preloadResources() {
  return new Promise((resolve) => {
    // Detect if we're on desktop
    const isDesktop = window.innerWidth >= 768;
    
    // Get elements
    const welcomeSymbol = document.querySelector('.welcome-symbol');
    const welcomeMessage = document.querySelector('.welcome-message');
    const etherealWelcome = document.querySelector('.ethereal-welcome');
    const terminalContent = document.querySelector('.terminal-content');
    const terminal = document.querySelector('.ethereal-terminal');
    const cursor = document.querySelector('.cursor');
    
    // More aggressive approach for desktop
    if (isDesktop) {
      // Completely remove welcome elements from flow
      if (welcomeSymbol) {
        welcomeSymbol.style.display = 'none';
        welcomeSymbol.style.visibility = 'hidden';
        welcomeSymbol.style.opacity = '0';
        welcomeSymbol.style.position = 'absolute';
        welcomeSymbol.style.pointerEvents = 'none';
        welcomeSymbol.style.width = '0';
        welcomeSymbol.style.height = '0';
        welcomeSymbol.style.overflow = 'hidden';
      }
      
      if (welcomeMessage) {
        welcomeMessage.style.display = 'none';
        welcomeMessage.style.visibility = 'hidden';
        welcomeMessage.style.opacity = '0';
        welcomeMessage.style.position = 'absolute';
        welcomeMessage.style.pointerEvents = 'none';
        welcomeMessage.style.width = '0';
        welcomeMessage.style.height = '0';
        welcomeMessage.style.overflow = 'hidden';
      }
      
      if (etherealWelcome) {
        etherealWelcome.style.display = 'none';
        etherealWelcome.style.visibility = 'hidden';
        etherealWelcome.style.opacity = '0';
        etherealWelcome.style.position = 'absolute';
        etherealWelcome.style.pointerEvents = 'none';
        etherealWelcome.style.width = '0';
        etherealWelcome.style.height = '0';
        etherealWelcome.style.overflow = 'hidden';
      }
      
      // Force terminal to be visible with hardware acceleration
      if (terminal) {
        terminal.style.display = 'block';
        terminal.style.visibility = 'visible';
        terminal.style.opacity = '1';
        terminal.style.willChange = 'opacity, transform';
        terminal.style.transform = 'translateZ(0)';
        terminal.style.position = 'relative';
        terminal.style.zIndex = '999';
      }
      
      // Ensure terminal content is visible
      if (terminalContent) {
        terminalContent.style.display = 'block';
        terminalContent.style.visibility = 'visible';
        terminalContent.style.opacity = '1';
      }
      
      // Make sure cursor is visible
      if (cursor) {
        cursor.style.display = 'inline-block';
        cursor.style.visibility = 'visible';
        cursor.style.opacity = '1';
        cursor.style.backgroundColor = '#f472b6';
      }
      
      // Force layout calculation
      if (terminal) void terminal.offsetHeight;
      if (terminalContent) void terminalContent.offsetHeight;
      
      // Use a small timeout to ensure styles are applied before animation starts
      setTimeout(() => resolve(), 10);
    } else {
      // Less aggressive approach for mobile since it's already working
      if (welcomeSymbol) welcomeSymbol.style.display = 'none';
      if (welcomeMessage) welcomeMessage.style.display = 'none';
      if (etherealWelcome) etherealWelcome.style.display = 'none';
      
      if (terminal && terminalContent) {
        terminal.style.willChange = 'opacity, transform';
        terminal.style.transform = 'translateZ(0)';
        terminal.style.display = 'block';
        terminal.style.opacity = '1';
        
        void terminal.offsetHeight;
        void terminalContent.offsetHeight;
      }
      
      resolve();
    }
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
  
  // Check if URL has a hash to skip loading screen
  if (window.location.hash) {
    // Hide loading screen
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
    
    // Show hero section
    if (hero) {
      // Show hero
      hero.style.display = 'flex';
      hero.style.opacity = '1';
      hero.style.position = 'relative';
      hero.style.zIndex = '10';
      
      // Animate hero elements
      animateHeroElements();
    }
  } else {
    // Detect if we're on desktop
    const isDesktop = window.innerWidth >= 768;
    
    // Ensure terminal is visible before anything else
    if (terminal) {
      terminal.style.display = 'block';
      terminal.style.visibility = 'visible';
      terminal.style.opacity = '1';
    }
    
    // For desktop, use a more aggressive approach
    if (isDesktop) {
      // Hide welcome elements completely
      const welcomeElements = document.querySelectorAll('.ethereal-welcome, .welcome-symbol, .welcome-message');
      welcomeElements.forEach(el => {
        if (el) {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
          el.style.opacity = '0';
          el.style.position = 'absolute';
          el.style.pointerEvents = 'none';
          el.style.width = '0';
          el.style.height = '0';
          el.style.overflow = 'hidden';
        }
      });
      
      // Start animation immediately without preloading
      startTerminalAnimation();
    } else {
      // For mobile, use the normal flow since it's working
      preloadResources().then(() => {
        startTerminalAnimation();
      });
    }
  }
});

// Main terminal animation function with optimizations for desktop
function startTerminalAnimation() {
  // Get terminal elements
  const terminalContent = document.querySelector('.terminal-content');
  const terminal = document.querySelector('.ethereal-terminal');
  
  if (!terminal || !terminalContent) {
    console.error('Terminal elements not found, skipping animation');
    // Fallback to showing hero section directly
    transitionToHero();
    return;
  }
  
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
  
  // Add blinking cursor style immediately
  addCursorStyle();
  
  // Clear any existing content in the terminal to ensure we start fresh
  // This removes any initial $ sign that might be in the HTML
  const initialCursorLine = terminalContent.querySelector('.cursor-line');
  if (initialCursorLine) {
    // Keep only the cursor element, remove any text nodes (including the $ sign)
    const cursor = initialCursorLine.querySelector('.cursor');
    if (cursor) {
      initialCursorLine.innerHTML = '';
      initialCursorLine.appendChild(cursor);
    }
  }
  
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
  
  // Force a paint before starting the animation to fix Chrome fullscreen lag
  // Create and append a dummy element to trigger a first paint in Chrome
  const dummyElement = document.createElement('div');
  dummyElement.style.height = '1px';
  dummyElement.style.position = 'absolute';
  dummyElement.style.opacity = '0';
  terminal.appendChild(dummyElement);
  
  // Explicitly set display to block and force a layout recalculation
  terminal.style.display = 'block';
  
  // Force a reflow/repaint by accessing a layout property
  // This will make Chrome commit the first frame before animation starts
  void terminal.getBoundingClientRect();
  
  // Remove the dummy element after forcing the paint
  setTimeout(() => terminal.removeChild(dummyElement), 0);
  
  // Use double requestAnimationFrame to ensure the browser has committed the first frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      processNextCommand();
    });
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
