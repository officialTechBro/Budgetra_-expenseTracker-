import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectURI = await mongoose.connect(process.env.MONGO_URI) 
    console.log(`Database connect to ${connectURI.connection.host}`)
    } catch (error) {
        console.log('error connecting to DB', error)
        process.exit(1)
    }
}

export default connectDB