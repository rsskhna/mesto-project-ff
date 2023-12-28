export {getCards, getUserInfo, patchProfileInfo, postNewCard, putLikeOnCard, deleteLikeFromCard, deleteCardFromServer, patchAvatar};

const COHORT = 'wff-cohort-4';
const TOKEN = '4fe98c95-18ba-48c9-878c-8bb8056c2c44';
const BASE_URL = 'https://nomoreparties.co/v1';

const getCards = () => {
    return fetch(BASE_URL + '/' + COHORT + '/cards', {
        method: 'GET',
        headers: {
            authorization: TOKEN
        }
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}

const getUserInfo = () => {
    return fetch(BASE_URL + '/' + COHORT + '/users/me', {
        method: 'GET',
        headers: {
            authorization: TOKEN
        }
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}

const patchProfileInfo = (userName, userDescription) => {
    return fetch(BASE_URL + '/' + COHORT + '/users/me', {
        method: 'PATCH',
        headers: {
            authorization: TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userName.value,
            about: userDescription.value
        })
    })
        .then(ignored => ignored)
        .catch(err => console.log(err))
}

const postNewCard = (cardName, cardLink) => {
    return fetch(BASE_URL + '/' + COHORT + '/cards', {
        method: 'POST',
        headers: {
            authorization: TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardName.value,
            link: cardLink.value
        })
    })
        .then(ignored => ignored)
        .catch(err => console.log(err))
}

const putLikeOnCard = (cardId) => {
    fetch(BASE_URL + '/' + COHORT + '/cards/likes/' + cardId, {
        method: 'PUT',
        headers: {
            authorization: TOKEN
        }})
        .then(ignored => ignored)
        .catch(err => console.log(err))
}

const deleteLikeFromCard = (cardId) => {
    fetch(BASE_URL + '/' + COHORT + '/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: TOKEN
        }})
        .then(ignored => ignored)
        .catch(err => console.log(err))
}

const deleteCardFromServer = (cardId) => {
    fetch(BASE_URL + '/' + COHORT + '/cards/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: TOKEN
        }})
        .then(ignored => ignored)
        .catch(err => console.log(err))
}

const patchAvatar = (avatarLink) => {
    return fetch(BASE_URL + '/' + COHORT + '/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarLink.value,
        })
    })
        .then(ignored => ignored)
        .catch(err => console.log(err))
}