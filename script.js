const cards = document.querySelectorAll(".flip-card");
const startGameBtn = document.querySelector(".start-game-btn");
const imgCard = document.querySelectorAll(".img-card");
const restartGame = document.querySelector(".container-restart-game");
const restartGameBtn = document.querySelector(".restart-game-btn");

const images = [
  "./assets/javascript.svg",
  "./assets/javascript.svg",
  "./assets/css.svg",
  "./assets/css.svg",
  "./assets/html.svg",
  "./assets/html.svg",
  "./assets/react.svg",
  "./assets/react.svg",
];

const randomImagesCards = () => {
  const imagesCards = [...imgCard];

  let indexImages = Array.from(Array(images.length).keys());
  let randomNumber;
  let tmp;

  // Algoritmo Fisher-Yates para embaralhar o números
  for (let i = indexImages.length; i; ) {
    randomNumber = (Math.random() * i--) | 0;
    tmp = indexImages[randomNumber];
    indexImages[randomNumber] = indexImages[i];
    indexImages[i] = tmp;
  }

  for (let i = 0; i < imagesCards.length; i++) {
    imagesCards[i].src = images[indexImages[i]];
  }
};

// Start game
startGameBtn.addEventListener("click", () => {
  startGameBtn.parentElement.classList = "container-start-game start";
  randomImagesCards();
});

cards.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.value !== "flip-card win") {
      item.classList.toggle("rotate");
    }

    const rotated = document.querySelectorAll(".rotate");
    if (rotated.length === 2) {
      verifyPoints(rotated);
    }

    const wins = document.querySelectorAll(".win");
    if (wins.length === 8) {
      restartGame.classList = "container-restart-game restart";
    }
  });
});

// Verifica se teve acertos
function verifyPoints(rotates) {
  let urls = [];

  [...rotates].forEach((item) => {
    urls.push(item.firstElementChild.lastElementChild.firstElementChild.src);
  });

  if (urls[0] === urls[1]) {
    [...rotates].forEach((item) => {
      item.classList = "flip-card win";
    });
  }

  if (urls[0] !== urls[1]) {
    [...rotates].forEach((item) => {
      item.classList = "flip-card";
    });
  }
}

restartGameBtn.addEventListener("click", () => {
  restartGame.classList = "container-restart-game";
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList = "flip-card";
  }
  randomImagesCards();
});
