
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

function animateSkills() {
    const skills = document.querySelectorAll('.skill-bar');
    skills.forEach(skill => {
        const percent = skill.getAttribute('data-percent');
        const fill = skill.querySelector('.skill-fill');
        const label = skill.querySelector('.percent-label');
        let width = 0;
        let id = null;

        function frame() {
            if (width >= percent) {
                clearInterval(id);
            } else {
                width++;
                fill.style.width = width + '%';
                label.textContent = width + '%';
            }
        }

        const skillTop = skill.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (skillTop < windowHeight) {
            if (!fill.style.width || fill.style.width === '0%') {
                id = setInterval(frame, 15);
            }
        }
    });
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = toggleBtn.querySelector('i');

function setTheme(mode) {
    if (mode === 'dark') {
        body.classList.add('dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        body.classList.remove('dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    localStorage.setItem('theme', mode);
}

toggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
});

const typedTextEl = document.querySelector('.typed-text');
const textToType = ['AWS Developer', 'Full Stack Developer', 'IoT Enthusiast', 'Open Source Contributor'];
let charIndex = 0;
let textIndex = 0;
let typingSpeed = 100;
let deletingSpeed = 50;
let delayBetweenTexts = 2000;

function type() {
    if (charIndex < textToType[textIndex].length) {
        typedTextEl.textContent += textToType[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(deleteText, delayBetweenTexts);
    }
}

function deleteText() {
    if (charIndex > 0) {
        typedTextEl.textContent = textToType[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteText, deletingSpeed);
    } else {
        textIndex = (textIndex + 1) % textToType.length;
        setTimeout(type, typingSpeed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typedTextEl) {
        type();
    }
});