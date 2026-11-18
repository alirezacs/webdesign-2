
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

let timer;

let minuteText = document.getElementById("minutes");
let secondText = document.getElementById("seconds");
let millisecondText = document.getElementById("milliseconds");

let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resetBtn = document.getElementById("resetBtn");

let updateTimer = () => {
    milliseconds++;

    if (milliseconds == 100) {
        milliseconds = 0;
        seconds++;
    }

    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }

   minuteText.innerText = minutes;
   secondText.innerText = seconds;
   millisecondText.innerText = milliseconds;
}

startBtn.onclick =  () => {
    if (!timer) {
        timer = setInterval(updateTimer, 10);
    }
};

pauseBtn.onclick = () => {
    clearInterval(timer);
    timer = null;
};

resetBtn.onclick =  () => {
    clearInterval(timer);
    timer = null;

    minutes = 0;
    seconds = 0;
    milliseconds = 0;

    minuteText.innerText = "00";
    secondText.innerText = "00";
    millisecondText.innerText = "00";
};