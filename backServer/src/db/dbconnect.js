import mongoose from 'mongoose'
import {DB_NAME} from '../constant.js'

const connectDB = async ()=>{
    try {
        const connIns = await mongoose.connect(`${process.env.MONGOOSE_URL}/${DB_NAME}`)
        console.log("mongodb connection succesfull::",connIns.connection.host);
        return connIns
    } catch (error) {
        console.log("mongodb conn failed::",error);
        process.exit(1)
    }
}

export {connectDB}