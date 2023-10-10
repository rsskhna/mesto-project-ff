const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const arrOfCards = [];


function addToArr (createFunc) {
    for (let i = 0; i < initialCards.length; i++) {
        arrOfCards.push(createFunc(initialCards[i], removeCard));
    }
    return arrOfCards;
}

function createCard(cardInfo, deleteFunc) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');

    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cardTitle.textContent = cardInfo.name;

    deleteButton.addEventListener('click', function () {
        deleteFunc(deleteButton);
    })

    return card;
}

function removeCard(button) {
    const placesItem = button.closest('.places__item');
    placesItem.remove();
}

addToArr(createCard);

arrOfCards.forEach(item => placesList.append(item));


