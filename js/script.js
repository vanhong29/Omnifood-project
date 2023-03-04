const btnLearn = document.querySelector(".btn--outline");
const btnEatingWell = document.querySelectorAll(".btn--full");
const navList = document.querySelector(".main-nav-list");

// Set current year
const yearEl = document.querySelector(".year");
yearEl.textContent = new Date().getFullYear();

// Menu bar mobile
const btnNav = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
btnNav.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// Smooth scrolling for button in general
const sectionHow = document.querySelector(".section-how");
const sectionCta = document.querySelector(".section-cta");

const smoothScroll = function (btn, section) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    section.scrollIntoView({ behavior: "smooth" });
  });
};
smoothScroll(btnLearn, sectionHow);
btnEatingWell.forEach((btn) => smoothScroll(btn, sectionCta));

// Smooth scrolling for navigation link
navList.addEventListener("click", function (e) {
  e.preventDefault();
  const links = this.querySelectorAll(".main-nav-link");
  const sections = [...document.querySelectorAll("section")].slice(2);
  const curLink = e.target;
  if (!curLink.classList.contains("main-nav-link")) return;
  const index = [...links].findIndex((link) => link === curLink);
  headerEl.classList.toggle("nav-open");
  sections[index].scrollIntoView({ behavior: "smooth" });
});

// STICKY NAVIGATION
const sectionHero = document.querySelector(".section-hero");
const observer = new IntersectionObserver(
  function (entries) {
    const entry = entries[0];
    if (!entry.isIntersecting) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    // in the viewport
    root: null,
    // 0% of sectionHero in
    threshold: 0,
    rootMargin: "-80px",
  }
);
observer.observe(sectionHero);

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
