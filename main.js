const naam = "mellie";
const herinnering = "die ene avond dat we niet konden stoppen met lachen";
const dateIdee = "Wijn, rozen, en jij hier bij mij in Istanbul";

const nameEl = document.getElementById("name");
const msgEl = document.getElementById("msg");
const buttonsEl = document.getElementById("buttons");
const galleryEl = document.getElementById("gallery");
const loveTextEl = document.getElementById("loveText");
const hintEl = document.getElementById("hint");

const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");

nameEl.textContent = naam;

let noCount = 0;

function moveNoButton() {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 140 - 70;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

function shakeCard() {
  const card = document.querySelector(".card");
  card.animate(
    [
      { transform: "translateX(0px)" },
      { transform: "translateX(-6px)" },
      { transform: "translateX(6px)" },
      { transform: "translateX(-4px)" },
      { transform: "translateX(4px)" },
      { transform: "translateX(0px)" }
    ],
    { duration: 300 }
  );
}

function handleNoPress(e) {
  if (e) e.preventDefault();
  noCount++;

  if (noCount === 1) {
    hintEl.textContent = "euhm? ";
    moveNoButton();
    shakeCard();
  } else if (noCount === 2) {
    hintEl.textContent = "Hallooohoooo";
    moveNoButton();
    yesBtn.style.transform = "scale(1.08)";
  } else if (noCount === 3) {
    hintEl.textContent = "Ik maak het je makkelijk";
    moveNoButton();
    yesBtn.textContent = "Duuuuuuuhhh";
  } else if (noCount === 4) {
    hintEl.textContent = "oke klaar nu, ik geef je geen andere optie";
    noBtn.style.display = "none";
    yesBtn.style.width = "100%";
    yesBtn.style.transform = "scale(1.02)";
  } else {
    hintEl.textContent = "hihi, geen keus";
    moveNoButton();
  }
}

noBtn.addEventListener("click", handleNoPress);
noBtn.addEventListener("touchstart", handleNoPress, { passive: false });
noBtn.addEventListener("mouseenter", () => { if (noCount < 4) moveNoButton(); });

yesBtn.addEventListener("click", () => {
  buttonsEl.style.display = "none";
  galleryEl.style.display = "grid";

  msgEl.innerHTML = "Ik kies jou. Altijd.";

  loveTextEl.innerHTML = `
    Ik mis je echt heel erg.<br><br>
    Mijn favoriete herinnering met jou:<br>
    <b>${herinnering}</b><br><br>
    ${dateIdee}<br><br>
    Wil je mijn valentijn zijn? 💘
  `;

  hintEl.textContent = "";
});
