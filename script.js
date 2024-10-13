const word = document.querySelector('.word')
const words = [
    "hello", "apple", "unicorn", "example", "university", "green", "house", "rabbit", "blood", "black", "corner", "violet", "welcome"
];

function createRandomWord() {
    const fragment = new DocumentFragment();

    let randomWord = words[Math.floor(Math.random() * words.length)];
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
document.addEventListener('keydown', (event) => {

    let wordLetters = Array.from(document.querySelectorAll(".word span"));

    if (event.key == Array.from(singleWord)[i]) {
        wordLetters[i].classList.remove("w");
        wordLetters[i].classList.add("c");
        i++;
    } else {
        wordLetters[i].classList.add("w");
    }
})