export {
    getResponseData,
    logError,
    getCardsApi,
    getUserInfoApi,
    patchProfileInfoApi,
    postNewCardApi,
    putLikeOnCardApi,
    deleteLikeFromCardApi,
    deleteCardFromServerApi,
    patchAvatarApi
};

const COHORT = 'wff-cohort-4';
const TOKEN = '4fe98c95-18ba-48c9-878c-8bb8056c2c44';
const BASE_URL = 'https://nomoreparties.co/v1';

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

function logError(error) {
    return console.log(`Ошибка.....: ${error}`);
}

const getCardsApi = () => {
    return fetch(BASE_URL + '/' + COHORT + '/cards', {
        method: 'GET',
        headers: {
            authorization: TOKEN
        }
    })
    .then(res => getResponseData(res))
}

const getUserInfoApi = () => {
    return fetch(BASE_URL + '/' + COHORT + '/users/me', {
        method: 'GET',
        headers: {
            authorization: TOKEN
        }
    })
    .then(res => getResponseData(res))
}

const patchProfileInfoApi = (userName, userDescription) => {
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
}

const postNewCardApi = (cardName, cardLink) => {
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
}

const putLikeOnCardApi = (cardId) => {
    return fetch(BASE_URL + '/' + COHORT + '/cards/likes/' + cardId, {
        method: 'PUT',
        headers: {
            authorization: TOKEN
        }
    })
}

const deleteLikeFromCardApi = (cardId) => {
    return fetch(BASE_URL + '/' + COHORT + '/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: TOKEN
        }
    })
}

const deleteCardFromServerApi = (cardId) => {
    return fetch(BASE_URL + '/' + COHORT + '/cards/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: TOKEN
        }
    })
}

const patchAvatarApi = (avatarLink) => {
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
}