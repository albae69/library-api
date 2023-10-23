import swaggerAutoGen from 'swagger-autogen'

const doc = {
  info: {
    title: 'Library API',
    description: 'Library API Documentation',
  },
  // host: 'localhost:3000',
  host: 'api-library.cyclic.app',
  schemes: [
    // 'http',
    'https',
  ],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  definitions: {
    login: {
      $email: 'string',
      $password: 'string',
    },
    register: {
      $name: 'string',
      $email: 'string',
      $password: 'string',
      $isAdmin: false,
    },
    createBook: {
      $title: 'string',
      $author: 'string',
      $price: 0,
      $stock: 0,
    },
    createOrder: {
      $total_price: 0,
    },
    createOrderItem: {
      $order_items: [{ $order_id: 0, $book_id: 0, $quantity: 0, $price: 0 }],
    },
    createPayment: {
      $order_id: 0,
      $total_price: 0,
    },
    updateUser: {
      $name: 'string',
      $email: 'string',
      $password: 'string',
      $isAdmin: false,
    },
  },
}

const outputFile = './swagger.json'
const endpointFiles = ['./index.js']

swaggerAutoGen()(outputFile, endpointFiles, doc)
