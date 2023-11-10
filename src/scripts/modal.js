export {openModal, closeModal};

const popups = document.querySelectorAll('.popup');

function openModal(popup) {
    popup.classList.add('popup_is-opened');

    document.addEventListener('keydown', closeByEscape);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');

    document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');

        event.preventDefault();
        closeModal(openedPopup);
    }
}

popups.forEach((popup) => {
    popup.classList.add('popup_is-animated');
})

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')
            || evt.target.classList.contains('popup__close')) {
            closeModal(popup);
        }
    })
})


