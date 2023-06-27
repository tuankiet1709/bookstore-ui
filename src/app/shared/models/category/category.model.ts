export class CategoryModel {
  id: string;
  name: string;

  constructor(data: CategoryModel) {
    this.id = data.id;
    this.name = data.name;
  }
}
