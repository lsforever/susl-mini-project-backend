import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    //failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Agro API v1',
            // eslint-disable-next-line no-undef
            version: process.env.npm_package_version, //version: '1.0.0',
            description: 'Agro Api application',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', //TODO change the capital letters to a good design
                },
            },
        },
        // security: [
        //     {
        //         bearerAuth: [],
        //     },
        // ],
    },
    apis: ['./src/v1/routes/*.js', './src/app.js'],
}

const openapiSpecification = swaggerJsdoc(options)

export default openapiSpecification
