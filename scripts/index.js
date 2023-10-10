const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

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

initialCards.map(cardInfo => createCard(cardInfo, removeCard))
            .forEach(card => placesList.append(card));