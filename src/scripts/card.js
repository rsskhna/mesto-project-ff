const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardInfo, deleteFunc, likeFunc, openImageFunc) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');

    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cardTitle.textContent = cardInfo.name;

    deleteButton.addEventListener('click', function () {
        deleteFunc(deleteButton);
    });

    likeButton.addEventListener('click', likeFunc);

    cardImage.addEventListener('click', function () {
        openImageFunc(cardInfo);
    });

    return card;
}

function deleteCard(button) {
    const placesItem = button.closest('.places__item');
    placesItem.remove();
}

function likeCard(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

export {createCard, deleteCard, likeCard}