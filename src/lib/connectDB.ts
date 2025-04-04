import {connect} from "mongoose"
export const connectDB = async () => {
    try{
           await connect(process.env.MONGO_URI || "");
           console.log(`MongoDB connect successfully`)
    }
    catch(error){
         console.log(`Error during connecting database at connectDB.ts file ${error}`)
    }
}