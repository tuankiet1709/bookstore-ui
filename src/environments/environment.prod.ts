const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  auth: {
    login: baseUrl + '/api/users/login',
    register: baseUrl + '/api/users/register',
  },
  book: {
    get: baseUrl + '/book?limit={limit}&page={page}&search={search}',
    getDetail: baseUrl + '/book/{id}',
    getByCategory: baseUrl + '/book?categoryId={categoryId}',
    createBook: baseUrl + '/book',
    editBook: baseUrl + '/book/{id}',
    deleteBook: baseUrl + '/book/{id}',
  },
  category: {
    get: baseUrl + '/category',
  },
  cart: {
    get: baseUrl + '/cart?email={email}',
    addToCart: baseUrl + '/cart',
    updateQuantity: baseUrl + '/cart/{id}',
    removeFromCart: baseUrl + '/cart/{id}',
    clearCart: baseUrl + '/cart/clear?email={email}',
    checkout: baseUrl + '/cart/checkout?email={email}',
  },
};
