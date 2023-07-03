const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  auth: {
    login: baseUrl + '/api/users/login',
    register: baseUrl + '/api/users/register',
  },
  book: {
    get: baseUrl + '/books?limit={limit}&page={page}&search={search}',
    getDetail: baseUrl + '/books/{id}',
    getByCategory: baseUrl + '/books?categoryId={categoryId}',
    createBook: baseUrl + '/books',
    editBook: baseUrl + '/books/{id}',
    deleteBook: baseUrl + '/books/{id}',
  },
  category: {
    get: baseUrl + '/categories',
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
