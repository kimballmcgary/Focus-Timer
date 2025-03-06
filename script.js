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
    "Focus is the key to unlocking potential. – Anonymous",
    "You can do anything, but not everything. – David Allen",
    "The secret of getting ahead is getting started. – Mark Twain",
    "What is not started today is never finished tomorrow. – Goethe",
    "Your future is created by what you do today, not tomorrow. – Robert Kiyosaki"
    "Focus is the key to unlocking potential. – Unknown",
    "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
    "The successful warrior is the average man, with laser-like focus. – Bruce Lee",
    "You will never always be motivated, so you gotta learn to be disciplined. – Kimball McGary",
    "Do what you can, with what you have, where you are. – Theodore Roosevelt",
    "Lost time is never found again. – Benjamin Franklin",
    "It’s not that I’m so smart, it’s just that I stay with problems longer. – Albert Einstein",
    "Simplicity is the ultimate sophistication. – Leonardo da Vinci",
    "If you spend too much time thinking about a thing, you’ll never get it done. – Bruce Lee",
    "We are what we repeatedly do. Excellence, then, is not an act, but a habit. – Aristotle",
    "Your focus determines your reality. – George Lucas",
    "Small disciplines repeated with consistency lead to great achievements. – John C. Maxwell",
    "Don’t count the days, make the days count. – Muhammad Ali",
    "It does not matter how slowly you go as long as you do not stop. – Confucius",
    "An hour of planning can save you 10 hours of doing. – Dale Carnegie",
    "Your mind is for having ideas, not holding them. – David Allen",
    "The difference between successful people and really successful people is that really successful people say no to almost everything. – Warren Buffett",
    "Until we can manage time, we can manage nothing else. – Peter Drucker",
    "Ordinary people think merely of spending time, great people think of using it. – Arthur Schopenhauer"
];

// Load a new quote each day
function loadDailyQuote() {
    const today = new Date().getDate();
    const quoteIndex = today % quotes.length;
    document.getElementById("quote").innerText = `"${quotes[quoteIndex]}"`;
}

// Starts the full cycle of sessions
function startFullSessionCycle() {
    sessionIndex = 0;
    startNextSession();
}

// Starts the next session in sequence
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

// Starts the timer
function startTimer() {
    clearInterval(timer);
    isPaused = false;
    timer = setInterval(() => {
        if (timeLeft > 0 && !isPaused) {
            timeLeft--;
            updateTimerDisplay();
        } else if (timeLeft === 0) {
            clearInterval(timer);
            startNextSession();
        }
    }, 1000);
}

// Updates the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Pauses or resumes the timer
function togglePause() {
    isPaused = !isPaused;
    document.getElementById("pause-btn").innerText = isPaused ? "Resume" : "Pause";
}

// Resets only the current session
function resetSession() {
    timeLeft = sessions[sessionIndex - 1].duration;
    updateTimerDisplay();
}

// Skips to the next session
function skipSession() {
    clearInterval(timer);
    startNextSession();
}

// Event listeners
document.getElementById("start-day-btn").addEventListener("click", startFullSessionCycle);
document.getElementById("pause-btn").addEventListener("click", togglePause);
document.getElementById("reset-btn").addEventListener("click", resetSession);
document.getElementById("skip-btn").addEventListener("click", skipSession);

// Run on page load
window.onload = function() {
    loadDailyQuote();
    updateTimerDisplay();
};
