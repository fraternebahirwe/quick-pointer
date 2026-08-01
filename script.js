// ===============================
// CONFIGURATION
// ===============================

const GAME = {
    duration: 30,
    initialSpeed: 1000,
    speedLevels: {
        20: 800,
        10: 600,
        5: 400
    }
};

// ===============================
// GAME STATE
// ===============================

const state = {
    score: 0,
    time: GAME.duration,
    highScore: Number(localStorage.getItem("highScore")) || 0,
    running: false,
    gameTimer: null,
    moveTimer: null
};

// ===============================
// DOM ELEMENTS
// ===============================

const elements = {
    gameArea: document.getElementById("gameArea"),
    target: document.getElementById("target"),
    score: document.getElementById("score"),
    timer: document.getElementById("time"),
    highScore: document.getElementById("highScore"),
    message: document.getElementById("message"),
    startButton: document.getElementById("startBtn")
};

// ===============================
// INITIALIZE
// ===============================

elements.highScore.textContent = state.highScore;

// ===============================
// UI
// ===============================

function updateHUD() {
    elements.score.textContent = state.score;
    elements.timer.textContent = state.time;
}

function showMessage(text) {
    elements.message.innerHTML = text;
}

// ===============================
// TARGET
// ===============================

function moveTarget() {

    const maxX =
        elements.gameArea.clientWidth -
        elements.target.offsetWidth;

    const maxY =
        elements.gameArea.clientHeight -
        elements.target.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    elements.target.style.left = `${x}px`;
    elements.target.style.top = `${y}px`;
}

// ===============================
// SCORE
// ===============================

function increaseScore() {

    state.score++;

    updateHUD();

    moveTarget();

    elements.target.animate(
        [
            { transform: "scale(1)" },
            { transform: "scale(1.3)" },
            { transform: "scale(1)" }
        ],
        {
            duration: 150
        }
    );
}

// ===============================
// DIFFICULTY
// ===============================

function updateDifficulty() {

    const speed = GAME.speedLevels[state.time];

    if (!speed) return;

    clearInterval(state.moveTimer);

    state.moveTimer =
        setInterval(moveTarget, speed);
}

// ===============================
// TIMER
// ===============================

function tick() {

    state.time--;

    updateHUD();

    updateDifficulty();

    if (state.time <= 0) {
        endGame();
    }
}

// ===============================
// GAME
// ===============================

function startGame() {

    if (state.running) return;

    state.running = true;

    state.score = 0;
    state.time = GAME.duration;

    updateHUD();

    showMessage("");

    elements.target.style.display = "block";

    elements.startButton.disabled = true;

    moveTarget();

    state.gameTimer =
        setInterval(tick, 1000);

    state.moveTimer =
        setInterval(moveTarget, GAME.initialSpeed);
}

function endGame() {

    state.running = false;

    clearInterval(state.gameTimer);
    clearInterval(state.moveTimer);

    elements.target.style.display = "none";

    if (state.score > state.highScore) {

        state.highScore = state.score;

        localStorage.setItem(
            "highScore",
            state.highScore
        );

        elements.highScore.textContent =
            state.highScore;
    }

    showMessage(`
        🎯 Game Over<br>
        Score: <strong>${state.score}</strong><br>
        High Score: <strong>${state.highScore}</strong>
    `);

    elements.startButton.disabled = false;
}

// ===============================
// EVENTS
// ===============================

elements.target.addEventListener("click", () => {

    if (!state.running) return;

    increaseScore();

});

// Make startGame accessible from HTML
window.startGame = startGame;