const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

let arrOfCards = [];


function addCard(cardsInfo, deleteFunc) {
    for (let i = 0; i < cardsInfo.length; i++) {
        const card = cardTemplate.querySelector('.card').cloneNode(true);
        const cardImage = card.querySelector('.card__image');
        const cardTitle = card.querySelector('.card__title');
        const deleteButton = card.querySelector('.card__delete-button');

        cardImage.src = cardsInfo[i].link;
        cardImage.alt = cardsInfo[i].name;
        cardTitle.textContent = cardsInfo[i].name;

        deleteButton.addEventListener('click', function () {
            const placesItem = deleteButton.closest('.places__item');
            placesItem.remove();
        })

        arrOfCards.push(card);
    }

    return arrOfCards;
}

function removeCard() {}

addCard(initialCards, removeCard);

arrOfCards.forEach(item => placesList.append(item));


