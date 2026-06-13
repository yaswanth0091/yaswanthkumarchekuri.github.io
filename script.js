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

// Robot video: play only when hero section is visible
const robotVideo = document.getElementById('robotVideo');
const robotSoundToggle = document.getElementById('robotSoundToggle');
const robotScene = document.querySelector('.hero-robot-scene');

if (robotVideo && robotScene) {
  robotVideo.muted = true;
  robotVideo.playsInline = true;

  const playRobot = async () => {
    try {
      await robotVideo.play();
    } catch (error) {
      // Mobile browsers may block autoplay in low power/data saver mode.
    }
  };

  const pauseRobot = () => {
    robotVideo.pause();
    robotVideo.muted = true;

    if (robotSoundToggle) {
      robotSoundToggle.textContent = 'Sound On';
    }
  };

  const robotObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        playRobot();
      } else {
        pauseRobot();
      }
    });
  }, {
    threshold: 0.45
  });

  robotObserver.observe(robotScene);

  if (robotSoundToggle) {
    robotSoundToggle.addEventListener('click', async () => {
      robotVideo.muted = !robotVideo.muted;
      robotSoundToggle.textContent = robotVideo.muted ? 'Sound On' : 'Sound Off';

      if (!robotVideo.paused) {
        try {
          await robotVideo.play();
        } catch (error) {
          console.log('Video play blocked:', error);
        }
      }
    });
  }
}
