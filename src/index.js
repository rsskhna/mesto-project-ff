import './index.css';
import {initialCards} from './scripts/cards';
import {createCard, deleteCard, likeCard} from './scripts/card';
import {openModal, closeModal} from './scripts/modal';

const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const editForm = document.forms['edit-profile'];
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;
const newCardForm = document.forms['new-place'];
const placeInput = newCardForm.elements['place-name'];
const imageInput = newCardForm.elements.link;

function openImagePopup(cardInfo) {
    const imagePopup = document.querySelector('.popup_type_image');
    const image = document.querySelector('.popup__image');
    const caption = document.querySelector('.popup__caption');

    image.src = cardInfo.link;
    image.alt = cardInfo.name;
    caption.textContent = cardInfo.name;

    imagePopup.classList.add('popup_is-animated', 'popup_is-opened');
    imagePopup.addEventListener('click', closeModal);

    document.addEventListener('keydown', closeModal);
}

function handleEditFormSubmit(event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    event.currentTarget.closest('.popup').classList.remove('popup_is-opened');
}

function handleNewCardFormSubmit(event) {
    event.preventDefault();

    const newCard = createCard(
        {
            name: placeInput.value,
            link: imageInput.value,
        },
        deleteCard,
        likeCard,
        openImagePopup
    );
    placesList.prepend(newCard);

    event.currentTarget.closest('.popup').classList.remove('popup_is-opened');
}

initialCards
    .map(cardInfo => createCard(
        cardInfo,
        deleteCard,
        likeCard,
        openImagePopup
    ))
    .forEach(card => placesList.append(card));

editButton.addEventListener('click', function (evt) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openModal(evt);
});
addButton.addEventListener('click', function (evt) {
    newCardForm.reset();
    openModal(evt);
});
editForm.addEventListener('submit', handleEditFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);


