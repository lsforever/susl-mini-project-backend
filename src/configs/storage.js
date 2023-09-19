/* eslint-disable no-undef */
import { Storage } from '@google-cloud/storage'

// const storage = new Storage({
//     projectId: process.env.G_PROJECT_ID,
//     credentials: {
//         type: process.env.G_TYPE,
//         project_id: process.env.G_PROJECT_ID,
//         private_key_id: process.env.G_PRIVATE_KEY_ID,
//         private_key: process.env.G_PRIVATE_KEY.replace(/\\n/g, '\n'),
//         client_email: process.env.G_CLIENT_EMAIL,
//         client_id: process.env.G_CLIENT_ID,
//         auth_uri: process.env.G_AUTH_URI,
//         token_uri: process.env.G_TOKEN_URI,
//         auth_provider_x509_cert_url: process.env.G_AUTH_PROVIDER_X509_CERT_URL,
//         client_x509_cert_url: process.env.G_CLIENT_X509_CERT_URL,
//         universe_domain: process.env.G_UNIVERSE_DOMAIN,
//     },
// })

const storage = new Storage({
    projectId: 'agro-project-396117',
    credentials: {
        type: 'service_account',
        project_id: 'agro-project-396117',
        private_key_id: 'd485a4f876fdb79d8adcb2976579072f653d966f',
        private_key:
            '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDKvWb7RMIyAwcH\nldC4+IK+jOT5vvsXSR/TfWVu0megcswXAzeGqOYQkG17vQTgL6azLCOTpihFXtXP\na5THtB/SvLbl0OZHAPJ36EWkSzclVh+B97cH+vKR1/rxxm+wlDWr3QYxQ5mJdEVU\nuAALvRt8wjxLYO30geXe9UkxB3uxc9IHT2uIirqDwga96zntvKTzinm26GnLEDiu\nLj43+4/4ES5KmxmfHSvaZCzS7Lf7Ur0zlGTFRAKEi4z9IAVubW5GO2V7RA5LvISb\nLmCwAYNBeTJ6ySgDeije0dRqSfhqiJWQAo9BdWlC10SLkd9F6zL4Pq8qHZqDeibF\nKN6x7E+HAgMBAAECggEAKSJur5KO2DjXB0n1VGJPnLvXhXijV2ElzPJHT0nvbpV8\nJTso2/CO5VN4cz+xqo7ggr/04/M1foW0WeZZBH/eaRKTBWPyJPvjNkLxRllgcfnc\nYLFS+JKI/uBUcROy+5/Gl/07UWmG0GW/32WJ1NfkqNZ8B0s+XHqymh8oX4NGLIWX\nV1Otu1gbWfwrYfUM6QDuU6jZP8g39WSauLwwrFbRnIAgv80eYH62+k4OEpLZ6Bqx\ntuoE8f4LSNprpE4YTnpaU+DVjJsHyF927bUmfM/SMnOCT3UR8lEdfu+ZxJUqfKKQ\n5aJwPcmFqsmTIq3BH3IM3BpNDQhccMf/L/kaHTvt2QKBgQD+c+owp2KC589lxGpb\nly9Qz5EJEPXVo+FVfupdrBSg2DD7sKAFSriTXXfzFvH/6GoT+R0aR9W5Zou0fLDb\nsIQW1pvrMfXT1Tc+wPQ8UZT0yZATbucE+n61zqGL+0MjtAU5DhQ8JslYQ7Hoxn2B\nW9dGUYZGCGzaViduhOojiQBMrQKBgQDL+P2EDsTwKVjaMMTVDq+IsDmmFLedCTI8\nM5RTR+5xiNhgWMGHxl2i7CTDQwSCYS2C5340j6nASrqCEDxm231lkBlHn+lHvUmz\nLxI6WxtPmpcIinrvlcY4Uq9MEaJexrQUP8rTUj1CfSEf2e6d2RMXNysiFWZA+Sjn\na4nLddC/gwKBgA904Rv1fwFurWWEKeXIaEJjaW8Ajb5dhxmXbQslodcnaspPL1lC\n8bVZ7yhgE3E1IAR4lHD9PhlWBlR/YorlzRBKFwyRa1pj0EhKlkt3tTGtcMgNa5Ec\n2keW9q83IxvvGoYdudLxlDd9XThDnmoWNxx5ZUupxVr58sk+364q6069AoGBAMlz\nnjdKOvmTbJz6o7xlp7pRim5ccchYJ9RLgQgLuBVL+aCWqHWH1j0uC1UKoK6Aeema\n5wvUg+xWIgSJMo7H4v5nJoCWEFl5OwwMxmz6RGwHm3mlA6wS+dXw3A8+L2Z5y6tg\nIds6kyRS319M553gojlAlIoyJm6vZtXBYTOgpc4vAoGBAPvWR6CK+5dFiZe/Sz4L\nNXgCNEizC50+d/QqSi+QrY2626qDszS2aZSnvxvwbfXhhTjGkbnZ12zTpWjUg4Pc\n+P/Ky5u4RB2WrmMZBuKqzZy5bgILGAF8a6uozFw11tYF4fl22dXU/j4VYiWr8Dt7\nU1c1+/uka7EGeJ/9bBIkzXvH\n-----END PRIVATE KEY-----\n',
        client_email: 'agro-project-396117@appspot.gserviceaccount.com',
        client_id: '108351687330229284411',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url:
            'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url:
            'https://www.googleapis.com/robot/v1/metadata/x509/agro-project-396117%40appspot.gserviceaccount.com',
        universe_domain: 'googleapis.com',
    },
})

//export const bucket = storage.bucket(process.env.G_BUCKET_NAME)
export const bucket = storage.bucket('staging.agro-project-396117.appspot.com')

export default storage
