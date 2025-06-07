const cloudinary = require('../config/cloudinary')

const uploadToCloudinary = async(filePath)=>{
    try {
        const result = await cloudinary.uploader.upload(filePath)

        return {
            url: result.secure_url,
            publicId: result.public_id
        }
    } catch (error) {
        console.log("Error while uploading image to cloudinary");
        throw new Error("Error while uploading image to cloudinary");
    }
}

module.exports = {uploadToCloudinary}