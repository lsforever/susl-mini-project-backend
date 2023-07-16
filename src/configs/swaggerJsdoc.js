import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  //failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'CHAOS API V1',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes*.js', './src/app.js'],
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;
