import swaggerAutoGen from 'swagger-autogen'

const doc = {
  info: {
    title: 'Library API',
    description: 'Library API Documentation',
  },
  host: 'localhost:3000',
  // host: 'api-library.cyclic.app',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
}

const outputFile = './swagger.json'
const endpointFiles = ['./index.js']

swaggerAutoGen()(outputFile, endpointFiles, doc)
