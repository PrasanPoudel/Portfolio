const preLoaderContainer = document.querySelector(".preLoader-container");
window.addEventListener("scroll", function () {
  preLoaderContainer.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    preLoaderContainer.style.display = "none";
  }, 3500);
});

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ===== HAMBURGER MENU TOGGLE =====
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // ===== DARK/LIGHT MODE TOGGLE =====
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;

  // Check for saved theme preference or use default
  const currentTheme = localStorage.getItem("theme") || "light-mode";
  body.classList.add(currentTheme);

  // If dark mode is active, update classes
  if (currentTheme === "dark-mode") {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
  }

  themeToggle.addEventListener("click", function () {
    // Toggle dark/light mode
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      localStorage.setItem("theme", "light-mode");
    } else {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark-mode");
    }
  });

  // ===== BACK TO TOP BUTTON =====
  const backToTopButton = document.getElementById("back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ===== SCROLL ANIMATIONS =====
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Elements to animate
  const animateElements = [
    ...document.querySelectorAll(".about-image"),
    ...document.querySelectorAll(".about-text"),
    ...document.querySelectorAll(".skill-category"),
    ...document.querySelectorAll(".project-card"),
    ...document.querySelectorAll(".contact-info"),
    ...document.querySelectorAll(".contact-form-container"),
  ];

  // Check if elements are in viewport and add animation
  function checkAnimations() {
    animateElements.forEach((element) => {
      if (isInViewport(element) && !element.classList.contains("animate")) {
        element.classList.add("animate");
      }
    });
  }

  // Run on scroll and initial page load
  window.addEventListener("scroll", checkAnimations);
  window.addEventListener("resize", checkAnimations);
  checkAnimations(); // Run on initial load

  // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // ===== CONTACT FORM SUBMISSION =====
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      // Here you would typically send the form data to a server
      // For demonstration, we'll just show a success message

      // Create a success message
      const successMessage = document.createElement("div");
      successMessage.classList.add("form-success");
      successMessage.innerHTML = `
                <div style="text-align: center; padding: 2rem; background-color: var(--card-bg-color); border-radius: var(--border-radius-md); box-shadow: 0 5px 15px var(--shadow-color);">
                    <i class="fas fa-check-circle" style="color: var(--primary-color); font-size: 4rem; margin-bottom: 1.5rem;"></i>
                    <h3 style="margin-bottom: 1rem;">Message Sent!</h3>
                    <p>Thanks for reaching out, ${formData.name}! I'll get back to you as soon as possible.</p>
                </div>
            `;

      // Replace the form with the success message
      contactForm.style.display = "none";
      contactForm.parentNode.appendChild(successMessage);

      // Reset the form (in case user navigates back)
      contactForm.reset();

      // Clear the success message after 5 seconds and show the form again
      setTimeout(() => {
        if (successMessage.parentNode) {
          successMessage.parentNode.removeChild(successMessage);
          contactForm.style.display = "block";
        }
      }, 5000);
    });
  }

  // ===== SKILL CARD HOVER EFFECT =====
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "0 15px 30px var(--shadow-color)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 5px 20px var(--shadow-color)";
    });
  });
});

const dynamicText = document.querySelector(".typewriter");
const words = ["MERN Stack Developer", "Web Developer", "Daily Learner"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
  const currentWord = words[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);
  dynamicText.textContent = currentChar;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 200);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 100);
  } else {
    isDeleting = !isDeleting;
    wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
    setTimeout(typeEffect, 1200);
  }
};

typeEffect();
