import mongoose from 'mongoose'
import m2s from 'mongoose-to-swagger'

const CategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            description: 'Category name',
            example: 'Vegetables',
        },
    },
    {
        timestamps: true,
    }
)

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
