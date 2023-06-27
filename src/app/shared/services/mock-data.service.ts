import {
  InMemoryDbService,
  RequestInfo,
  ResponseOptions,
} from 'angular-in-memory-web-api';
import { books, carts, categories, users } from '../data';
import { BookModel, CartItemModel, CategoryModel, UserModel } from '../models';
import { Observable } from 'rxjs';

export class InMemoryDataService extends InMemoryDbService {
  createDb(): {
    books: BookModel[];
    categories: CategoryModel[];
    carts: CartItemModel[];
    users: UserModel[];
  } {
    return {
      books,
      categories,
      carts,
      users,
    };
  }

  post(reqInfo: RequestInfo): Observable<any> | undefined {
    if (reqInfo.collectionName === 'users' && reqInfo.id === 'login') {
      const { email, password } = reqInfo.utils.getJsonBody(reqInfo.req);

      const users = reqInfo.collection as any[];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        const response: ResponseOptions = {
          body: {
            userId: user.id,
            token: 'this-is-the-token',
            expireAt: '86400',
            name: user.name,
            role: user.role,
          },
          status: 200,
        };
        return reqInfo.utils.createResponse$(() => response);
      } else {
        const response: ResponseOptions = {
          body: { error: 'Invalid email or password' },
          status: 401,
        };

        return reqInfo.utils.createResponse$(() => response);
      }
    }

    return undefined;
  }
}
