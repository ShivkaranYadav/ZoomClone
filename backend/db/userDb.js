const mongoose = require('mongoose')
const MONGO_URL = `mongodb://localhost:27017/zoom-clone`



const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Database Connection Successfully")


    } catch (error) {
        console.log("database failed to connection....", error)

    }


}

module.exports = { connectDb }