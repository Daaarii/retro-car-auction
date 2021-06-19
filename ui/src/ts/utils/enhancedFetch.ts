import authStorage from '../utils/authStorage'

const apiUrl = 'http://localhost:3001/api/'

const client = (path: string, options?: RequestInit) => {
    return fetch(`${apiUrl}${path}`, {
        ...options,
    })
}

const authClient = (path: string, options?: RequestInit) => {
    const optionsHeaders = options?.headers || {}
    return fetch(`${apiUrl}${path}`, {
        ...options,
        headers: {
            ...optionsHeaders,
            'Authorization': `bearer ${authStorage.getToken() || ''}`,
        }
    })
}

export { client, authClient }
