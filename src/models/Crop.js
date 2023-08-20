import mongoose from 'mongoose'

const CropSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'CropCategory',
            required: true,
        },
        botanical: {
            type: String,
            required: true,
        },
        varities: [String],
        factors: {
            rainfall: {
                min: { type: Number, min: 0 },
                max: { type: Number, min: 0 },
            },
            zones: [{ type: String, enum: ['dry', 'wet', 'intermediate'] }],
            soil: {
                min: { type: Number, min: 3.5, max: 10 },
                max: { type: Number, min: 3.5, max: 10 },
            },
            period: {
                type: String,
                enum: ['long', 'short'],
                required: true,
            },
        },
        other: {
            extra: String,
            tutorial: [{ name: String, value: String }],
            videos: [{ name: String, value: String }],
        },
    },
    {
        timestamps: true,
        //collection: 'crops',
    }
)

const CropModel = mongoose.model('Crop', CropSchema)
export default CropModel
