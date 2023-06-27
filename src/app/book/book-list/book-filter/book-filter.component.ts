import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryModel } from 'src/app/shared/models';
import { CategoryService } from 'src/app/shared/services';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss'],
})
export class BookFilterComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>();

  categories: CategoryModel[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe((response: CategoryModel[]) => {
        this.categories = response;
      });
  }

  onShowCategory(categoryId: string) {
    this.showCategory.next(categoryId);
  }
}
