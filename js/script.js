document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.getElementById('header');
  
  // Show welcome toast
  showToast("Welcome to IKIM Co Tech", "Explore our services and solutions");
  
  // Add scroll event listener for header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Change menu icon based on menu state
    if (mobileMenu.classList.contains('active')) {
      mobileMenuBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
    } else {
      mobileMenuBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
    }
  });
  
  // Close mobile menu when a link is clicked
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenuBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
    });
  });

  // Dynamic background particles
  const landingSection = document.querySelector('.landing-section');
  const backgroundParticles = document.querySelector('.background-particles');
  
  // Create particles
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = 'white';
    
    // Random size
    const size = Math.random() * 10 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;
    
    // Animation
    particle.style.animation = `pulse ${Math.random() * 5 + 2}s infinite`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    backgroundParticles.appendChild(particle);
  }
  
  // Background gradient movement based on mouse position
  landingSection.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    landingSection.style.backgroundPosition = `${mouseX * 100}% ${mouseY * 100}%`;
    landingSection.style.transition = 'background-position 0.5s ease-out';
  });

  // Projects carousel functionality
  const projectsCarousel = {
    track: document.querySelector('.carousel-track'),
    prevBtn: document.querySelector('.carousel-prev'),
    nextBtn: document.querySelector('.carousel-next'),
    slides: document.querySelectorAll('.project-card'),
    currentSlide: 0,
    slidesPerView: 1,
    
    init() {
      // Set slides per view based on screen width
      this.updateSlidesPerView();
      
      // Add event listeners
      this.prevBtn.addEventListener('click', () => this.slide('prev'));
      this.nextBtn.addEventListener('click', () => this.slide('next'));
      
      // Initialize filter buttons
      this.initFilterButtons();
      
      // Handle window resize
      window.addEventListener('resize', () => {
        this.updateSlidesPerView();
        this.goToSlide(this.currentSlide);
      });
    },
    
    updateSlidesPerView() {
      if (window.innerWidth >= 1024) {
        this.slidesPerView = 3;
      } else if (window.innerWidth >= 640) {
        this.slidesPerView = 2;
      } else {
        this.slidesPerView = 1;
      }
    },
    
    slide(direction) {
      if (direction === 'prev') {
        this.currentSlide = Math.max(this.currentSlide - 1, 0);
      } else {
        const maxSlide = Math.max(0, this.slides.length - this.slidesPerView);
        this.currentSlide = Math.min(this.currentSlide + 1, maxSlide);
      }
      
      this.goToSlide(this.currentSlide);
    },
    
    goToSlide(slideIndex) {
      const slideWidth = this.slides[0].offsetWidth;
      const offset = -slideIndex * slideWidth;
      this.track.style.transform = `translateX(${offset}px)`;
    },
    
    initFilterButtons() {
      const filterButtons = document.querySelectorAll('.filter-btn');
      
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Update active button
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Filter projects
          const category = button.dataset.filter;
          
          this.slides.forEach(slide => {
            if (category === 'all' || slide.dataset.category === category) {
              slide.classList.remove('filtered');
            } else {
              slide.classList.add('filtered');
            }
          });
          
          // Reset carousel position
          this.currentSlide = 0;
          this.goToSlide(0);
        });
      });
    }
  };
  
  projectsCarousel.init();

  // Team carousel for mobile
  const teamCarousel = {
    track: document.querySelector('.team-carousel-track'),
    prevBtn: document.querySelector('.team-carousel-prev'),
    nextBtn: document.querySelector('.team-carousel-next'),
    slides: document.querySelectorAll('.team-member-card'),
    currentSlide: 0,
    
    init() {
      if (!this.track || !this.prevBtn || !this.nextBtn) return;
      
      this.prevBtn.addEventListener('click', () => this.slide('prev'));
      this.nextBtn.addEventListener('click', () => this.slide('next'));
      
      // Set initial position
      this.goToSlide(0);
    },
    
    slide(direction) {
      if (direction === 'prev') {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      } else {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      }
      
      this.goToSlide(this.currentSlide);
    },
    
    goToSlide(slideIndex) {
      if (!this.track) return;
      const slideWidth = this.slides[0].offsetWidth;
      const offset = -slideIndex * slideWidth;
      this.track.style.transform = `translateX(${offset}px)`;
    }
  };
  
  teamCarousel.init();

  // Testimonials carousel
  const testimonialCarousel = {
    track: document.querySelector('.testimonials-track'),
    prevBtn: document.querySelector('.testimonial-prev'),
    nextBtn: document.querySelector('.testimonial-next'),
    slides: document.querySelectorAll('.testimonial-card'),
    currentSlide: 0,
    slidesPerView: 1,
    currentSlideElem: document.querySelector('.current-slide'),
    totalSlidesElem: document.querySelector('.total-slides'),
    
    init() {
      this.updateSlidesPerView();
      
      this.prevBtn.addEventListener('click', () => this.slide('prev'));
      this.nextBtn.addEventListener('click', () => this.slide('next'));
      
      // Update pagination
      this.updatePagination();
      
      // Handle window resize
      window.addEventListener('resize', () => {
        this.updateSlidesPerView();
        this.goToSlide(this.currentSlide);
      });
    },
    
    updateSlidesPerView() {
      if (window.innerWidth >= 1024) {
        this.slidesPerView = 3;
      } else if (window.innerWidth >= 768) {
        this.slidesPerView = 2;
      } else {
        this.slidesPerView = 1;
      }
      
      // Update max slides number in pagination
      if (this.totalSlidesElem) {
        const maxSlide = Math.ceil(this.slides.length / this.slidesPerView);
        this.totalSlidesElem.textContent = maxSlide.toString();
      }
    },
    
    slide(direction) {
      const maxSlide = Math.max(0, Math.ceil(this.slides.length / this.slidesPerView) - 1);
      
      if (direction === 'prev') {
        this.currentSlide = (this.currentSlide - 1 + maxSlide + 1) % (maxSlide + 1);
      } else {
        this.currentSlide = (this.currentSlide + 1) % (maxSlide + 1);
      }
      
      this.goToSlide(this.currentSlide);
      this.updatePagination();
    },
    
    goToSlide(slideIndex) {
      const slideWidth = this.slides[0].offsetWidth;
      const offset = -slideIndex * slideWidth * this.slidesPerView;
      this.track.style.transform = `translateX(${offset}px)`;
    },
    
    updatePagination() {
      if (this.currentSlideElem) {
        this.currentSlideElem.textContent = (this.currentSlide + 1).toString();
      }
    }
  };
  
  testimonialCarousel.init();

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.elements['name'].value;
      showToast("Message sent!", `Thank you ${name}, we'll get back to you soon.`);
      contactForm.reset();
    });
  }

  // Newsletter form submission
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("Subscribed!", "Thank you for subscribing to our newsletter!");
      newsletterForm.reset();
    });
  }

  // Toast functionality
  function showToast(title, message, duration = 5000) {
    const toast = document.getElementById('toast');
    const toastTitle = toast.querySelector('.toast-title');
    const toastMessage = toast.querySelector('.toast-message');
    const toastClose = toast.querySelector('.toast-close');
    
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    toast.classList.add('show');
    
    const hideToast = () => {
      toast.classList.remove('show');
    };
    
    // Close on button click
    toastClose.addEventListener('click', hideToast);
    
    // Auto close after duration
    const timeout = setTimeout(hideToast, duration);
    
    // Clear timeout if manually closed
    toastClose.addEventListener('click', () => {
      clearTimeout(timeout);
    });
  }

  // Intersection Observer for animation
  const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.1 });
    
    // Observe section headers
    document.querySelectorAll('.section-header').forEach(el => observer.observe(el));
    
    // Observe service boxes
    document.querySelectorAll('.service-box').forEach((el, index) => {
      el.style.transitionDelay = `${index * 100}ms`;
      observer.observe(el);
    });
    
    // Observe team members in desktop view
    document.querySelectorAll('.team-member').forEach((el, index) => {
      el.style.transitionDelay = `${index * 100}ms`;
      observer.observe(el);
    });
    
    // Observe contact grid
    document.querySelector('.contact-grid')?.classList.add('fade-in');
  };
  
  observeElements();
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});
