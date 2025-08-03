import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connectionInstance = mongoose.connect(`${process.env.MONGODB_URI}`);

        //console.log(`MONGODB connected successfully!! DB HOST : ${connectionInstance.connection?.host || 'Not found'}`)       

    }catch(err){
        console.log("MONGO DB connection failed in dbIndex.js " , err);
        process.exit(1); 
    }
}

export default connectDB;