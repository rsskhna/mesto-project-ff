export {openModal, closeModal};

function openModal(event) {
    const editPopup = document.querySelector('.popup_type_edit');
    const newCardPopup = document.querySelector('.popup_type_new-card');

    if (event.target.classList.contains('profile__edit-button')) {
        editPopup.classList.add('popup_is-animated', 'popup_is-opened');

        editPopup.addEventListener('click', closeModal);
    } else if (event.target.classList.contains('profile__add-button')) {
        newCardPopup.classList.add('popup_is-animated', 'popup_is-opened');

        newCardPopup.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', closeModal);
}

function closeModal(event) {
    closeModalByTapCross(event);
    closeModalByTapOverlay(event);
    closeModalByPressEscape(event);
}

function closeModalByTapCross(event) {
    if (event.target.classList.contains('popup__close')) {
        removeClass(event.currentTarget);
    }
}

function closeModalByTapOverlay(event) {
    if (event.target.classList.contains('popup')) {
        removeClass(event.currentTarget);
    }
}

function closeModalByPressEscape(event) {
    if (event.key === 'Escape'
        && document.querySelector('.popup_is-opened')
    ) {
        event.preventDefault();
        removeClass(document.querySelector('.popup_is-opened'));
        document.removeEventListener('keydown', closeModal);
    }
}

function removeClass(activePopup) {
    activePopup.classList.remove('popup_is-opened');
}


