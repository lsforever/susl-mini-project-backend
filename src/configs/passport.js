import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import User from '../models/User.js'

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
        new JwtStrategy(opts, async function (jwt_payload, done) {
            console.log('aaaaaaa')
            try {
                var user = await User.findOne({ email: jwt_payload.email })

                // if (jwt_payload.expire <= Date.now()) {
                //     return done(new Error('TokenExpired'), null)
                // }

                //user = user.toObject()
                //user.payload = jwt_payload
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
}

export default passportConfig
