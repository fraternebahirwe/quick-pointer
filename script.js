let score = 0;
let time = 30;
let gameInterval;
let moveTargetInterval;

const target = document.getElementById("target");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

function randomPosition() {
  const x = Math.random() * (window.innerWidth - 50);
  const y = Math.random() * (window.innerHeight - 200);
  target.style.left = x + "px";
  target.style.top = y + "px";
}

target.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
  randomPosition();
});

function startGame() {
  score = 0;
  time = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = time;

  target.style.display = "block";
  randomPosition();

  // Timer
  gameInterval = setInterval(() => {
    time--;
    timeDisplay.textContent = time;

    if (time <= 0) {
      clearInterval(gameInterval);
      clearInterval(moveTargetInterval);
      target.style.display = "none";
      alert("Game Over 🎯 Score: " + score);
    }
  }, 1000);

  // déplacement automatique de la cible
  moveTargetInterval = setInterval(randomPosition, 1000);
}