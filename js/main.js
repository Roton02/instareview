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

// Hero depth parallax (lightweight)
const heroSection = document.getElementById("hero");
if (heroSection) {
  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    heroSection.style.setProperty("--hero-mx", `${x * 18}px`);
    heroSection.style.setProperty("--hero-my", `${y * 14}px`);
  });

  heroSection.addEventListener("mouseleave", () => {
    heroSection.style.setProperty("--hero-mx", "0px");
    heroSection.style.setProperty("--hero-my", "0px");
  });
}

// ============================================
// VIDEO MODAL
// ============================================
function playHeroVideo(scrollToPlayer = false) {
  const mediaWindow = document.querySelector(".hero-media-window");
  const heroVideo = document.getElementById("heroInlineVideo");

  if (!mediaWindow || !heroVideo) return;

  mediaWindow.classList.add("is-playing");

  if (scrollToPlayer) {
    mediaWindow.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  heroVideo.currentTime = 0;
  heroVideo.play().catch(() => {
    // Playback may require user gesture in some browsers.
  });
}

function resetHeroVideo(rewind = true) {
  const mediaWindow = document.querySelector(".hero-media-window");
  const heroVideo = document.getElementById("heroInlineVideo");

  if (!mediaWindow || !heroVideo) return;

  mediaWindow.classList.remove("is-playing");
  heroVideo.pause();

  if (rewind) {
    heroVideo.currentTime = 0;
  }
}

const heroInlineVideo = document.getElementById("heroInlineVideo");
if (heroInlineVideo) {
  heroInlineVideo.addEventListener("ended", () => {
    resetHeroVideo();
  });
}

function openVideoModal() {
  document.getElementById("videoModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeVideoModal() {
  document.getElementById("videoModal").classList.remove("open");
  document.body.style.overflow = "auto";
  const marketingVideo = document.getElementById("marketingVideo");
  if (marketingVideo) {
    marketingVideo.pause();
    marketingVideo.currentTime = 0;
  }
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
// TESTIMONIALS MARQUEE/AUTO-SCROLL
// ============================================
// Pure CSS animation with pause on hover
// No JavaScript required - handled via CSS animations

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
let activeStepIndex = -1;
let lastScrollPosition = window.scrollY;
let timelineIndicatorCurrentY = null;
let timelineIndicatorTargetY = 40;
let timelineIndicatorRaf = null;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function animateTimelineIndicator(timeline) {
  if (!timeline) {
    timelineIndicatorRaf = null;
    return;
  }

  if (timelineIndicatorCurrentY === null) {
    timelineIndicatorCurrentY = timelineIndicatorTargetY;
  }

  const delta = timelineIndicatorTargetY - timelineIndicatorCurrentY;
  timelineIndicatorCurrentY += delta * 0.14;

  if (Math.abs(delta) < 0.2) {
    timelineIndicatorCurrentY = timelineIndicatorTargetY;
  }

  timeline.style.setProperty(
    "--timeline-indicator-y",
    `${timelineIndicatorCurrentY}px`,
  );

  if (Math.abs(timelineIndicatorTargetY - timelineIndicatorCurrentY) > 0.2) {
    timelineIndicatorRaf = requestAnimationFrame(() =>
      animateTimelineIndicator(timeline),
    );
  } else {
    timelineIndicatorRaf = null;
  }
}

function setTimelineIndicatorTarget(timeline, targetY) {
  timelineIndicatorTargetY = targetY;

  if (timelineIndicatorRaf === null) {
    timelineIndicatorRaf = requestAnimationFrame(() =>
      animateTimelineIndicator(timeline),
    );
  }
}

function updateTimeline() {
  const timeline = document.querySelector("#how-it-works .steps-timeline");
  if (!timeline) return;

  const stepItems = Array.from(timeline.querySelectorAll(".step-item"));
  const stepBadges = Array.from(timeline.querySelectorAll(".step-badge"));
  const timelineDots = Array.from(timeline.querySelectorAll(".timeline-dot"));
  const indicator = timeline.querySelector(".timeline-scroll-indicator");

  if (!stepItems.length || !stepBadges.length || !indicator) return;

  const timelineRect = timeline.getBoundingClientRect();
  const timelineVisible =
    timelineRect.bottom > 0 && timelineRect.top < window.innerHeight;
  indicator.classList.toggle("is-visible", timelineVisible);

  const scrollingDown = window.scrollY > lastScrollPosition + 2;
  const scrollingUp = window.scrollY < lastScrollPosition - 2;
  const direction = scrollingDown ? "down" : scrollingUp ? "up" : null;

  if (direction) {
    indicator.dataset.direction = direction;
  }

  if (!timelineVisible) {
    lastScrollPosition = window.scrollY;
    return;
  }

  const viewportAnchor = window.innerHeight * 0.47;
  const badgeCenters = stepBadges.map((badge) => {
    const badgeRect = badge.getBoundingClientRect();
    return badgeRect.top - timelineRect.top + badgeRect.height / 2;
  });

  const firstCenter = badgeCenters[0];
  const lastCenter = badgeCenters[badgeCenters.length - 1];
  const anchorInTimeline = viewportAnchor - timelineRect.top;
  const smoothCenterY = clamp(anchorInTimeline, firstCenter, lastCenter);
  const indicatorHalf = 16;
  setTimelineIndicatorTarget(timeline, smoothCenterY - indicatorHalf);

  let closestDistance = Infinity;
  let resolvedActiveIndex = 0;

  badgeCenters.forEach((centerY, index) => {
    const distance = Math.abs(smoothCenterY - centerY);

    if (distance < closestDistance) {
      closestDistance = distance;
      resolvedActiveIndex = index;
    }
  });

  activeStepIndex = resolvedActiveIndex;

  stepItems.forEach((step, index) => {
    step.classList.toggle("is-current", index === activeStepIndex);
  });

  stepBadges.forEach((badge, index) => {
    badge.classList.toggle("is-current", index === activeStepIndex);
  });

  timelineDots.forEach((dot, index) => {
    dot.classList.toggle("is-current", index === activeStepIndex);
  });

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
    updateTimeline();
    toggleScrollToTopBtn();
  },
  { passive: true },
);

window.addEventListener("resize", () => {
  updateTimeline();
});
