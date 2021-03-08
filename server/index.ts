import path from 'path'

import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import multer from 'multer'
import cors from 'cors'

import router from './routes/index'
import sequelize from './utils/database'
import storageConfig from './utils/fileStorage'

import { setEntityRelations } from './models'


const app = express()

app.use(cors())
app.use('images', express.static(path.resolve(__dirname, 'images')))

app.use(express.json())
app.use(multer({ storage: storageConfig }).single('file'))
app.use(router)

setEntityRelations()

sequelize
    .sync()
    .then(() => {
        app.listen(process.env.PORT)
    })
    .catch(err => console.log(err))
