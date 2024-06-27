document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Dark mode toggle
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    body.classList.toggle("dark-mode", currentTheme === "dark");
    updateDarkModeToggle();
  }

  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem(
      "theme",
      body.classList.contains("dark-mode") ? "dark" : "light"
    );
    updateDarkModeToggle();
  });

  function updateDarkModeToggle() {
    darkModeToggle.textContent = body.classList.contains("dark-mode")
      ? "☀️"
      : "🌓";
  }

  // Lightbox functionality
  const lightbox = document.getElementById("lightbox");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxDescription = document.getElementById("lightbox-description");
  const lightboxTechnologies = document.getElementById("lightbox-technologies");
  const lightboxLink = document.getElementById("lightbox-link");
  const closeLightbox = document.querySelector(".close-lightbox");

  document.querySelectorAll(".project-item").forEach((item) => {
    item.addEventListener("click", function () {
      lightboxTitle.textContent = this.dataset.title;
      lightboxImage.src = this.dataset.image;
      lightboxDescription.textContent = this.dataset.description;
      lightboxTechnologies.textContent = `Technologies used: ${this.dataset.technologies}`;
      lightboxLink.href = this.dataset.link;
      lightbox.style.display = "block";
    });
  });

  closeLightbox.addEventListener("click", function () {
    lightbox.style.display = "none";
  });

  // Close lightbox when clicking outside the content
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  // Add animations to elements as they come into view
  const animateOnScroll = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(animateOnScroll, {
    root: null,
    threshold: 0.1,
  });

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  document.querySelectorAll(".project-item").forEach((item) => {
    item.classList.add("slide-in-left");
  });

  // Skill animation
  function animateSkills() {
    const skills = document.querySelectorAll(".skill-progress");
    skills.forEach((skill) => {
      skill.style.width = skill.parentElement.dataset.progress;
    });
  }

  // Use Intersection Observer to trigger the skill animation when the skills section is in view
  const skillsSection = document.getElementById("skills");
  const skillsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateSkills();
      skillsObserver.unobserve(skillsSection);
    }
  });

  skillsObserver.observe(skillsSection);

  //Email functionality
  var emailLink = document.getElementById("emailLink");
  if (emailLink) {
    emailLink.addEventListener("click", function (e) {
      e.preventDefault();
      var email = "romshaahlawat@gmail.com";
      var subject = "Contact from Portfolio";
      var emailBody = "Hi Romsha,";
      document.location =
        "mailto:" + email + "?subject=" + subject + "&body=" + emailBody;
    });
  }

  // Track CV downloads
  const downloadCvButton = document.querySelector(".download-cv");
  if (downloadCvButton) {
    downloadCvButton.addEventListener("click", function () {
      console.log("CV downloaded");
      // You can add analytics tracking here if desired
    });
  }
});
