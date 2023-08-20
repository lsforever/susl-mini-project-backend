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
    opts.secretOrKey = process.env.JWT_SECRET_KEY
    //opts.secretOrKey = process.env.JWT_ISSUER
    //opts.issuer = process.env.JWT_AUDIENCE

    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                // TODO we can cross reference with token stored in user model to invalidate outdated tokens. But this will lead in one more database trip. Also this invvalidates the JWT decentralized principle. It will invalidate the usage that we used JWT in the first place... We can implement it if needed. But then we should save last issued token at the controllers and it should be cross validated in here.
                //var user = await User.findOne({ _id: jwt_payload._id })

                if (jwt_payload.expire <= Date.now()) {
                    return done(new Error('Token Expired'), null)
                }

                //user = user.toObject()
                //user.payload = jwt_payload
                //console.log(user)
                var user = jwt_payload

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
                    var { sub, name, email, picture, email_verified } =
                        profile._json
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
                            emailVerified: email_verified,
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
