document.addEventListener('DOMContentLoaded', function() {
    const counter_div = document.getElementById('counter');
    const counters = [10, 10, 10, 10, 10];

    const clack = new Audio('../static/audio/clack.mp3');
    const interval_finish = new Audio('../static/audio/interval-finish.mp3');
    const workout_finish = new Audio('../static/audio/workout-finish.mp3');

    clack.load();
    interval_finish.load();
    workout_finish.load();

    let i = 0;
    let counter = counters[0];
    let countInterval;
    let isPaused = true;

    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', toggleCounter);

    function toggleCounter() {
        if (isPaused) {
            resumeCounter();
            startButton.innerHTML = 'Pause';
        } else {
            pauseCounter();
            startButton.innerHTML = 'Resume';
        }
    }

    function resumeCounter() {
        if (i < counters.length) {
            counter_div.innerHTML = counter;
            isPaused = false;

            countInterval = setInterval(() => {
                counter--;
                counter_div.innerHTML = counter;
                if (counter === 0) {
                    clearInterval(countInterval);
                    interval_finish.cloneNode(true).play();
                    i++;
                    counter = counters[i];
                    resumeCounter();
                }
            }, 1000);
        } else {
            workout_finish.play();
            counter_div.innerHTML = 'Finished!';
        }
    }

    function pauseCounter() {
        isPaused = true;
        clearInterval(countInterval);
    }
});
