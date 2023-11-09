export {openModal, closeModal};

const popups = document.querySelectorAll('.popup');

function openModal(popup) {
    popup.classList.add('popup_is-opened');

    document.addEventListener('keydown', function (evt) {
        closeByEscape(evt);
    });
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');

    document.removeEventListener('keydown', function (evt) {
        closeByEscape(evt);
    });
}

function closeByEscape(event) {
    let openedPopup = document.querySelector('.popup_is-opened');

    if (event.key === 'Escape' && openedPopup) {
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


