import './index.css';
import {initialCards} from './scripts/cards';
import {createCard, deleteCard, likeCard} from './scripts/card';
import {openModal, closeModal} from './scripts/modal';

const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');

const imagePopup = document.querySelector('.popup_type_image');
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');

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
    image.src = cardInfo.link;
    image.alt = cardInfo.name;
    caption.textContent = cardInfo.name;

    openModal(imagePopup);
}

function handleEditFormSubmit(event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closeModal(editPopup);
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

    closeModal(newCardPopup);
}

initialCards
    .map(cardInfo => createCard(
        cardInfo,
        deleteCard,
        likeCard,
        openImagePopup
    ))
    .forEach(card => placesList.append(card));

editButton.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openModal(editPopup);
});
addButton.addEventListener('click', function () {
    newCardForm.reset();
    openModal(newCardPopup);
});
editForm.addEventListener('submit', handleEditFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);





