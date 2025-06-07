const Image = require('../models/image')
const {uploadToCloudinary} = require('../helper/cloudinaryHelper')

const uploadImage = async(req,res)=>{
    try {
        if(!req.file){
            res.status(400).json({
                success: false,
                message: 'Can not upload empty image'
            })
        }

        const {url, publicId} = await uploadToCloudinary(req.file.path)

        const uploadImageFile = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        })

        await uploadImageFile.save();

        res.status(201).json({
            success: true,
            message: 'image uploaded successfully',
            image: uploadImageFile
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error in uploading image'
        })
    }
}


module.exports = {uploadImage}