import { UserModel } from '../models';

export const users: UserModel[] = [
  {
    id: 1,
    email: 'admin@gmail.com',
    password: 'Admin@1234',
    name: 'admin',
    role: 'admin',
  },
  {
    id: 2,
    email: 'client@gmail.com',
    password: 'Client@1234',
    name: 'client',
    role: 'client',
  },
];
