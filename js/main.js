// ============================================
// PREMIUM NAVIGATION & MOBILE MENU
// ============================================
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
const closeMobileMenuBtn = document.getElementById("closeMobileMenu");
const navbar = document.getElementById("navbar");

// Open mobile menu
mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("open");
  mobileMenuOverlay.classList.add("open");
  mobileMenuBtn.classList.add("open");
  document.body.style.overflow = "hidden";
});

// Close mobile menu function
function closeMobileMenu() {
  mobileMenu.classList.remove("open");
  mobileMenuOverlay.classList.remove("open");
  mobileMenuBtn.classList.remove("open");
  document.body.style.overflow = "auto";
}

// Close button
closeMobileMenuBtn.addEventListener("click", closeMobileMenu);

// Close when overlay clicked
mobileMenuOverlay.addEventListener("click", closeMobileMenu);

// Close menu when link clicked
document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

// Sticky navbar effect with white background and rounded corners
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("sticky-active");
  } else {
    navbar.classList.remove("sticky-active");
  }
});

// ============================================
// VIDEO MODAL
// ============================================
function openVideoModal() {
  document.getElementById("videoModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeVideoModal() {
  document.getElementById("videoModal").classList.remove("open");
  document.body.style.overflow = "auto";
}

document.getElementById("videoModal").addEventListener("click", (e) => {
  if (e.target.id === "videoModal") {
    closeVideoModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeVideoModal();
  }
});

// ============================================
// ACCORDION (FAQ)
// ============================================
function toggleAccordion(index) {
  const btn = document.querySelectorAll(".accordion-btn")[index];
  const content = document.getElementById(`faq-${index}`);

  // Close all others
  document.querySelectorAll(".accordion-content").forEach((c, i) => {
    if (i !== index) {
      c.classList.remove("open");
      document.querySelectorAll(".accordion-btn")[i].classList.remove("open");
    }
  });

  // Toggle current
  content.classList.toggle("open");
  btn.classList.toggle("open");
}

// ============================================
// ANIMATED COUNTERS
// ============================================
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  const observerOptions = { threshold: 0.5 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const target = parseInt(entry.target.dataset.target);
        let current = 0;
        const increment = target / 60;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            entry.target.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target.toLocaleString();
            entry.target.dataset.animated = "true";
          }
        };

        updateCounter();
      }
    });
  }, observerOptions);

  counters.forEach((counter) => observer.observe(counter));
}

// ============================================
// SCROLL-TRIGGERED ANIMATIONS (Intersection Observer — created once)
// ============================================
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        // Apply stagger delay from data-delay attribute if present
        const delay = entry.target.dataset.delay;
        if (delay !== undefined) {
          entry.target.style.transitionDelay = (parseFloat(delay) * 0.12) + "s";
        }
        entry.target.classList.add("visible");
        entry.target.dataset.animated = "true";
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  document
    .querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-in")
    .forEach((el) => {
      observer.observe(el);
    });
}

// ============================================
// SMOOTH SCROLL & ANCHOR LINKS - FIXED VERSION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href !== "#" && href !== "") {
      e.preventDefault();
      const targetId = href.substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        // Function to perform the scroll
        const performScroll = () => {
          const yOffset = -80; // Offset for fixed navbar
          const y =
            target.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        };

        // Check if mobile menu is open
        const isMobileMenuOpen = mobileMenu.classList.contains("open");

        if (isMobileMenuOpen) {
          // Close mobile menu first
          closeMobileMenu();
          // Wait for menu animation to complete (300ms CSS transition + small buffer)
          setTimeout(performScroll, 320);
        } else {
          // Desktop - scroll immediately
          performScroll();
        }
      }
    }
  });
});

// ============================================
// TIMELINE ANIMATION & CONTROLS
// ============================================
let activeStepIndex = 0;
let lastScrollPosition = window.scrollY;
let directionIndicatorTimeout;

function setScrollDirectionIndicator(direction) {
  const guide = document.getElementById("timelineGuide");
  if (!guide) return;

  if (directionIndicatorTimeout) {
    window.clearTimeout(directionIndicatorTimeout);
  }

  guide.classList.remove("guide-up", "guide-down");

  if (direction === "down") {
    guide.classList.add("guide-down");
  } else if (direction === "up") {
    guide.classList.add("guide-up");
  }

  directionIndicatorTimeout = window.setTimeout(() => {
    guide.classList.remove("guide-up", "guide-down");
  }, 600);
}

