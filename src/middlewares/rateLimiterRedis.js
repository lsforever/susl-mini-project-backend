import rateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import { createClient } from 'redis'

// Create a `node-redis` client
const client = createClient({
    // ... (see https://github.com/redis/node-redis/blob/master/docs/client-configuration.md)

    socket: {
        port: 6379,
        host: 'client',
    },
})

// Then connect to the Redis server
await client.connect()

// Create and use the rate limiter
const limiter = rateLimit({
    // Rate limiter configuration
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers

    // Redis store configuration
    store: new RedisStore({
        sendCommand: (...args) => client.sendCommand(args),
    }),
})

export default limiter
