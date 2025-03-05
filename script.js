let timeLeft = 60 * 60; // 60 minutes
let timerInterval;
let isRunning = false;
const sessions = ["Work", "Break"];
let currentSessionIndex = 0;

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                document.getElementById("chime").play();
                clearInterval(timerInterval);
                isRunning = false;
                skipSession();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = 60 * 60;
    updateDisplay();
}

function skipSession() {
    currentSessionIndex = (currentSessionIndex + 1) % sessions.length;
    document.getElementById("session-name").innerText = "Current Session: " + sessions[currentSessionIndex];
    timeLeft = currentSessionIndex === 0 ? 60 * 60 : 15 * 60; // Work: 60 min, Break: 15 min
    updateDisplay();
}

// Initialize display
updateDisplay();