function updateTimeline() {
  const stepsWrapper = document.querySelector(".steps-wrapper");
  if (!stepsWrapper) return;

  const timelineProgress = document.getElementById("timelineProgress");
  const timelineGuide = document.getElementById("timelineGuide");
  const steps = document.querySelectorAll(".step-card");

  const wrapperRect = stepsWrapper.getBoundingClientRect();
  const containerTop = window.scrollY + wrapperRect.top;
  const containerHeight = stepsWrapper.offsetHeight;
  const viewportMiddle = window.scrollY + window.innerHeight / 2;

  const progressRaw = ((viewportMiddle - containerTop) / containerHeight) * 100;
  const progress = Math.max(0, Math.min(100, progressRaw));

  if (timelineProgress) {
    timelineProgress.style.height = progress + "%";
  }

  if (timelineGuide) {
    const guidePosition = Math.max(6, Math.min(94, progress));
    timelineGuide.style.top = guidePosition + "%";
  }

  let closestDistance = Infinity;
  let resolvedActiveIndex = 0;

  steps.forEach((step, index) => {
    const rect = step.getBoundingClientRect();
    const stepMiddle = window.scrollY + rect.top + rect.height / 2;
    const distance = Math.abs(viewportMiddle - stepMiddle);

    if (distance < closestDistance) {
      closestDistance = distance;
      resolvedActiveIndex = index;
    }
  });

  steps.forEach((step, index) => {
    step.classList.toggle("active", index === resolvedActiveIndex);
  });

  activeStepIndex = resolvedActiveIndex;

  const scrollingDown = window.scrollY > lastScrollPosition + 4;
  const scrollingUp = window.scrollY < lastScrollPosition - 4;

  if (scrollingDown) {
    setScrollDirectionIndicator("down");
  } else if (scrollingUp) {
    setScrollDirectionIndicator("up");
  }

  lastScrollPosition = window.scrollY;
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show/hide button based on scroll position
function toggleScrollToTopBtn() {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
}

// Scroll to top when button is clicked
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ============================================
// TESTIMONIAL CAROUSEL
// ============================================
function setupTestimonialCarousel() {
  const carousel = document.querySelector(".testimonial-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".testimonial-track");
  const slides = Array.from(carousel.querySelectorAll(".testimonial-slide"));
  const prevBtn = carousel.querySelector(".carousel-btn-prev");
  const nextBtn = carousel.querySelector(".carousel-btn-next");
  const dotsContainer = carousel.querySelector(".carousel-dots");

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  // Show 3 on desktop, 1 on mobile
  const getPerPage = () => (window.innerWidth >= 768 ? 3 : 1);

  // Build dots
  function buildDots() {
    if (!dotsContainer) return;
    const perPage = getPerPage();
    const totalPages = Math.ceil(slides.length / perPage);
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Go to page ${i + 1}`);
      dot.addEventListener("click", () => goToPage(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goToPage(pageIndex) {
    const perPage = getPerPage();
    const totalPages = Math.ceil(slides.length / perPage);
    currentIndex = Math.max(0, Math.min(pageIndex, totalPages - 1));

    // Use offsetWidth; fall back to container width / perPage if slide has no width yet
    const slideWidth = (slides[0] && slides[0].offsetWidth) ||
      (track.offsetWidth / perPage);
    track.style.transform = `translateX(-${currentIndex * perPage * slideWidth}px)`;

    // Update dots
    if (dotsContainer) {
      dotsContainer.querySelectorAll(".carousel-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }
  }

  function next() {
    const perPage = getPerPage();
    const totalPages = Math.ceil(slides.length / perPage);
    goToPage((currentIndex + 1) % totalPages);
  }

  function prev() {
    const perPage = getPerPage();
    const totalPages = Math.ceil(slides.length / perPage);
    goToPage((currentIndex - 1 + totalPages) % totalPages);
  }

  if (prevBtn) prevBtn.addEventListener("click", prev);
  if (nextBtn) nextBtn.addEventListener("click", next);

  // Auto-advance every 5s
  let autoPlay = setInterval(next, 5000);
  carousel.addEventListener("mouseenter", () => clearInterval(autoPlay));
  carousel.addEventListener("mouseleave", () => { autoPlay = setInterval(next, 5000); });

  // Rebuild on resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildDots();
      goToPage(0);
    }, 200);
  });

  buildDots();
  goToPage(0);
}

// ============================================
// INITIALIZE ON LOAD
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize EmailJS first
  if (typeof emailjs !== "undefined") {
    //public key: CJmUm5V-CcStcucLT
    emailjs.init("CJmUm5V-CcStcucLT");
  }

  // Setup feedback form
  const feedbackForm = document.getElementById("feedbackForm");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = e.target.querySelector(".submit-join-btn");
      const originalText = submitBtn.textContent;

      // Disable button and show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      // Get form data matching EmailJS template
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        businessName: document.getElementById("businessName").value,
        message: document.getElementById("message").value,
      };

      console.log("Sending form data:", formData);

      // Send email using EmailJS
      if (typeof emailjs !== "undefined") {
        emailjs.send("service_aj8jtuj", "template_y8locop", formData).then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);

            // Hide form and show success message
            document.getElementById("feedbackForm").style.display = "none";
            document.getElementById("feedbackSuccess").style.display = "block";

            // Scroll to success message
            document.getElementById("feedbackSuccess").scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          },
          function (error) {
            console.error("FAILED...", error);
            alert("Failed to send your information. Please try again later.");

            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          },
        );
      } else {
        console.error("EmailJS not loaded");
        alert("Email service not available. Please try again later.");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  setupScrollAnimations();
  animateCounters();
  updateTimeline();
  toggleScrollToTopBtn();
  setupTestimonialCarousel();
});

// Scroll event: only update timeline and scroll-to-top (not re-create observers)
window.addEventListener(
  "scroll",
  () => {
    updateTimeline();
    toggleScrollToTopBtn();
  },
  { passive: true },
);

window.addEventListener("resize", () => {
  updateTimeline();
});
