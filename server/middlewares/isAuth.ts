import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'


const isAuth = (req: Request, res: Response, next: NextFunction) => {

    try {

        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: 'Не авторизованн' })
        }

        const user = jwt.verify(token, process.env.SECRET_KEY!) as { email: string, id: number }
        req.user = user
        next()

    } catch (e) {
        return res.status(401).json({ message: 'Не авторизован' })
    }
}

export default isAuth
