/* eslint-disable no-undef */
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import User from '../models/User.js'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

const passportConfig = () => {
    // =======================================
    // Local Strategy
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            User.authenticate()
        )
    )
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())

    // =======================================
    // JWT Strategy
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    // eslint-disable-next-line no-undef
    opts.secretOrKey = process.env.JWT_SECRET_KEY
    // eslint-disable-next-line no-undef
    //opts.secretOrKey = process.env.JWT_ISSUER
    // eslint-disable-next-line no-undef
    //opts.issuer = process.env.JWT_AUDIENCE

    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                var user = await User.findOne({ email: jwt_payload.email })

                if (jwt_payload.expire <= Date.now()) {
                    return done(new Error('Token Expired'), null)
                }

                user = user.toObject()
                user.payload = jwt_payload
                //console.log(user)

                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                    // or you could create a new account
                }
            } catch (error) {
                return done(error, false)
            }
        })
    )

    // Google Strategy

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL:
                    process.env.BASE_URL + '/api/v1/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, cb) => {
                try {
                    var { sub, name, email, picture } = profile._json
                    var user = await User.findOne({ email: email })
                    // User.findOrCreate(
                    //     { googleId: profile.id },
                    //     function (err, user) {
                    //         return cb(err, user)
                    //     }
                    // )

                    if (!user) {
                        user = await User.create({
                            email,
                            name,
                            photo: picture,
                            googleId: sub,
                        })
                    }
                    cb(null, user)
                } catch (error) {
                    return cb(error, false)
                }
            }
        )
    )
}

export default passportConfig
