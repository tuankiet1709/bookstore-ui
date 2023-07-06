// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const baseUrl = 'http://localhost:3080';
const authUrl = 'http://localhost:8080';

export const environment = {
  production: false,
  auth: {
    login: authUrl + '/auth/realms/demo/protocol/openid-connect/token',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
