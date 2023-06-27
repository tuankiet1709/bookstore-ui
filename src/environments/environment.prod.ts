const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  auth: {
    login: baseUrl + '/api/users/login',
    register: baseUrl + '/api/users/register',
  },
  book: {
    get: baseUrl + '/api/books',
    getDetail: baseUrl + '/api/books/{id}',
  },
  category: {
    get: baseUrl + '/api/categories',
  },
  cart: {
    get: baseUrl + '/api/carts',
  },
};
