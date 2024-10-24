const word = document.querySelector('.word');
const wordMistakes = document.querySelector(".word-mistakes");
const correctCount = document.querySelector(".correct-count");
const wrongCount = document.querySelector(".wrong-count");

const words = [
    "hello", "apple", "unicorn", "example", "university", "green", "house", "rabbit", "blood", "black", "corner", "violet", "welcome"
];

function createRandomWord() {
    const fragment = new DocumentFragment();

    const randomWord = words[Math.floor(Math.random() * words.length)];
    const letters = randomWord.split("");

    letters.forEach((letter) => {
        const singleLetter = document.createElement("span");
        singleLetter.textContent = letter;
        fragment.append(singleLetter);
    })

    word.append(fragment);
    return randomWord;
}

let singleWord = createRandomWord();

let i = 0;
let correctWords = 0;
let wrongWords = 0;
let wrong = 0;

const timer = document.querySelector("#timer");
const timeArray = timer.textContent.split(':');

let minutes = +timeArray[0];
let seconds = +timeArray[1];

let timerId;

let isRunning = false;


document.addEventListener('keydown', (event) => {
    if (!isRunning) {
        seconds = 0;
        minutes = 0;
        timerId = setInterval(() => {
            seconds++;
            if (seconds > 59) {
                seconds = 0;
                minutes++;
            }
            timer.textContent = `${format(minutes)}:${format(seconds)}`
        }, 1000)
        isRunning = true;
    }

    const wordLetters = Array.from(document.querySelectorAll(".word span"));

    if (event.key == Array.from(singleWord)[i]) {
        wordLetters[i].classList.remove("w");
        wordLetters[i].classList.add("c");
        i++;
    } else {
        wordLetters[i].classList.add("w");
        wrong++;
        wordMistakes.textContent = wrong;
    }

    if (i === wordLetters.length) {
        if (wrong === 0) {
            correctWords++;
            correctCount.textContent = correctWords;
        } else {
            wrongWords++;
            wrongCount.textContent = wrongWords;
        }
        word.innerHTML = "";
        singleWord = createRandomWord()
    }

    if (i >= wordLetters.length) {
        if (correctWords === 5) {
            finishPlay("Молодец, отличная работа!");
        } else if (wrongCount.textContent === "5") {
            finishPlay("Нужно больше тренироваться, попробуй снова!");
        } else {
            i = 0;
            wrong = 0;
            wordMistakes.textContent = 0;
            wordContainer.innerHTML = "";
        }
    }
})


function format(val) {
    if (val < 10) {
        return (`0${val}`)
    }
    return val;
}


function stopTimer() {
    isRunning = false;
    clearInterval(timerId);
}

function finishPlay(info) {
    clearInterval(timerId);
    const message = setTimeout(() => {
        alert(`${info}     Твое время: ${timer.textContent}`);
        nuller();
    }, 0);
}

function nuller() {
    isRunning = false;
    i = 0;
    wrong = 0;
    correctWords = 0;
    wrongWords = 0;
    correctCount.textContent = 0;
    wrongCount.textContent = 0;
    wordMistakes.textContent = 0;
    timer.textContent = "00:00";
    word.innerHTML = "";
    singleWord = createRandomWord();
}