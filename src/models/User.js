import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { roles } from '../constants/index.js'
import m2s from 'mongoose-to-swagger'

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            description: 'Email of the user',
            example: 'john@xyz.com',
            format: 'email',
            //pattern: [x-y]
            //minimum: 0
        },
        emailVerified: {
            type: Boolean,
            required: true,
            default: false,
            description: 'If user has verified email or not',
            example: true,
        },
        role: {
            type: String,
            default: roles.USER,
            enum: [roles.USER, roles.ADMIN, roles.OWNER],
            description: 'Role of the user',
            example: roles.USER,
        },
        token: {
            type: String,
        },
        phone: {
            type: String,
            unique: true,
            description: 'Phone number of the user',
            example: '+94776417754',
            // Add match regex pattern for the phone number
        },
        name: {
            type: String,
            required: true,
            unique: true,
            description: 'Name of the user',
            example: 'John',
        },
        photo: {
            type: String,
            description: 'Link of the photo of user',
            example: 'https://xyz.com/img/john123',
        },
        googleId: {
            type: String,
            unique: true,
            description: 'Google ID of the user',
            example: '103486752882118666135',
        },
    },
    {
        timestamps: true,
        //collection: 'users',
    }
)

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    hashField: 'password',
})

UserSchema.plugin(mongoosePaginate)

const UserModel = mongoose.model('User', UserSchema)

const m2sOptions = {
    props: ['example', 'format', 'min', 'max', 'default', 'readOnly'],
    omitFields: ['token', 'password', 'salt'],
    omitMongooseInternals: false,
}

const edit = m2s(UserModel, m2sOptions)
// ------------------------------------------------
// Adding readonly property to non accessible Mongoose Internals fields (Readonly removes them from swagger post body object)
edit.properties._id.readOnly = true
edit.properties.createdAt.readOnly = true
edit.properties.updatedAt.readOnly = true
edit.properties.__v.readOnly = true
// ------------------------------------------------

export const userSwaggerSchema = edit

export default UserModel

// TODO in user controller, remove role field or add permission. Also use .select('-token') to stop sending token in the get requests.

// const aaa = {
//     profile: {
//         id: '102686773898258556215',
//         displayName: 'tanka malin',
//         name: { familyName: 'malin', givenName: 'tanka' },
//         emails: [{ value: 'tankamalin@gmail.com', verified: true }],
//         photos: [
//             {
//                 value: 'https://lh3.googleusercontent.com/a/AAcHTtdl0RPfUEAGZeykNX9KjYfzgGysrjusyJk2TZHHIjRn=s96-c',
//             },
//         ],
//         provider: 'google',
//         _raw: '{\n  "sub": "102686773898258556215",\n  "name": "tanka malin",\n  "given_name": "tanka",\n  "family_name": "malin",\n  "picture": "https://lh3.googleusercontent.com/a/AAcHTtdl0RPfUEAGZeykNX9KjYfzgGysrjusyJk2TZHHIjRn\\u003ds96-c",\n  "email": "tankamalin@gmail.com",\n  "email_verified": true,\n  "locale": "en"\n}',
//         _json: {
//             sub: '102686773898258556215',
//             name: 'tanka malin',
//             given_name: 'tanka',
//             family_name: 'malin',
//             picture:
//                 'https://lh3.googleusercontent.com/a/AAcHTtdl0RPfUEAGZeykNX9KjYfzgGysrjusyJk2TZHHIjRn=s96-c',
//             email: 'tankamalin@gmail.com',
//             email_verified: true,
//             locale: 'en',
//         },
//     },
//     token: 'sedhjhflwkqajfwksjfalkjfksjfakljfkjfaljfelkfjal',
// }
// TODO remove above comments
