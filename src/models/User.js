import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: false,
            unique: false,
        },
        name: {
            type: String,
            required: true,
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

const UserModel = mongoose.model('User', UserSchema)
export default UserModel
