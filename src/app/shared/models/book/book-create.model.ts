import { CategoryModel } from '../category/category.model';

export interface IBookCreate {
  title: string;
  image: string;
  quantity: number;
  price: number;
  description: string;
  author: string;
  category: CategoryModel;
}
