const screens = [...document.querySelectorAll(".screen")];

let current = 0;
let selectedFood = [];

const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const dateError = document.getElementById("dateError");

function showScreen(index) {
  screens[current].classList.remove("active");
  current = index;
  screens[current].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function hearts(amount = 18) {
  const box = document.getElementById("hearts");
  for (let i = 0; i < amount; i++) {
    const h = document.createElement("div");
    h.className = "floating-heart";
    h.textContent = Math.random() > .35 ? "♥" : "♡";
    h.style.left = Math.random() * 100 + "%";
    h.style.fontSize = (14 + Math.random() * 22) + "px";
    h.style.animationDelay = (Math.random() * .8) + "s";
    h.style.animationDuration = (2.3 + Math.random() * 1.8) + "s";
    box.appendChild(h);
    setTimeout(() => h.remove(), 5000);
  }
}

document.getElementById("startPhoto").addEventListener("click", () => {
  showScreen(1);
});

const noBtn = document.getElementById("no1");
let noMoves = 0;

function moveNoButton() {
  noMoves++;
  const card = document.querySelector(".question-card");
  const maxX = Math.max(0, card.clientWidth - 180);
  const maxY = Math.max(0, card.clientHeight - 110);

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.right = "auto";
  noBtn.style.top = Math.random() * maxY + "px";
  noBtn.style.bottom = "auto";
  noBtn.style.transform = `rotate(${(-8 + Math.random() * 16)}deg)`;

  if (noMoves >= 4) {
    noBtn.style.transform += " scale(.8)";
  }
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

document.getElementById("yes1").addEventListener("click", () => {
  hearts(22);
  showScreen(2);
});

document.getElementById("yes2").addEventListener("click", () => {
  hearts(30);
  showScreen(3);
});

function setMinDate() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString().split("T")[0];
  dateInput.min = local;
}
setMinDate();

document.getElementById("dateNext").addEventListener("click", () => {
  if (!dateInput.value || !timeInput.value) {
    dateError.textContent = "Выбери и дату, и время — я же должен знать, когда за тобой ехать ❤️";
    return;
  }

  dateError.textContent = "";
  showScreen(4);
});

document.querySelectorAll(".choice").forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.choice;

    if (selectedFood.includes(value)) {
      selectedFood = selectedFood.filter(x => x !== value);
      btn.classList.remove("selected");
    } else {
      selectedFood.push(value);
      btn.classList.add("selected");
    }
  });
});

document.getElementById("foodNext").addEventListener("click", () => {
  const d = new Date(dateInput.value + "T" + timeInput.value);

  const dateText = d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  document.getElementById("finalDate").textContent = dateText;
  document.getElementById("finalTime").textContent = timeInput.value;
  document.getElementById("finalFood").textContent =
    selectedFood.length ? selectedFood.join(", ") : "Сюрприз для тебя 😉";

  hearts(45);
  showScreen(5);
});

document.getElementById("restart").addEventListener("click", () => {
  selectedFood = [];
  document.querySelectorAll(".choice").forEach(x => x.classList.remove("selected"));
  dateInput.value = "";
  timeInput.value = "";
  noMoves = 0;
  noBtn.removeAttribute("style");
  showScreen(0);
});
