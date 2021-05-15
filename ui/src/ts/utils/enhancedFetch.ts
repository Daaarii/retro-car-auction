import authStorage from '../utils/authStorage'

const apiUrl = 'http://localhost:3001/api/'

const client = (path: string, options?: RequestInit) => {
    return fetch(`${apiUrl}${path}`, {
        ...options,
    })
}

const authClient = (path: string, options?: RequestInit) => {
    return fetch(`${apiUrl}${path}`, {
        ...options,
        headers: {
            'Authorization': `bearer ${authStorage.getToken() || ''}`
        }
    })
}

export { client, authClient }
