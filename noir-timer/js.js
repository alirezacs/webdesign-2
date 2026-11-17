let minutes = 0;
let seconds = 0;
let miliSecond = 0;
let interval = null;

let timer = document.getElementById('timer');
let btn = document.getElementById('btn');
let reset = document.getElementById('reset');

btn.addEventListener('click', () => {
    if (interval == null) {
        interval = setInterval(() => {
            miliSecond++;

            if (miliSecond == 100) {
                miliSecond = 0;
                seconds++;

                if (seconds == 60) {
                    seconds = 0;
                    minutes++;
                }
            }

            timer.innerText =
                `${minutes} : ${seconds} : ${miliSecond}`;

        }, 10);

        btn.innerText = 'Ⅱ Pause';

    } else {
        clearInterval(interval);
        interval = null;
        btn.innerText = '▶ Resume';
    }
});

reset.addEventListener('click', () => {
    clearInterval(interval);
    interval = null;

    minutes = 0;
    seconds = 0;
    miliSecond = 0;

    timer.innerText = '0 : 0 : 0';
    btn.innerText = '▶ Start';
});