import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounce, timer } from 'rxjs';
import { BookModel, CategoryModel } from 'src/app/shared/models';
import IQueryBookModel from 'src/app/shared/models/book/book-pagination.model';
import { BookGetResponse } from 'src/app/shared/models/book/book-response.model';
import { BookService, CategoryService } from 'src/app/shared/services';

@Component({
  selector: 'app-book-list-admin',
  templateUrl: './book-list-admin.component.html',
  styleUrls: ['./book-list-admin.component.scss'],
})
export class BookListAdminComponent implements OnInit {
  books: BookModel[];
  categories: CategoryModel[];
  query = {} as IQueryBookModel;
  page: number = 1;
  limit: number = 6;
  total: number = 0;
  search: string = '';
  searchForm: FormGroup;

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.getCategories();
    this.initForm();
  }

  private initForm() {
    let search = '';

    this.searchForm = new FormGroup({
      search: new FormControl(search),
    });

    this.searchForm.valueChanges
      .pipe(debounce(() => timer(1000)))
      .subscribe((form) => {
        this.search = form.search;
        this.getBooks();
      });

    this.getBooks();
  }

  getBooks() {
    this.query.limit = this.limit;
    this.query.page = this.page;
    this.query.search = this.search;
    this.bookService
      .getBook(this.limit, this.page, this.search)
      .subscribe((response: BookGetResponse) => {
        this.books = response.items;
        this.total = response.totalItems;
      });
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe((response: CategoryModel[]) => {
        this.categories = response;
      });
  }

  onDeleteBook(id: string) {
    this.bookService.delete(id).subscribe((res) => {
      this.books = this.books.filter((book) => {
        return book.id.toString() !== id;
      });
    });
  }

  onNewBook() {
    this.router.navigate(['books/management/book-create']);
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.getBooks();
  }
}
