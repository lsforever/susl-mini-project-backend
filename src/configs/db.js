import mongoose from 'mongoose'
import 'dotenv/config'

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Database connected ...')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

export default connect