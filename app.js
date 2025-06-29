let focusTime = 0;
let focusRemaining = 0;
let wastedTime = 0;
let running = false;
let paused = false;
let timerInterval = null;

const focusInput = document.getElementById('focus-minutes');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resumeBtn = document.getElementById('resume-btn');
const resetBtn = document.getElementById('reset-btn');
const focusLabel = document.getElementById('focus-label');
const wastedLabel = document.getElementById('wasted-label');

function formatTime(secs) {
    const h = String(Math.floor(secs / 3600)).padStart(2, '0');
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function updateLabels() {
    focusLabel.textContent = `Focus Time Left: ${formatTime(focusRemaining)}`;
    wastedLabel.textContent = `Time Wasted: ${formatTime(wastedTime)}`;
}

function startTimer() {
    const minutes = parseInt(focusInput.value, 10);
    if (isNaN(minutes) || minutes < 5 || minutes > 120) {
        alert('Enter time between 5 and 120 minutes.');
        return;
    }
    focusTime = minutes * 60;
    focusRemaining = focusTime;
    wastedTime = 0;
    running = true;
    paused = false;
    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
    startBtn.disabled = true;
    focusInput.disabled = true;
    updateLabels();
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

function pauseTimer() {
    paused = true;
    pauseBtn.disabled = true;
    resumeBtn.disabled = false;
}

function resumeTimer() {
    paused = false;
    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
}

function resetTimer() {
    running = false;
    paused = false;
    focusRemaining = 0;
    wastedTime = 0;
    updateLabels();
    pauseBtn.disabled = true;
    resumeBtn.disabled = true;
    startBtn.disabled = false;
    focusInput.disabled = false;
    if (timerInterval) clearInterval(timerInterval);
}

function updateTimer() {
    if (!running) return;
    if (!paused && focusRemaining > 0) {
        focusRemaining--;
    } else if (paused) {
        wastedTime++;
    }
    if (focusRemaining === 0 && !paused) {
        running = false;
        alert("Your focus session has ended!");
        resetTimer();
        return;
    }
    updateLabels();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resumeBtn.addEventListener('click', resumeTimer);
resetBtn.addEventListener('click', resetTimer);

updateLabels();
