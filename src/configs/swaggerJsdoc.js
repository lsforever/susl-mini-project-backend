/* eslint-disable no-undef */
import swaggerJsdoc from 'swagger-jsdoc'

import { cropSwaggerSchema } from '../models/Crop.js'
import { userSwaggerSchema } from '../models/User.js'
import { categorySwaggerSchema } from '../models/Category.js'

const optionsV1 = {
    //failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Agro API-V1 Docs',
            version: process.env.npm_package_version, //version: '1.0.0',
            description:
                'Agro Api Documentation. Check details from the routes. Use Base URL correctly. This is not a public API. Contact us if you want access to data.<br>V1 docs. <br> <br> Agro @2023',
            termsOfService: `${process.env.BASE_URL}/terms/`,
            contact: { email: 'lsforevergamer@gmail.com' },
        },
        servers: [
            {
                url: `${process.env.BASE_URL}/api/v1`,
                description: 'Agro API',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', //TODO change the capital letters to a good design
                    flows: {
                        implicit: {
                            authorizationUrl:
                                'https://example.com/api/oauth/dialog',
                            scopes: {
                                kkkk: 'modify pets in your account',
                                yyyy: 'read your pets',
                            },
                        },
                    },
                },
            },
            schemas: {
                [userSwaggerSchema.title]: userSwaggerSchema,
                [cropSwaggerSchema.title]: cropSwaggerSchema,
                [categorySwaggerSchema.title]: categorySwaggerSchema,
            },
        },
        // Enable this if auth is needed in every route globaly
        // security: [
        //     {
        //         bearerAuth: [],
        //     },
        // ],
        tags: [
            {
                name: 'Auth',
                description: 'Authorization related things',
            },
            {
                name: 'Users',
                description: 'User related things',
            },
            {
                name: 'Crops',
                description: 'Everything related to crops',
            },
            {
                name: 'Categories',
                description: 'Everything related to categories',
            },
        ],
        //TODO  add components (Schemas)
    },
    apis: ['./src/v1/routes/*.js', './src/app.js'],
}

const optionsV2 = {
    //failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Agro API-V2 Docs',
            version: process.env.npm_package_version, //version: '1.0.0',
            description:
                'Agro Api Version 2 is still in beta. Please refer to version 1.',
            termsOfService: `${process.env.BASE_URL}/terms/`,
            contact: { email: 'lsforevergamer@gmail.com' },
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
    apis: ['./src/v2/routes/*.js', './src/app.js'],
}

export const openapiSpecificationV1 = swaggerJsdoc(optionsV1)
export const openapiSpecificationV2 = swaggerJsdoc(optionsV2)

export default { openapiSpecificationV1, openapiSpecificationV2 }

export const setupOptions = {
    explorer: true,
    swaggerOptions: {
        urls: [
            {
                url: `${process.env.BASE_URL}/api/v1/doc/json`,
                name: 'v1',
            },
            {
                url: `${process.env.BASE_URL}/api/v2/doc/json`,
                name: 'v2',
            },
            {
                url: 'http://petstore.swagger.io/v2/swagger.json',
                name: 'example',
            },
        ],
    },
    customCssUrl:
        'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css',
    //customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Agro SL api docs',
    customfavIcon: `${process.env.BASE_URL}/static/favicon.ico`,
    customCss: `
    .topbar-wrapper img {content:url("${process.env.BASE_URL}/static/agro.png"); width:150px; height:auto;}
    .swagger-ui .topbar { background-color: #363636; } `,
    //customCss:
    // '.logo__img {background: url("https://w0.peakpx.com/wallpaper/229/806/HD-wallpaper-one-piece-gear-5-one-piece-monkey-d-luffy.jpg") no-repeat;display: block;-moz-box-sizing: border-box;box-sizing: border-box;width: 64px; /* Width of new image */height: 25px; /* Height of new image */padding-left: 64px; /* Equal to width of new image */}',
}

// {
//explorer: true,
//Theme List ==>'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x'
// customCssUrl:
//     'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css',
//     customCssUrl:
//         'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css',
// }
