// Navbar scroll effect (works on all pages)
document.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav");
  if (window.scrollY > 100) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// Fade-in animations (works on all pages with .fade-in elements)
const fades = document.querySelectorAll(".fade-in");
if (fades.length > 0) {
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  fades.forEach(fade => obs.observe(fade));
}

// Scroll down arrow (only on research page)
const scrollDown = document.querySelector(".scroll-down span");
if (scrollDown) {
  scrollDown.addEventListener("click", () => {
    const target = document.querySelector("#working-papers");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
}