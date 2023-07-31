import mongoose from 'mongoose'

const CropSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'CropCategory',
        required: true
    },
    details: {
        type: String,
        required: true
    },
},
    {
        timestamps: true,
        //collection: 'Crops',
    }
)

const CropModel = mongoose.model('Crop', CropSchema)
export default CropModel


