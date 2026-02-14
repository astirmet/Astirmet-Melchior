const terminal = document.getElementById("terminal");
const heartBtn = document.getElementById("heartBtn");

// tekst
const introLines = [
  { text: "", cls: "line" },
  { text: "Hi Mellie,", cls: "line" },
  { text: "", cls: "line" },
  { text: "Ik zit nu in Istanbul.", cls: "comment" },
  { text: "En ik mis je suuuuuper veel.", cls: "comment" },
  { text: "", cls: "line" },
  { text: "Ik kan niet wachten tot je hier bent en om je weer te zien.", cls: "comment" },
  { text: "", cls: "line" },
  { text: "Om toch nog een beetje mee te doen aan valentijnsdag op afstand...", cls: "comment" },
  { text: "", cls: "line" },
  { text: "Al haat ik coderen met al MIJN HART voor jou doe ik het met liefde", cls: "comment" },
  { text: "", cls: "line" },
  { text: "wanneer ik je weer ga zien:", cls: "comment" },
];

const cursor = document.createElement("span");
cursor.className = "cursor";
cursor.textContent = "▌";

let lineIndex = 0;
let charIndex = 0;
let currentSpan = null;
let countdownStarted = false;

function ensureSpan(cls) {
  currentSpan = document.createElement("span");
  currentSpan.className = cls || "line";
  terminal.appendChild(currentSpan);
}

function newLine() {
  terminal.appendChild(document.createTextNode("\n"));
  terminal.scrollTop = terminal.scrollHeight;
}

function typeNextChar() {
  if (lineIndex >= introLines.length) {
    terminal.appendChild(cursor);

    if (!countdownStarted) {
      countdownStarted = true;
      startCountdown();
    }

    heartBtn.classList.remove("hidden");
    return;
  }

  const line = introLines[lineIndex];

  if (charIndex === 0) ensureSpan(line.cls);

  const text = line.text;

  if (charIndex >= text.length) {
    charIndex = 0;
    lineIndex++;
    newLine();
    setTimeout(typeNextChar, 400);
    return;
  }

  currentSpan.textContent += text[charIndex];
  charIndex++;

  terminal.appendChild(cursor);
  terminal.scrollTop = terminal.scrollHeight;

  const ch = text[charIndex - 1];
  const delay =

    ch === "." ? 650 :
    ch === "," ? 350 :
    ch === " " ? 110 : 70;

    //yalla yalla
    // ch === "." ? .1 :
    // ch === "," ? .1 :
    // ch === " " ? .1 : .1;

  setTimeout(typeNextChar, delay);
}

typeNextChar();

function startCountdown() {
  const EndDate = "2026-02-19T18:00:00";

  terminal.appendChild(document.createTextNode("\n"));
  const countdownEl = document.createElement("span");
  countdownEl.className = "countdown-text";
  terminal.appendChild(countdownEl);

  const target = new Date(EndDate);

  function update() {
    const now = new Date();
    let diff = target - now;

    if (diff <= 0) {
      countdownEl.textContent = ".";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);

    const seconds = Math.floor(diff / 1000);

    const dd = String(days).padStart(2, "0");
    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");

    countdownEl.textContent = `Nog ${dd} dagen ${hh} uur ${mm} min ${ss} sec`;
  }

  update();
  setInterval(update, 1000);
}

heartBtn.addEventListener("click", () => {
  window.location.href = "valentijn.html";
});

