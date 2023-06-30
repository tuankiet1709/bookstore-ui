// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const baseUrl = 'http://localhost:3080';

export const environment = {
  production: false,
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
