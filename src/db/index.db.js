import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        console.log(process.env.MONGO_DB_URI)
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("MongoDB connected!")
    } catch (error) {
        console.error("MongoDB Connection error!");
        process.exit(1);
    }
};

export default connectDB;