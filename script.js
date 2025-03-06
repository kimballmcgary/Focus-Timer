let timer;
let timeLeft = 3600;
let sessionIndex = 0;

const sessions = [
    { name: "Deep Work", duration: 3600 },
    { name: "Break", duration: 900 },
    { name: "Creative Session", duration: 3600 },
    { name: "Admin Work", duration: 1800 }
];

function startFullSessionCycle() {
    sessionIndex = 0;
    startNextSession();
}

function startNextSession() {
    if (sessionIndex < sessions.length) {
        document.getElementById("session-name").innerText = `Current Session: ${sessions[sessionIndex].name}`;
        timeLeft = sessions[sessionIndex].duration;
        updateTimerDisplay();
        startTimer();
        sessionIndex++;
    } else {
        alert("All sessions completed for the day!");
    }
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            startNextSession();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = sessions[sessionIndex - 1].duration; // Resets current session
    updateTimerDisplay();
}

function skipTimer() {
    clearInterval(timer);
    startNextSession();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Attach event listeners
document.getElementById("start-day").addEventListener("click", startFullSessionCycle);
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("skip").addEventListener("click", skipTimer);
