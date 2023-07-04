import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { exhaustMap, of, switchMap } from 'rxjs';
import { BookModel, CategoryModel } from 'src/app/shared/models';
import { IBookCreate } from 'src/app/shared/models/book/book-create.model';
import { BookService, CategoryService } from 'src/app/shared/services';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss'],
})
export class BookCreateComponent implements OnInit {
  id: string = '';
  book: BookModel;
  categories: CategoryModel[] = [];
  editMode = false;
  bookForm: FormGroup;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          if (this.editMode) {
            return this.bookService.getById(params['id']);
          } else {
            return of(null);
          }
        })
      )
      .subscribe((book: BookModel | null) => {
        if (book) {
          this.book = book;
          this.bookForm = new FormGroup({
            title: new FormControl(book.title, Validators.required),
            price: new FormControl(book.price, Validators.required),
            quantity: new FormControl(book.quantity, Validators.required),
            image: new FormControl(book.image, Validators.required),
            description: new FormControl(book.description, Validators.required),
            author: new FormControl(book.author, Validators.required),
            category: new FormControl(book.category._id, Validators.required),
          });
        } else {
          this.bookForm = new FormGroup({
            title: new FormControl('', Validators.required),
            price: new FormControl(0, Validators.required),
            quantity: new FormControl(0, Validators.required),
            image: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            author: new FormControl('', Validators.required),
            category: new FormControl('', Validators.required),
          });
        }
      });
    this.getCategories();
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe((response: CategoryModel[]) => {
        this.categories = response;
      });
  }

  onSubmit() {
    const formData = this.bookForm.value;

    if (this.editMode) {
      const bookUpdate: IBookCreate = {
        title: formData.title,
        price: parseInt(formData.price),
        image: formData.image,
        description: formData.description,
        quantity: parseInt(formData.quantity),
        author: formData.author,
        category: formData.category,
      };

      this.bookService.updateBook(this.id, bookUpdate).subscribe((res) => {
        this.router.navigate(['books/management/book-list']);
      });
    } else {
      const bookCreate: IBookCreate = {
        title: formData.title,
        price: parseInt(formData.price),
        image: formData.image,
        description: formData.description,
        quantity: parseInt(formData.quantity),
        author: formData.author,
        category: formData.category,
      };

      this.bookService.createBook(bookCreate).subscribe((res) => {
        this.router.navigate(['books/management/book-list']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['books/management/book-list']);
  }
}
