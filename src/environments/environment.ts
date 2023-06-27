// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
