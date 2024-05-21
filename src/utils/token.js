const TOKENKEY = 'token_key'

function setLocalToken(token) {
    return localStorage.setItem(TOKENKEY, token)
}

function getLocalToken() {
    return localStorage.getItem(TOKENKEY)
}

function clearLocalToken() {
    return localStorage.removeItem(TOKENKEY)
}

export {
    setLocalToken,
    getLocalToken,
    clearLocalToken
}