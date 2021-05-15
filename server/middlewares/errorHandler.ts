import { Request, Response, ErrorRequestHandler, NextFunction } from 'express'

import ApiError from '../utils/apiError'


const errorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json(err.info)
    }
    res.status(500).json({ message: 'Непредвиденная ошибка' })
}

export default errorHandler
