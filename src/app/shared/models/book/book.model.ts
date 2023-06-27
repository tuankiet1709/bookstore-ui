import { CategoryModel } from '../category/category.model';

export class BookModel {
  id: number;
  title: string;
  image: string;
  quantity: number;
  price: number;
  description: string;
  author: string;
  category: CategoryModel;
  isDelete: Boolean;

  constructor(data: BookModel) {
    this.id = data.id;
    this.title = data.title;
    this.image = data.image;
    this.quantity = data.quantity;
    this.price = data.price;
    this.description = data.description;
    this.author = data.author;
    this.category = data.category;
    this.isDelete = data.isDelete;
  }
}
