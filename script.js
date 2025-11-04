function scrollToTech(){
  window.location.href = "technology.html";
}

window.addEventListener("scroll", () => {
  const members = document.querySelectorAll(".team-member");
  const triggerBottom = window.innerHeight * 0.85;

  members.forEach((member) => {
    const boxTop = member.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      member.classList.add("visible");
    }
  });
});
// Awareness Page Counter
window.addEventListener("DOMContentLoaded", () => {
  const counter = document.getElementById("water-saved");
  if (counter) {
    let count = 0;
    const target = 50000; // liters saved
    const increment = Math.ceil(target / 200);

    const updateCounter = () => {
      if (count < target) {
        count += increment;
        counter.textContent = count.toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    updateCounter();
  }
});
// Contact Form Popup Animation
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
    setTimeout(() => { popup.style.display = 'none'; }, 3000);
    form.reset();
  });
}
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}

