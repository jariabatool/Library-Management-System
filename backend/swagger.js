module.exports = {
    swagger: '2.0',
    info: {
      version: '1.0.0',
      title: 'Library Management API',
      description: 'API Documentation for the Library Management System',
    },
    host: 'localhost:5000',
    basePath: '/',
    tags: [
      {
        name: 'Users',
        description: 'User management',
      },
      {
        name: 'Books',
        description: 'Book management',
      },
    ],
    schemes: ['http'],
    paths: {
      '/users/register': {
        post: {
          tags: ['Users'],
          summary: 'Register a new user',
          parameters: [
            {
              name: 'body',
              in: 'body',
              required: true,
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                  contact: { type: 'string' },
                },
                required: ['name', 'email', 'password', 'contact'],
              },
            },
          ],
          responses: {
            201: { description: 'User registered successfully' },
            400: { description: 'Error registering user' },
          },
        },
      },
    },
  };
  