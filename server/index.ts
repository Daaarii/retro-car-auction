import path from 'path'

import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import multer from 'multer'
import cors from 'cors'

import router from './routes/index'
import sequelize from './utils/database'
import storageConfig from './utils/fileStorage'
import errorHandler from './middlewares/errorHandler'
import { Brand, Country, setEntityRelations } from './models'


setEntityRelations()

const app = express()

app.use(cors())
app.use('/images', express.static(path.resolve(__dirname, 'images')))

app.use(express.json())
app.use(multer({ storage: storageConfig }).fields([
    { name: 'file' },
    { name: 'files', maxCount: 15 }
]))
app.use('/api', router)

app.use(errorHandler)

import countries from './countries'
import brands from './brands'

const countryRecords = countries.map(country => ({ name: country }))
const brandRecords = brands.map(brand => ({ name: brand.name }))

sequelize
    .sync({ force: true })
    .then(() => {
        app.listen(process.env.PORT)
    })
    .catch (err => console.log(err))
