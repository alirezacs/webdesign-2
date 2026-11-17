
let display = document.getElementById("display");
let startBtn = document.getElementById("start");
let pauseBtn = document.getElementById("pause");
let resetBtn = document.getElementById("reset");
let hoursInput = document.getElementById("hours");
let minutesInput = document.getElementById("minutes");
let secondsInput = document.getElementById("seconds");
let setTimeBtn = document.getElementById("setTime");

let totalTime = 0;
let remainingTime = 0;
let timerInterval = null;
let isRunning = false;

function updateDisplay() {
    let hours = Math.floor(remainingTime / 3600);
    let minutes = Math.floor((remainingTime % 3600) / 60);
    let seconds = remainingTime % 60;
    let h = String(hours).padStart(2, "0");
    let m = String(minutes).padStart(2, "0");
    let s = String(seconds).padStart(2, "0");
    display.textContent = h + ":" + m + ":" + s;
}

setTimeBtn.addEventListener("click", function() {
    let hours = Number(hoursInput.value);
    let minutes = Number(minutesInput.value);
    let seconds = Number(secondsInput.value);

    if (hours < 0 || hours > 99 || 
        minutes < 0 || minutes > 59 ||
        seconds < 0 || seconds > 59) {
        alert("Please enter a valid time!");
        return;
    }
    if (hours == 0 && minutes == 0 && seconds == 0) {
        alert("Please enter a time!");
        return;
    }
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    totalTime = (hours * 3600) + (minutes * 60) + seconds;
    remainingTime = totalTime;
    updateDisplay();
});

startBtn.addEventListener("click", function() {
    if (remainingTime <= 0 || isRunning) {
        return;
    }
    isRunning = true;
    timerInterval = setInterval(function() {
        remainingTime--;
        updateDisplay();
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            isRunning = false;
            playSound();
        }
    }, 1000);
});

pauseBtn.addEventListener("click", function() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
});

resetBtn.addEventListener("click", function() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    totalTime = 0;
    remainingTime = 0;
    updateDisplay();
});

function playSound() {
    let audio = new AudioContext();
    let oscillator = audio.createOscillator();
    let volume = audio.createGain();
    oscillator.connect(volume);
    volume.connect(audio.destination);
    oscillator.frequency.value = 800;
    volume.gain.value = 0.3;
    oscillator.start();
    oscillator.stop(audio.currentTime + 0.5);
}
