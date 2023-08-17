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

const UserModel = mongoose.model('User', UserSchema)
export default UserModel

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
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlIjp7ImlkIjoiMTAyNjg2NzczODk4MjU4NTU2MjE1IiwiZGlzcGxheU5hbWUiOiJ0YW5rYSBtYWxpbiIsIm5hbWUiOnsiZmFtaWx5TmFtZSI6Im1hbGluIiwiZ2l2ZW5OYW1lIjoidGFua2EifSwiZW1haWxzIjpbeyJ2YWx1ZSI6InRhbmthbWFsaW5AZ21haWwuY29tIiwidmVyaWZpZWQiOnRydWV9XSwicGhvdG9zIjpbeyJ2YWx1ZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBY0hUdGRsMFJQZlVFQUdaZXlrTlg5S2pZZnpnR3lzcmp1c3lKazJUWkhISWpSbj1zOTYtYyJ9XSwicHJvdmlkZXIiOiJnb29nbGUiLCJfcmF3Ijoie1xuICBcInN1YlwiOiBcIjEwMjY4Njc3Mzg5ODI1ODU1NjIxNVwiLFxuICBcIm5hbWVcIjogXCJ0YW5rYSBtYWxpblwiLFxuICBcImdpdmVuX25hbWVcIjogXCJ0YW5rYVwiLFxuICBcImZhbWlseV9uYW1lXCI6IFwibWFsaW5cIixcbiAgXCJwaWN0dXJlXCI6IFwiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZGwwUlBmVUVBR1pleWtOWDlLallmemdHeXNyanVzeUprMlRaSEhJalJuXFx1MDAzZHM5Ni1jXCIsXG4gIFwiZW1haWxcIjogXCJ0YW5rYW1hbGluQGdtYWlsLmNvbVwiLFxuICBcImVtYWlsX3ZlcmlmaWVkXCI6IHRydWUsXG4gIFwibG9jYWxlXCI6IFwiZW5cIlxufSIsIl9qc29uIjp7InN1YiI6IjEwMjY4Njc3Mzg5ODI1ODU1NjIxNSIsIm5hbWUiOiJ0YW5rYSBtYWxpbiIsImdpdmVuX25hbWUiOiJ0YW5rYSIsImZhbWlseV9uYW1lIjoibWFsaW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZGwwUlBmVUVBR1pleWtOWDlLallmemdHeXNyanVzeUprMlRaSEhJalJuPXM5Ni1jIiwiZW1haWwiOiJ0YW5rYW1hbGluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJsb2NhbGUiOiJlbiJ9fSwiZXhwaXJlIjoxNjkyODI0OTkyMjA4LCJpYXQiOjE2OTIyMjAxOTJ9.dHp_eg1tdujFRW3b2m7bP6rcL2c6EUBfNX2wLohsGqs',
// }
// TODO remove above comments
