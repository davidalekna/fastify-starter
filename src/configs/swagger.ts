export const swaggerConfig = ({ host = 'localhost' } = {}) => {
  return {
    routePrefix: '/docs',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Checkout',
        description: 'Checkout API',
        version: '0.1.0',
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      host,
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      definitions: {},
      securityDefinitions: {},
    },
  };
};
