const express = require('express');
const {uploadImage} = require('../controllers/image-controller')
const adminMiddleware = require('../middleware/admin-middleware')
const authMiddleware = require('../middleware/auth-middleware')
const uploadMiddleware = require('../middleware/upload-middleware')


const router = express.Router();

router.post('/upload', authMiddleware, adminMiddleware, uploadMiddleware.single('image'), uploadImage)

module.exports = router;