$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// Navbar scroll handler - toggle transparent/solid background
document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('mainNav');

  if (navbar) {
    // Check scroll position and update navbar
    function updateNavbar() {
      if (window.scrollY > 100) {
        navbar.classList.add('navbar-shrink');
      } else {
        navbar.classList.remove('navbar-shrink');
      }
    }

    // Run on scroll
    window.addEventListener('scroll', updateNavbar);

    // Run on page load (in case page loads scrolled)
    updateNavbar();
  }
})

// Intersection Observer for scroll section fade-in animations
document.addEventListener('DOMContentLoaded', function () {
  const scrollSections = document.querySelectorAll('.scroll-section');

  if (scrollSections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    scrollSections.forEach(function (section) {
      observer.observe(section);
    });
  }
});
