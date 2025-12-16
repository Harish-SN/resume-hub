const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(mode) {
    if (mode === 'dark') {
        body.classList.add('dark');
        toggleBtn.textContent = '☀️';
    } else {
        body.classList.remove('dark');
        toggleBtn.textContent = '🌙';
    }
    localStorage.setItem('theme', mode);
    toggleBtn.classList.add('animate-toggle');
    setTimeout(() => toggleBtn.classList.remove('animate-toggle'), 300);
}

toggleBtn.addEventListener('click', () => {
    const current = body.classList.contains('dark') ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');

    toggleBtn.classList.add('bounce');
    setTimeout(() => toggleBtn.classList.remove('bounce'), 400);
});

const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme || 'light');

const phrases = ["Hi, I'm Harish.", "AWS Cloud Specialist.", "IoT & Backend Developer."];
const typedText = document.getElementById('typed-text');
let i = 0;
let j = 0;
let isDeleting = false;

function typeEffect() {
    typedText.textContent = phrases[i].substring(0, j);
    typedText.classList.add('typing');

    if (!isDeleting && j < phrases[i].length) {
        j++;
        setTimeout(typeEffect, 100);
    } else if (isDeleting && j > 0) {
        j--;
        setTimeout(typeEffect, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) i = (i + 1) % phrases.length;
        setTimeout(typeEffect, 1000);
    }
}

typeEffect();

const sections = document.querySelectorAll('section');

function revealSections() {
    const triggerBottom = window.innerHeight * 0.85;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
}

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);