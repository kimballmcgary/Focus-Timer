let timer;
let timeLeft = 3600;
let sessionIndex = 0;

const sessions = [
    { name: "Deep Work", duration: 3600 },
    { name: "Break", duration: 900 },
    { name: "Creative Session", duration: 3600 },
    { name: "Break", duration: 900 },
   { name: "Action Items", duration: 3600 },
];

const quotes = [
    "The secret to getting ahead is getting started. – Mark Twain",
    "Focus is the key to unlocking potential. – Unknown",
    "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
    "The successful warrior is the average man, with laser-like focus. – Bruce Lee",
    "You will never always be motivated, so you must learn to be disciplined. – Unknown",
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

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function displayQuote() {
    const today = new Date().getDate(); 
    const quoteIndex = today % quotes.length; // Rotate quotes daily
    document.getElementById("quote").innerText = `"${quotes[quoteIndex]}"`;
}

// Run quote function on page load
window.onload = function() {
    displayQuote();
};
