let workDuration = 60 * 60; // 60 minutes
let breakDuration = 15 * 60; // 15 minutes
let sessionCount = 0;
let totalSessions = 4; // 4 work sessions
let isWorkSession = true;
let timeLeft;
let timerInterval;
let isRunning = false;

const sessionName = document.getElementById("session-name");
const timerDisplay = document.getElementById("timer");
const chime = document.getElementById("chime");

// Function to update the timer display
function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Function to start the timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                chime.play();
                clearInterval(timerInterval);
                isRunning = false;
                handleSessionCompletion();
            }
        }, 1000);
    }
}

// Function to pause the timer
function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    sessionCount = 0;
    isWorkSession = true;
    timeLeft = workDuration;
    sessionName.innerText = "Current Session: Work";
    updateDisplay();
}

// Function to skip to the next session
function skipSession() {
    clearInterval(timerInterval);
    isRunning = false;
    handleSessionCompletion();
}

// Function to handle session switching
function handleSessionCompletion() {
    if (isWorkSession) {
        sessionCount++;
        if (sessionCount >= totalSessions) {
            sessionName.innerText = "Day Complete!";
            timeLeft = 0;
            updateDisplay();
            return;
        }
        isWorkSession = false;
        sessionName.innerText = "Current Session: Break";
        timeLeft = breakDuration;
    } else {
        isWorkSession = true;
        sessionName.innerText = "Current Session: Work";
        timeLeft = workDuration;
    }
    updateDisplay();
    startTimer();
}

// **Fix for Start Day** - Runs all 4 sessions automatically
function startDay() {
    sessionCount = 0;
    isWorkSession = true;
    timeLeft = workDuration;
    sessionName.innerText = "Current Session: Work";
    updateDisplay();
    startFullSessionCycle();
}

// **NEW FUNCTION: Handles Full Work/Break Cycle Automatically**
function startFullSessionCycle() {
    if (sessionCount >= totalSessions) {
        sessionName.innerText = "Day Complete!";
        return;
    }

    timeLeft = isWorkSession ? workDuration : breakDuration;
    sessionName.innerText = isWorkSession ? "Current Session: Work" : "Current Session: Break";
    updateDisplay();

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            chime.play();
            clearInterval(timerInterval);
            isRunning = false;
            isWorkSession = !isWorkSession; // Switch Work/Break
            if (!isWorkSession) {
                sessionCount++;
            }
            startFullSessionCycle(); // Start next session
        }
    }, 1000);
}

// Initialize the display
resetTimer();
