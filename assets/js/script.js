// Activar música al tocar pantalla
const intro = document.getElementById("intro");
//const music = document.getElementById("bg-music");

intro.addEventListener("click", () => {
    music.play();
    intro.style.display = "none";
});

// Carrusel automático
const images = document.querySelectorAll(".carousel img");
let current = 0;

setInterval(() => {
    images[current].classList.remove("active");
    current = (current + 1) % images.length;
    images[current].classList.add("active");
}, 3000);

const textElement = document.querySelector(".typing-text");
const originalText = textElement.innerHTML;
textElement.innerHTML = "";

let i = 0;
let started = false;

function typeWriter() {
    if (i < originalText.length) {
        textElement.innerHTML += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 55); // más lento (romántico)
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
            started = true;
            typeWriter();
        }
    });
}, { threshold: 0.5 });

observer.observe(textElement);

const music = document.getElementById("bg-music");
const modal = document.getElementById("videoModal");
const video = document.getElementById("loveVideo");

/* 🎵 Fade Out */
function fadeOutMusic(duration = 800) {
    let volume = music.volume;
    const step = volume / (duration / 50);

    const fade = setInterval(() => {
        volume -= step;
        if (volume <= 0) {
            music.volume = 0;
            music.pause();
            clearInterval(fade);
        } else {
            music.volume = volume;
        }
    }, 50);
}

/* 🎵 Fade In */
function fadeInMusic(duration = 800) {
    music.volume = 0;
    music.play();

    let volume = 0;
    const step = 1 / (duration / 50);

    const fade = setInterval(() => {
        volume += step;
        if (volume >= 1) {
            music.volume = 1;
            clearInterval(fade);
        } else {
            music.volume = volume;
        }
    }, 50);
}

/* 🎬 Abrir video */
function openVideo() {
    modal.style.display = "flex";
    fadeOutMusic(800);
    video.play();
}

/* ❌ Cerrar video */
function closeVideo() {
    video.pause();
    video.currentTime = 0;
    modal.style.display = "none";
    fadeInMusic(800);
}

const symbols = ["♡", "✧", "✦", "❀", "∞"];
const container = document.querySelector(".floating-container");

function createSymbol() {
    const symbol = document.createElement("span");
    symbol.classList.add("floating-symbol");
    symbol.innerText = symbols[Math.floor(Math.random() * symbols.length)];

    symbol.style.left = Math.random() * 100 + "vw";
    symbol.style.fontSize = (14 + Math.random() * 14) + "px";
    symbol.style.animationDuration = (6 + Math.random() * 6) + "s";
    symbol.style.opacity = 0.4 + Math.random() * 0.6;

    container.appendChild(symbol);

    setTimeout(() => {
        symbol.remove();
    }, 12000);
}

setInterval(createSymbol, 600);