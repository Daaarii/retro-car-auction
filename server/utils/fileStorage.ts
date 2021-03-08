import multer from 'multer'

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

export default storageConfig
