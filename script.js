let timer;
let timeLeft = 3600;
let sessionIndex = 0;
let isPaused = false;

const sessions = [
    { name: "Deep Work", duration: 3600 },
    { name: "Break", duration: 900 },
    { name: "Creative Session", duration: 3600 },
    { name: "Break", duration: 900 },
    { name: "Action Items", duration: 3600 },
    { name: "Break", duration: 900 },
    { name: "Planning for Tomorrow", duration: 1200 }
];

const quotes = [
    "Lost time is never found again. – Benjamin Franklin",
    "Focus is the key to unlocking potential. – Unknown",
    "Do something today that your future self will thank you for. – Sean Patrick Flanery",
    "You will never always be motivated, so you must learn to be disciplined. – Unknown",
    "The successful warrior is the average man, with laser-like focus. – Bruce Lee",
    "Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer",
    "Small disciplines repeated with consistency lead to great achievements. – John Maxwell",
    "Work until your idols become your rivals. – Drake",
    "We are what we repeatedly do. Excellence, then, is not an act, but a habit. – Aristotle",
    "Your future is created by what you do today, not tomorrow. – Robert Kiyosaki"
];

// Display daily quote
function setDailyQuote() {
    const today = new Date();
    const index = today.getDate() % quotes.length;
    document.getElementById("quote").innerText = quotes[index];
}

// Start the full session cycle
function startFullSessionCycle() {
    sessionIndex = 0;
    startNextSession();
}

// Start next session
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

// Start or resume timer
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

// Pause and resume
function togglePause() {
    if (isPaused) {
        startTimer();
        document.getElementById("pause-btn").innerText = "Pause";
    } else {
        clearInterval(timer);
        document.getElementById("pause-btn").innerText = "Resume";
    }
    isPaused = !isPaused;
}

// Reset only the current session
function resetSession() {
    timeLeft = sessions[sessionIndex - 1].duration; 
    updateTimerDisplay();
}

// Skip to next session
function skipSession() {
    clearInterval(timer);
    startNextSession();
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("hours").innerText = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
document.getElementById("minutes").innerText = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
document.getElementById("seconds").innerText = String(timeLeft % 60).padStart(2, '0');

}

// Event listeners
document.getElementById("start-day-btn").addEventListener("click", startFullSessionCycle);
document.getElementById("pause-btn").addEventListener("click", togglePause);
document.getElementById("reset-btn").addEventListener("click", resetSession);
document.getElementById("skip-btn").addEventListener("click", skipSession);

// Run quote function on page load
window.onload = setDailyQuote;
#timer {
    font-size: 80px;
    font-weight: bold;
    text-align: center;
    color: white !important;  /* Ensures text is always white */
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6); /* Adds a soft glow for readability */
}

#timer small {
    font-size: 20px;
    display: block;
    color: white !important;  /* Ensures labels (Hour, Minute, Second) are also white */
}
