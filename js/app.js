document.addEventListener("DOMContentLoaded", function () {

    const cardsColor = ["red", "red", "green", "green", "yellow", "yellow", "lightskyblue", "lightskyblue",
        "grey", "grey", "pink", "pink", "purple", "purple", "orange", "orange", "blue", "blue"];


    let cards = document.querySelectorAll("div");
    cards = [...cards]; // change of NodeList to array

    const startTime = new Date().getTime();

    let activeCard = "";
    const activeCards = [];

    const numOfPairs = cards.length/2;
    let gameResult = 0;

    function clickCard() {
        activeCard = this;
        if(activeCard == activeCards[0]) return;

        activeCard.classList.remove("hidden");
        if (activeCards.length === 0){
            activeCards.push(activeCard);
            return;
        } else {
            cards.forEach(card => {
                card.removeEventListener("click", clickCard)
            });

            activeCards.push(this);

            setTimeout(function () {
                if (activeCards[0].className === activeCards[1].className){
                    activeCards.forEach(card => card.classList.add("off"));
                    gameResult += 1;
                    cards = cards.filter(card => !card.classList.contains("off"));
                    if (gameResult === numOfPairs){
                         const endTime = new Date().getTime();
                         const gameTime = (endTime - startTime)/1000;
                         alert(`Udało się! Twój wynik to: ${gameTime} sekund`);
                         location.reload();
                    }
                } else {
                    activeCards.forEach(card => card.classList.add("hidden"));
                }
                activeCard = "";
                activeCards.length = 0;
                cards.forEach(card => card.addEventListener("click", clickCard));
            },1000);
        }

    }

    function init() {
        cards.forEach(card => {
            const position = Math.floor(Math.random() * cardsColor.length);
            card.classList.add(cardsColor[position]);
            cardsColor.splice(position, 1);
        });

        setTimeout(function () {
            cards.forEach(card => {
                card.classList.add("hidden");
                card.addEventListener("click", clickCard);
            })
        }, 2000);
    }

    init();
});
