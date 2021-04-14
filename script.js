const cardsChoice = [
    "one",
    "one",
    "two",
    "two",
    "three",
    "three",
    "four",
    "four",
    "fife",
    "fife",
    "six",
    "six",
];

let cards = document.querySelectorAll(".card");
cards = [...cards];

const start = document.querySelector(".startGame");
const gameContainer = document.querySelector(".gameContainer");
const coverOwl = document.querySelector(".coverOwl");
const info = document.querySelector(".info");
const winn = document.querySelector(".winn");
const reload = document.querySelector(".reloadGame");

let activeCard = "";
const activeCards = [];

const gamePairs = cards.length / 2;
let gameResult = 0;

const clickCard = function () {
    activeCard = this;

    if (activeCard === activeCards[0]) return;
    activeCard.classList.remove("hidden");
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        return;
    } else {
        cards.forEach((card) => card.removeEventListener("click", clickCard));
        activeCards[1] = activeCard;
        setTimeout(() => {
            if (activeCards[0].className === activeCards[1].className) {
                activeCards.forEach((card) => card.classList.add("off"));
                gameResult++;
                cards = cards.filter((card) => !card.classList.contains("off"));
                if (gameResult === gamePairs) {
                    winn.classList.add("winner");
                    reload.classList.add("reloadUp");
                    info.classList.add("infoDown");
                    reload.addEventListener("click", () => {
                        location.reload();
                    });
                }
            } else {
                activeCards.forEach((card) => card.classList.add("hidden"));
            }
            activeCard = "";
            activeCards.length = 0;
            cards.forEach((card) => card.addEventListener("click", clickCard));
        }, 1500);
    }
};

const init = () => {
    start.addEventListener("click", () => {
        start.classList.add("startDown");
        info.classList.add("infoUp");
        coverOwl.classList.add("coverOwlAcive");

        cards.forEach((card) => {
            cards.forEach((card) => {
                const position = Math.floor(Math.random() * cardsChoice.length);
                card.classList.add(cardsChoice[position]);
                cardsChoice.splice(position, 1);
            });
            card.classList.add("hidden");
            card.addEventListener("click", clickCard);
        });
    });
};
init();
