import mongoose from 'mongoose'
import m2s from 'mongoose-to-swagger'
import mongoosePaginate from 'mongoose-paginate-v2'
import CropModel from './Crop.js'
const CategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            description: 'Category name',
            example: 'Vegetables',
        },
        image: {
            type: String,
            unique: true,
            description: 'Category Image Link',
            example:
                'https://storage.googleapis.com/sggs.kkk-hshhs-562436.appspot.com/category/images/veg.jpeg',
        },
    },
    {
        timestamps: true,
    }
)
CategorySchema.plugin(mongoosePaginate)

// CategorySchema.pre('deleteOne', { document: true }, async function (next) {
//     var category = this
//     await CropModel.deleteMany({ category: category._id })
//     next()
// })

CategorySchema.pre('findOneAndDelete', async function (next) {
    var category_id = this._conditions._id
    await CropModel.deleteMany({ category: category_id })
    next()
})

const CategoryModel = mongoose.model('Category', CategorySchema)

const m2sOptions = {
    props: ['example', 'format', 'min', 'max', 'default', 'readOnly'],
    //omitFields: ['_id'],
    omitMongooseInternals: false,
}

const edit = m2s(CategoryModel, m2sOptions)
// ------------------------------------------------
// Adding readonly property to non accessible Mongoose Internals fields (Readonly removes them from swagger post body object)
edit.properties._id.readOnly = true
edit.properties.createdAt.readOnly = true
edit.properties.updatedAt.readOnly = true
edit.properties.__v.readOnly = true
// ------------------------------------------------

export const categorySwaggerSchema = edit

export default CategoryModel
