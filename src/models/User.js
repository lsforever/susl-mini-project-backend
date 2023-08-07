import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
        collection: "user",
    }
);

UserSchema.plugin(passportLocalMongoose);
//User.plugin(passportLocalMongoose, { usernameField : 'email' });

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
