import swaggerAutoGen from 'swagger-autogen'

const doc = {
  info: {
    title: 'Library API',
    description: 'Library API Documentation',
  },
  host: process.env.BASE_URL || 'localhost:3000',
  schemes: ['http', 'https'],
}

const outputFile = './swagger.json'
const endpointFiles = ['./index.js']

swaggerAutoGen()(outputFile, endpointFiles, doc)
