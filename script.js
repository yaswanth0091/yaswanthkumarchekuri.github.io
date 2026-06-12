const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();
const robotVideo = document.getElementById("robotVideo");
const robotSoundToggle = document.getElementById("robotSoundToggle");

if (robotVideo && robotSoundToggle) {
  robotSoundToggle.addEventListener("click", async () => {
    robotVideo.muted = !robotVideo.muted;

    if (!robotVideo.muted) {
      robotSoundToggle.textContent = "Sound Off";
      try {
        await robotVideo.play();
      } catch (error) {
        console.log("Video play was blocked by browser:", error);
      }
    } else {
      robotSoundToggle.textContent = "Sound On";
    }
  });
}
