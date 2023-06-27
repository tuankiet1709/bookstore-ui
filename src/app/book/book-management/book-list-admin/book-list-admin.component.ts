import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookModel, CategoryModel } from 'src/app/shared/models';
import IQueryBookModel from 'src/app/shared/models/book/book-pagination.model';
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
  p: number = 1;
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

    this.searchForm.valueChanges.subscribe((form) => {
      this.search = form.search;
      this.getBooks();
    });
  }

  getBooks() {
    this.query.limit = this.limit;
    this.query.page = this.p;
    this.query.search = this.search;
    this.bookService.getBook().subscribe((response: BookModel[]) => {
      this.books = response;
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
}
