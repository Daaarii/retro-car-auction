import { NextFunction, Request, Response } from 'express'
import { Op } from 'sequelize'
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../models'
import ApiError from '../utils/apiError'


class AuthController {

    signUp = async (req: Request, res: Response, next: NextFunction) => {
        const { firstName, lastName, nickname, email, password } = req.body
        const avatar = req.file ? req.file.path : ''
    
        try {
            const user = await User.findOne({ where: { [Op.or]: [{ email }, { nickname }] } })

            if (user) {
                const info: Record<string, string> = {}
                if (user.email === email) {
                    info.email = 'Пользователь с таким email уже существует.'
                }
                if (user.nickname === nickname) {
                    info.nickname = 'Пользователь с таким nickname уже существует.'
                }
                return next(new ApiError(404, info))
            }

            const hashedPassword = await hash(password, 12)

            await User.create({ firstName, lastName, nickname, email, password: hashedPassword, role: 'user', avatar })
            
            res.status(201).json({message: 'User has been succesfully created.'})
        } catch (err) {
            next(new ApiError(502))
        }
    }

    signIn = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body

        try {
            const user = await User.findOne({ where: { email } })
            if (user) {
                const isEqual = await compare(password, user.password)

                if (isEqual) {
                    const token = jwt.sign({ email, id: user.id }, process.env.SECRET_KEY!, { expiresIn: process.env.EXPIRES_IN! })
                    res.status(200).json({
                        token,
                        expiryDate: Date.now().valueOf() + Number(process.env.EXPIRES_IN!) * 1000 / 60,
                        userId: user.id,
                    })
                } else {
                    return next(new ApiError(404, { password: 'Пароль введен некорректно.' }))
                }

            } else {
                next(new ApiError(404, { email: 'Пользователя с таким  email не существует.' }))
            }
        } catch (err) {
            next(new ApiError(500))
        }
    }
}

export default new AuthController()
