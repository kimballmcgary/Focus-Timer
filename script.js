let timer;
let timeLeft;
let sessionIndex = 0;
let isPaused = false;

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
    isPaused = false;
    document.getElementById("pause-play").innerText = "Pause"; // Update button text
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

function pauseOrPlayTimer() {
    if (isPaused) {
        startTimer();
    } else {
        clearInterval(timer);
        isPaused = true;
        document.getElementById("pause-play").innerText = "Play";
    }
}

function resetCurrentSession() {
    timeLeft = sessions[sessionIndex - 1].duration; // Reset to original time
    updateTimerDisplay();
}

function skipSession() {
    clearInterval(timer);
    startNextSession();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
