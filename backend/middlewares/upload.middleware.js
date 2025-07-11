import multer from 'multer'

//Configure storage

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const baseName = file.originalname
        .replace(/\s+/g, '_')          // Replace spaces with underscores
        .replace(/[()]/g, '')          // Remove parentheses
        .replace(/[^a-zA-Z0-9_\-.]/g, ''); // Remove anything else problematic
        cb(null, `${Date.now()}-${baseName}`)
    }
})

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Only .jpeg/.png/.jpg formats are allowed'), false)
    }
}

const uploads = multer({storage, fileFilter})
export default uploads