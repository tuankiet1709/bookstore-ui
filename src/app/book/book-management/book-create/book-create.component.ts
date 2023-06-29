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
    let category = '1';

    if (this.editMode) {
      this.bookService.getBookDetail(this.id).subscribe((res) => {
        this.book = res;

        title = res.title.toString();
        price = parseInt(res.price.toString());
        quantity = parseInt(res.quantity.toString());
        image = res.image.toString();
        description = res.description.toString();
        author = res.author.toString();
        category = res.category._id.toString();

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
    const category = this.categories.filter(
      (category) => category._id === formData.category
    );

    if (this.editMode) {
      const bookUpdate: IBookCreate = {
        title: formData.title,
        price: parseInt(formData.price),
        image: formData.image,
        description: formData.description,
        quantity: parseInt(formData.quantity),
        author: formData.author,
        category: category[0],
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
        category: category[0],
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
