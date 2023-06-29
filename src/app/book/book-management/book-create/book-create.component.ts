import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      this.getCategories();
    });
  }

  private initForm() {
    let title = '';
    let price = 0;
    let quantity = 0;
    let image = '';
    let description = '';
    let author = '';
    let category = '';

    if (this.editMode) {
      this.bookService.getById(this.id).subscribe((res) => {
        console.log(res);
        this.book = res;

        title = res.title;
        price = res.price;
        quantity = res.quantity;
        image = res.image;
        description = res.description;
        author = res.author;
        category = res.category._id;

        this.bookForm = new FormGroup({
          title: new FormControl(title, Validators.required),
          price: new FormControl(price, Validators.required),
          quantity: new FormControl(quantity, Validators.required),
          image: new FormControl(image, Validators.required),
          description: new FormControl(description, Validators.required),
          author: new FormControl(author, Validators.required),
          category: new FormControl(category, Validators.required),
        });
      });
    } else {
      this.bookForm = new FormGroup({
        title: new FormControl(title, Validators.required),
        price: new FormControl(price, Validators.required),
        quantity: new FormControl(quantity, Validators.required),
        image: new FormControl(image, Validators.required),
        description: new FormControl(description, Validators.required),
        author: new FormControl(author, Validators.required),
        category: new FormControl(category, Validators.required),
      });
    }
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
    console.log(formData);

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

      console.log(bookUpdate);

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
