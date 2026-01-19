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
// SCROLL-TRIGGERED ANIMATIONS
// ============================================
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.classList.add("visible");
        entry.target.dataset.animated = "true";
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
// TIMELINE ANIMATION
// ============================================
function updateTimeline() {
  const stepsWrapper = document.querySelector(".steps-wrapper");
  if (!stepsWrapper) return;

  const timelineProgress = document.getElementById("timelineProgress");
  const stepIndicators = document.querySelectorAll(".step-number-indicator");
  const steps = document.querySelectorAll(".step-item");

  const containerTop = stepsWrapper.offsetTop;
  const containerHeight = stepsWrapper.offsetHeight;
  const scrollPosition = window.scrollY + window.innerHeight / 2;

  // Calculate progress percentage
  const progress = Math.max(
    0,
    Math.min(100, ((scrollPosition - containerTop) / containerHeight) * 100),
  );

  if (timelineProgress) {
    timelineProgress.style.height = progress + "%";
  }

  // Activate step indicators based on scroll position
  steps.forEach((step, index) => {
    const stepTop = step.offsetTop + containerTop;
    const stepMiddle = stepTop + step.offsetHeight / 2;
    const indicator = stepIndicators[index];

    if (scrollPosition >= stepMiddle) {
      indicator?.classList.add("active");
    } else {
      indicator?.classList.remove("active");
    }
  });
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
});

// Reinitialize on scroll for lazy loading
window.addEventListener(
  "scroll",
  () => {
    setupScrollAnimations();
    updateTimeline();
    toggleScrollToTopBtn();
  },
  { once: false },
);
