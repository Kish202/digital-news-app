import mongoose from "mongoose";

const dbConnect = async()=>{

   try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log('Connected To MongoDB Success');
    
   } catch (error) {
    console.log("Connection To Mongodb fails");
    process.exit(1);
   }    
};

export default dbConnect;