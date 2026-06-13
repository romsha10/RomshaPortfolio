document.addEventListener('DOMContentLoaded', () => {
  
  // 1. MOBILE NAVIGATION GATEWAY
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (mobileMenuToggle && navLinks) {
    // Toggle menu state on hamburger click
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('is-active');
      navLinks.classList.toggle('is-active');
    });

    // Close menu automatically when a link is clicked
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('is-active');
        navLinks.classList.remove('is-active');
      });
    });
  }


  // 2. TECH PERSONA TYPING CORE
  const roles = [
    "Data Scientist · MSc University of Glasgow",
    "Fair AI Researcher · IR Research Group",
    "EdTech Founder · ENGIMY",
    "NHS Oracle Builder · Healthcare Analytics",
    "ESG Intelligence · Greenwashing Auditor",
    "Fraud Detection · XAI Practitioner"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedElement = document.getElementById('typed');

  function handleTypingLoop() {
    if (!typedElement) return;

    const currentRole = roles[roleIndex];
    
    if (!isDeleting) {
      // Add characters
      typedElement.textContent = currentRole.slice(0, charIndex + 1);
      charIndex++;

      // Once word complete, pause before deleting
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(handleTypingLoop, 2200); 
        return;
      }
    } else {
      // Remove characters
      typedElement.textContent = currentRole.slice(0, charIndex - 1);
      charIndex--;

      // Once fully deleted, move to the next title
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    // Dynamic pacing: Deleting is inherently faster than construction
    const dynamicSpeed = isDeleting ? 35 : 60;
    setTimeout(handleTypingLoop, dynamicSpeed);
  }

  // Trigger typing engine loop
  handleTypingLoop();


  // 3. HARDWARE-ACCELERATED METRIC ENGINES (NUMERICAL COUNTER)
  function animateMetricCounters(counterElement) {
    const targetValue = parseFloat(counterElement.getAttribute('data-target'));
    const decimalPlaces = parseInt(counterElement.getAttribute('data-decimals')) || 0;
    const trackingSuffix = counterElement.textContent.includes('+') ? '+' : '';
    
    let initialStart = 0;
    const animationDuration = 1800; // Total duration in ms
    const executionStepTime = 20;   // Interval frame gap
    
    const totalStepIncrements = animationDuration / executionStepTime;
    const incrementPerStep = targetValue / totalStepIncrements;

    const counterTimer = setInterval(() => {
      initialStart += incrementPerStep;
      
      if (initialStart >= targetValue) {
        counterElement.textContent = targetValue.toFixed(decimalPlaces) + trackingSuffix;
        clearInterval(counterTimer);
      } else {
        counterElement.textContent = initialStart.toFixed(decimalPlaces) + trackingSuffix;
      }
    }, executionStepTime);
  }


  // 4. CASCADE INTERSECTION OBSERVER
  // Ensures animations respect user's system layout configuration guidelines
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const scrollObserverOptions = {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px' // Triggers slightly before element leaves window boundary
    };

    const targetVisibilityObserver = new IntersectionObserver((observedEntries, selfObserver) => {
      observedEntries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetNode = entry.target;
          
          // Trigger visible states via layout classes
          targetNode.style.opacity = '1';
          targetNode.style.transform = 'translateY(0)';
          targetNode.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
          
          // Special evaluation layer: if target node is a stat numerical block, fire increment count loop
          if (targetNode.classList.contains('stat-card')) {
            const counterChild = targetNode.querySelector('.stat-num');
            if (counterChild && !targetNode.classList.contains('counted')) {
              targetNode.classList.add('counted');
              animateMetricCounters(counterChild);
            }
          }

          // Unobserve current layer once fully deployed
          selfObserver.unobserve(targetNode);
        }
      });
    }, scrollObserverOptions);

    // Collect layout clusters requiring scroll-linked fade cascades
    const structuralAnimationElements = document.querySelectorAll('.animate-on-scroll');
    structuralAnimationElements.forEach(element => {
      targetVisibilityObserver.observe(element);
    });
    
  } else {
    // Graceful Accessibility Fallback: Immediately display all numeric targets safely
    document.querySelectorAll('.stat-num').forEach(counter => {
      const target = counter.parentNode.getAttribute('data-target') || counter.textContent;
      counter.textContent = target;
    });
  }
});
