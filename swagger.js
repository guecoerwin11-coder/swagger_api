const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger Demo API',
      version: '1.0.0',
      description: 'A REST API with Auth and Products, documented with Swagger'
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Development server' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        RegisterInput: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            password: { type: 'string', example: '123456' },
            role: { type: 'string', enum: ['customer', 'admin'], example: 'customer' }
          }
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'john@example.com' },
            password: { type: 'string', example: '123456' }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Login successful!' },
            token: { type: 'string', example: 'eyJhbGci...' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string', example: '64f1a2b3...' },
                name: { type: 'string', example: 'John Doe' },
                email: { type: 'string', example: 'john@example.com' },
                role: { type: 'string', example: 'customer' }
              }
            }
          }
        },
        Product: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '64f1a2b3...' },
            name: { type: 'string', example: 'Laptop' },
            description: { type: 'string', example: 'A powerful laptop' },
            price: { type: 'number', example: 999 },
            category: { type: 'string', example: 'Electronics' },
            stock: { type: 'number', example: 50 },
            createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' }
          }
        },
        CreateProductInput: {
          type: 'object',
          required: ['name', 'description', 'price', 'category'],
          properties: {
            name: { type: 'string', example: 'Laptop' },
            description: { type: 'string', example: 'A powerful laptop' },
            price: { type: 'number', example: 999 },
            category: { type: 'string', example: 'Electronics' },
            stock: { type: 'number', example: 50 }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Something went wrong' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
}

module.exports = swaggerJsdoc(options)