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

// Robot video: play only in hero section, try sound ON by default
const robotVideo = document.getElementById('robotVideo');
const robotSoundToggle = document.getElementById('robotSoundToggle');
const robotScene = document.querySelector('.hero-robot-scene');

if (robotVideo && robotScene) {
  let userWantsSound = true;

  robotVideo.playsInline = true;

  const updateSoundButton = () => {
    if (robotSoundToggle) {
      robotSoundToggle.textContent = robotVideo.muted ? 'Sound On' : 'Sound Off';
    }
  };

  const playRobot = async () => {
    robotVideo.muted = !userWantsSound;
    updateSoundButton();

    try {
      await robotVideo.play();
    } catch (error) {
      // If browser blocks autoplay with sound, fall back to muted autoplay
      robotVideo.muted = true;
      updateSoundButton();

      try {
        await robotVideo.play();
      } catch (mutedError) {
        // Some mobile browsers may still block autoplay in low power/data saver mode
      }
    }
  };

  const pauseRobot = () => {
    robotVideo.pause();
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
      userWantsSound = robotVideo.muted;

      robotVideo.muted = !userWantsSound;
      updateSoundButton();

      try {
        await robotVideo.play();
      } catch (error) {
        console.log('Video play blocked:', error);
      }
    });
  }
}
// Scroll-controlled background video
const scrollBgVideo = document.getElementById('scrollBgVideo');

if (scrollBgVideo) {
  scrollBgVideo.pause();
  scrollBgVideo.currentTime = 0;

  let ticking = false;

  const updateScrollBackgroundVideo = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

    if (scrollBgVideo.duration) {
      scrollBgVideo.currentTime = scrollProgress * scrollBgVideo.duration;
    }

    ticking = false;
  };

  const requestScrollVideoUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollBackgroundVideo);
      ticking = true;
    }
  };

  scrollBgVideo.addEventListener('loadedmetadata', updateScrollBackgroundVideo);
  window.addEventListener('scroll', requestScrollVideoUpdate, { passive: true });
  window.addEventListener('resize', requestScrollVideoUpdate);
}
