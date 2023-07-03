export class CategoryModel {
  _id: string;
  name: string;

  constructor(data: CategoryModel) {
    this._id = data._id;
    this.name = data.name;
  }
}
