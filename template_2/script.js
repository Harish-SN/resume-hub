const $ = (q, c = document) => c.querySelector(q);
const $$ = (q, c = document) => c.querySelectorAll(q);

const words = ['AWS Developer', 'Full-Stack Developer'];
const tagEl = $('.tagline');
tagEl.innerHTML = '<span class="txt"></span><span class="cur">|</span>';
const txt = $('.txt', tagEl), cur = $('.cur', tagEl);
setInterval(() => cur.style.opacity = cur.style.opacity === '0' ? '1' : '0', 500);

let w = 0, i = 0, dir = 1;
(function typeLoop() {
    txt.textContent = words[w].slice(0, i);
    if (dir > 0 && i === words[w].length) { dir = -1; return setTimeout(typeLoop, 1400); }
    if (dir < 0 && i === 0) { dir = 1; w = (w + 1) % words.length; }
    i += dir; setTimeout(typeLoop, dir > 0 ? 80 : 40);
})();

const tgl = $('#theme-toggle');
const setTheme = d => { document.body.classList.toggle('dark', d); localStorage.theme = d ? 'dark' : 'light' };
setTheme(localStorage.theme === 'dark');
tgl.checked = document.body.classList.contains('dark');
tgl.onchange = e => setTheme(e.target.checked);

const holes = $$('.hole'),
    scoreEl = $('#hits'), missEl = $('#miss'),
    playBtn = $('#startBtn'), againBtn = $('#restartBtn'),
    overlay = $('#overlay'), bark = $('#bark');

let score, miss, last = -1, playing = false, timer;
const MISS_LIMIT = 3;

const DOG_VISIBLE = 750;
const BETWEEN_POP = 250;

const show = e => e.style.display = 'inline-block';
const hide = e => e.style.display = 'none';
const initButtons = () => { show(playBtn); hide(againBtn); };

function randHole() {
    let idx; do { idx = Math.floor(Math.random() * holes.length); } while (idx === last);
    return last = idx;
}

function popDog() {
    if (!playing) return;
    const hole = holes[randHole()];
    const img = document.createElement('img');
    img.src = 'dog.png'; img.className = 'dog up'; hole.appendChild(img);

    setTimeout(() => {
        img.classList.remove('up');
        setTimeout(() => img.remove(), 180);
    }, DOG_VISIBLE);

    timer = setTimeout(popDog, DOG_VISIBLE + BETWEEN_POP);
}

function HUD() { scoreEl.textContent = score; missEl.textContent = miss; }

holes.forEach(hole => hole.addEventListener('click', () => {
    if (!playing) return;
    if (hole.querySelector('.dog.up')) {
        score++; hole.classList.add('hit');
        setTimeout(() => hole.classList.remove('hit'), 180);
    } else { miss++; }
    HUD();
    if (miss >= MISS_LIMIT) endGame();
}));

function startGame() {
    score = miss = 0; playing = true; last = -1; HUD();
    hide(playBtn); hide(againBtn); overlay.classList.add('hide');
    clearTimeout(timer); popDog();
}

function endGame() {
    playing = false; clearTimeout(timer);
    show(againBtn); overlay.classList.remove('hide');
    bark.currentTime = 0; bark.play();
    const z = $('.zoomdog'); z.style.animation = 'none'; void z.offsetWidth;
    z.style.animation = 'zoomout 1.6s forwards';
    setTimeout(() => overlay.classList.add('hide'), 1600);
}

playBtn.onclick = startGame;
againBtn.onclick = startGame;
initButtons();