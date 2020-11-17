// Select element from DOM
const wordEl = document.getElementById("word");
const wrongLetterEl = document.getElementById("wrong__letters");
const playAgainBtn = document.getElementById("play__button");
const popup = document.getElementById("popup__container");
const notification = document.getElementById("notification__container");
const findMessage = document.getElementById("final__message");

const figureParts = document.querySelectorAll(".figure__part");

const words = ["application", "programming", "interface", "wizard"];

// Select random letters from words array
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
${selectedWord
  .split("")
  .map(
    (letter) =>
      `<span class="letter">${
        correctLetters.includes(letter) ? letter : ""
      }</span>`
  )
  .join("")}
`;
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    findMessage.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";
  }
}

// Update the wrong letters
function updateWrongLetterEL() {
  // Display wrong letters
  wrongLetterEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    popup.style.display = "flex";
  }
}

//Show notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

//KeyDown letter press
window.addEventListener("keydown", (evt) => {
  if (evt.keyCode >= 65 && evt.keyCode <= 90) {
    const letter = evt.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetterEL();
      } else {
        showNotification();
      }
    }
  }
});

//Restart game and play agin
playAgainBtn.addEventListener("click", () => {
  //Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();

  updateWrongLetterEL();
  popup.style.display = "none";
});

displayWord();
