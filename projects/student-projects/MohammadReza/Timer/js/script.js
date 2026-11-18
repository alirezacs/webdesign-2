const start = document.getElementById("start_btn");
const stop = document.getElementById("stop_btn");
const reset = document.getElementById("reset_btn");

const hourElement = document.getElementById("hour");
const minuteElement = document.getElementById("minute");
const secondElement = document.getElementById("second");

let second = 0;
let minute = 0;
let hour = 0;

let timer = null;

// نمایش زمان
function updateTimer() {
    hourElement.innerHTML = String(hour).padStart(2, "0");
    minuteElement.innerHTML = String(minute).padStart(2, "0");
    secondElement.innerHTML = String(second).padStart(2, "0");
}

// شروع تایمر
start.addEventListener("click", () => {

    if (timer !== null) return;

    start.style.backgroundColor = "purple";

    timer = setInterval(() => {

        second++;

        if (second === 60) {
            second = 0;
            minute++;
        }

        if (minute === 60) {
            minute = 0;
            hour++;
        }

        updateTimer();

    }, 1000);
});

// توقف تایمر
stop.addEventListener("click", () => {

    clearInterval(timer);
    timer = null;

    start.style.backgroundColor = "";
});

// ریست تایمر
reset.addEventListener("click", () => {

    clearInterval(timer);
    timer = null;

    second = 0;
    minute = 0;
    hour = 0;

    updateTimer();

    start.style.backgroundColor = "";
});