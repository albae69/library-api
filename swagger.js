import swaggerAutoGen from 'swagger-autogen'

const doc = {
  info: {
    title: 'Library API',
    description: 'Library API Documentation',
  },
  host: 'https://api-library.cyclic.app',
  schemes: ['http', 'https'],
}

const outputFile = './swagger.json'
const endpointFiles = ['./index.js']

swaggerAutoGen()(outputFile, endpointFiles, doc)
