import mongoose from 'mongoose'
import 'dotenv/config'

const connect = async () => {
    try {
        // eslint-disable-next-line no-undef
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Database connected ...')
    } catch (error) {
        console.log(error.message)
        // eslint-disable-next-line no-undef
        process.exit(1)
    }
}

export default connect
