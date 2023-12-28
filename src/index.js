import './index.css';
import {createCard, deleteCard, likeCard} from './scripts/card';
import {openModal, closeModal} from './scripts/modal';
import {enableValidation, clearValidation} from "./scripts/validation";
import {getCards, getUserInfo, patchProfileInfo, postNewCard, patchAvatar} from "./scripts/api";

const editPopup = document.querySelector('.popup_type_edit');
const editSubmitButton = editPopup.querySelector('.popup__button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardSubmitButton = newCardPopup.querySelector('.popup__button');
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const avatarSubmitButton = avatarPopup.querySelector('.popup__button');
const imagePopup = document.querySelector('.popup_type_image');

const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');

const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const editForm = document.forms['edit-profile'];
const nameInput = editForm.elements.name;
const descriptionInput = editForm.elements.description;

const newCardForm = document.forms['new-place'];
const placeInput = newCardForm.elements['place-name'];
const imageInput = newCardForm.elements.link;

const avatarEditForm = document.forms['edit-avatar'];
const avatarInput = avatarEditForm.elements.avatar;

const formConfiguration = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__image');
const editIcon = document.querySelector('.profile__edit-img');

function openImagePopup(cardInfo) {
    image.src = cardInfo.link;
    image.alt = cardInfo.name;
    caption.textContent = cardInfo.name;

    openModal(imagePopup);
}

function handleEditFormSubmit(event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    editSubmitButton.textContent = 'Сохранение...';

    patchProfileInfo(nameInput, descriptionInput)
        .then(res => closeModal(editPopup))
}

function handleNewCardFormSubmit(event) {
    event.preventDefault();

    const newCard = createCard(
        {
            name: placeInput.value,
            link: imageInput.value,
            likes: [],
            owner: {
                getUserInfo,
            }
        },
        deleteCard,
        likeCard,
        openImagePopup
    );
    placesList.prepend(newCard);

    newCardSubmitButton.textContent = 'Сохранение...';

    postNewCard(placeInput, imageInput)
        .then(res => closeModal(newCardPopup));
}

function handleAvatarEditFormSubmit(event) {
    event.preventDefault();

    profileImage.style.backgroundImage = 'url(' + avatarInput.value + ')';

    avatarSubmitButton.textContent = 'Сохранение...';

    patchAvatar(avatarInput)
        .then(res => closeModal(avatarPopup));
}

Promise.all([getUserInfo(), getCards()])
    .then(res => {

        let userInfo = res.at(0)
        userName.textContent = userInfo.name;
        userDescription.textContent = userInfo.about;
        userAvatar.style.backgroundImage = `url(${userInfo.avatar})`;

        let cards = res.at(1)
        cards
            .map(cardInfo => createCard(
                cardInfo,
                deleteCard,
                likeCard,
                openImagePopup,
                userInfo['_id']
            ))
            .forEach(card => placesList.append(card));
    });

enableValidation(formConfiguration);

editButton.addEventListener('click', function () {
    editSubmitButton.textContent = 'Сохранить';

    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;

    clearValidation(editForm, formConfiguration);
    openModal(editPopup);
});
editForm.addEventListener('submit', handleEditFormSubmit);

addButton.addEventListener('click', function () {
    newCardSubmitButton.textContent = 'Создать';
    newCardForm.reset();
    clearValidation(newCardForm, formConfiguration);
    openModal(newCardPopup);
});
newCardForm.addEventListener('submit', handleNewCardFormSubmit);

userAvatar.addEventListener('mouseover', function () {
    editIcon.classList.add('profile__edit-img_visible');
});
userAvatar.addEventListener('mouseout', function () {
    editIcon.classList.remove('profile__edit-img_visible');
});
userAvatar.addEventListener('click', function () {
    avatarSubmitButton.textContent = 'Сохранить';
    avatarEditForm.reset();
    clearValidation(avatarEditForm, formConfiguration);
    openModal(avatarPopup);
});
avatarEditForm.addEventListener('submit', handleAvatarEditFormSubmit);
