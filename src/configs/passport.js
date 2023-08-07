import { JwtStrategy, ExtractJwt } from "passport-jwt";
import "dotenv/config";

// JWT Strategy
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;
opts.secretOrKey = process.env.JWT_ISSUER;
opts.issuer = process.env.JWT_AUDIENCE;

passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.sub }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    })
);
