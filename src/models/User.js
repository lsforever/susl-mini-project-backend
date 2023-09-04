import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { roles } from '../constants/index.js'

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        emailVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        role: {
            type: String,
            default: roles.USER,
            enum: [roles.ADMIN, roles.USER, roles.OWNER],
        },
        token: {
            type: String,
        },
        phone: {
            type: String,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        photo: {
            type: String,
        },
        googleId: {
            type: String,
            unique: true,
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
