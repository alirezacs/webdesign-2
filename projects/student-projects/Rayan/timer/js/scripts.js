// گرفتن المنت های HTML

let minutesDisplay = document.getElementById("minutes");
let secondsDisplay = document.getElementById("seconds");

let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");

let statusText = document.getElementById("status");

// متغیرهای تایمر

let minutes = 0;
let seconds = 0;
let timer = null;

// تابع نمایش زمان

function updateDisplay() {
    minutesDisplay.innerText = String(minutes).padStart(2, "0");
    secondsDisplay.innerText = String(seconds).padStart(2, "0");
}

// تابع شروع تایمر

function startTimer() {

    if (timer !== null) {
        return;
    }

    statusText.innerText = "TIMER RUNNING";

    timer = setInterval(function () {

        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        updateDisplay();

    }, 1000);
}

// تابع توقف تایمر

function stopTimer() {

    clearInterval(timer);
    timer = null;

    statusText.innerText = "TIMER PAUSED";
}

// تابع ریست تایمر

function resetTimer() {

    clearInterval(timer);
    timer = null;

    minutes = 0;
    seconds = 0;

    updateDisplay();

    statusText.innerText = "READY TO START";
}

// اتصال دکمه ها به توابع

startBtn.addEventListener("click", startTimer);

stopBtn.addEventListener("click", stopTimer);

resetBtn.addEventListener("click", resetTimer);

