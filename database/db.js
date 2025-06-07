require('dotenv').config()
const mongoose = require('mongoose')

const connectToDb = async(req,res)=>{
    try {
        await mongoose.connect(process.env.mongo_url);
        console.log("Mongo connected Successfully");
        
    } catch (error) {
        console.log("Mongo connection failed");
        process.exit(1)
    }
}

module.exports = connectToDb;