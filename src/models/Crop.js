import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import m2s from 'mongoose-to-swagger'
import { climateZones } from '../constants/index.js'
import CategoryModel from './Category.js'

const CropSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            description: 'Name of the crop',
            example: 'Paddy',
        },
        category: {
            type: mongoose.ObjectId,
            ref: CategoryModel.modelName,
            required: true,
            description: 'Category of the crop',
            example: 'Response - Vegetables, Post - 64dbeac4c84d7b5eb71b4cb1',
        },
        image: {
            type: String,
            description: 'Image of the crop',
            example: 'crops/63dbeac4c84d7b5eb71b4ed1.jpg',
        },
        botanical: {
            type: String,
            required: true,
            unique: true,
            description: 'Botanical name of the crop',
            example: 'Oryza sativa',
        },
        varieties: {
            type: [
                {
                    type: String,
                    description: 'One Variety of the crop',
                    example: 'Bg 750',
                },
            ],
            description: 'Different varieties of the crop',
            example: ['Bg 300', 'Bg 750'],
        },
        factors: {
            description: 'These are the factors realated to the crop',
            type: {
                _id: false,
                rainfall: {
                    type: {
                        _id: false,
                        min: {
                            type: Number,
                            min: 0,
                            description: 'Minimum Rainfall',
                            example: 20,
                        },
                        max: {
                            type: Number,
                            min: 0,
                            description: 'Maximun Rainfall',
                            example: 100,
                        },
                    },
                    description:
                        'Min Max Range of rainfall needed for the crop',
                },
                zones: {
                    // type: [
                    //     {
                    //         type: String,
                    //         enum: [
                    //             climateZones.DRY,
                    //             climateZones.WET,
                    //             climateZones.INTERMEDIATE,
                    //         ],
                    //         description: 'Single climate zone',
                    //         example: climateZones.WET,
                    //     },
                    // ],
                    type: [
                        {
                            type: {
                                _id: false,
                                zone: {
                                    type: String,
                                    enum: [
                                        climateZones.DRY,
                                        climateZones.WET,
                                        climateZones.INTERMEDIATE,
                                    ],
                                },
                                months: {
                                    type: [Number],
                                    enum: [
                                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                                    ],
                                },
                            },
                            description: 'Single climate zone',
                            example: climateZones.WET,
                        },
                    ],
                    description: 'Different timezones where the crop grows',
                    example: [climateZones.DRY, climateZones.WET],
                },
                soil: {
                    type: {
                        _id: false,
                        min: {
                            type: Number,
                            min: 3.5,
                            max: 10,
                            description: 'Minimum soil PH value',
                            example: 4,
                        },
                        max: {
                            type: Number,
                            min: 3.5,
                            max: 10,
                            description: 'Maximum soil PH value',
                            example: 8,
                        },
                    },
                    description: 'Range of soil PH level suitable for the crop',
                },
                duration: {
                    type: {
                        _id: false,
                        min: {
                            type: Number,
                            min: 0,
                            description:
                                'Minimum number of days in crop duration',
                            example: 90,
                        },
                        max: {
                            type: Number,
                            min: 0,
                            description:
                                'Maximum number of days in crop duration',
                            example: 100,
                        },
                    },
                    description:
                        'Duration of the crop in number of days. ex- Carrot has a crop duration of 90-100 days',
                },
                long_term: {
                    // long term, short term
                    type: Boolean,
                    default: false,
                    description:
                        'Long term or short term... if long term - true, if short term - false',
                    example: true,
                },
            },
        },
        other: {
            description: 'This is more info about crop',
            type: {
                _id: false,
                extra: {
                    type: String,
                    description:
                        'Link of extra details on crop. Markdown file of data on crops',
                    example: 'https://xyz.com/crops/extra/carrot',
                },
                tutorials: {
                    type: [
                        {
                            type: {
                                name: {
                                    type: String,
                                    description: 'Name of the tutorial',
                                    example: 'Carrot Tutorial 01',
                                },
                                value: {
                                    type: String,
                                    description:
                                        'Link of the tutorial. Markdown file of data',
                                    example:
                                        'https://xyz.com/crops/extra/tutorials/12345',
                                },
                            },
                            description: 'A single tutorial in crop',
                        },
                    ],
                    description: 'Tutorials list for the crop',
                },
                videos: {
                    type: [
                        {
                            type: {
                                name: {
                                    type: String,
                                    description: 'Name of the video',
                                    example: 'Carrot video 01',
                                },
                                value: {
                                    type: String,
                                    description: 'Link of the video',
                                    example:
                                        'https://xyz.com/crops/extra/videos/12345',
                                },
                            },
                            description: 'A single video in crop',
                        },
                    ],
                    description: 'Videos list for the crop',
                },
            },
        },
    },
    {
        timestamps: true,
        //collection: 'crops',
    }
)

CropSchema.plugin(mongoosePaginate)

const CropModel = mongoose.model('Crop', CropSchema)

const m2sOptions = {
    props: ['example', 'format', 'min', 'max', 'default', 'readOnly'],
    //omitFields: ['_id'],
    omitMongooseInternals: false,
}

const edit = m2s(CropModel, m2sOptions)
// ------------------------------------------------
// Adding readonly property to non accessible Mongoose Internals fields (Readonly removes them from swagger post body object)
edit.properties._id.readOnly = true
edit.properties.createdAt.readOnly = true
edit.properties.updatedAt.readOnly = true
edit.properties.__v.readOnly = true
// ------------------------------------------------

// TODO export multiple schemas for different response types to use in swagger
export const cropSwaggerSchema = edit

//import util from 'util'
//console.log(util.inspect(cropSwaggerSchema, false, null, true))

// CropModel.schema.tree
// CropSchema.tree

export default CropModel
