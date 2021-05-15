export default class ApiError extends Error {
    status: number
    info: Record<string, string> | string

    constructor(status: number, info?: Record<string, string> | string) {
        super(typeof info === 'string' ? info : '')
        
        this.status = status
        this.info = info || ''
    }
}
