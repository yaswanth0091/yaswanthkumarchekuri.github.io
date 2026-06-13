// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks?.classList.remove('open'));
});

// Reveal animations
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.14 });

  revealElements.forEach(el => observer.observe(el));
} else {
  revealElements.forEach(el => el.classList.add('visible'));
}

// Year
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Robot video autoplay + sound toggle
const robotVideo = document.getElementById('robotVideo');
const robotSoundToggle = document.getElementById('robotSoundToggle');

if (robotVideo) {
  robotVideo.muted = true;
  robotVideo.playsInline = true;

  const tryPlayRobot = () => {
    const playPromise = robotVideo.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Mobile browser may block autoplay in low power/data saver mode.
      });
    }
  };

  window.addEventListener('load', tryPlayRobot);
  document.addEventListener('DOMContentLoaded', tryPlayRobot);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) tryPlayRobot();
  });

  if (robotSoundToggle) {
    robotSoundToggle.addEventListener('click', async () => {
      robotVideo.muted = !robotVideo.muted;
      robotSoundToggle.textContent = robotVideo.muted ? 'Sound On' : 'Sound Off';

      try {
        await robotVideo.play();
      } catch (error) {
        console.log('Video play blocked:', error);
      }
    });
  }
}
