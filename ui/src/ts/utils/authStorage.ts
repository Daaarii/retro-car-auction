
class AuthStorage {

    addToken(token: string, expiryDate: number, userId: number) {
        localStorage.setItem('token', token)
        localStorage.setItem('expiryDate', String(expiryDate))
        localStorage.setItem('userId', String(userId))
    }

    getToken() {
        return localStorage.getItem('token')
    }

    getExpiryDate() {
        return localStorage.getItem('expiryDate')
    }

    clear() {
        localStorage.removeItem('token')
        localStorage.removeItem('expiryDate')
        localStorage.removeItem('userId')
    }

}

export default new AuthStorage()
