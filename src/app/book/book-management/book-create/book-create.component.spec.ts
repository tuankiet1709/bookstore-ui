import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCreateComponent } from './book-create.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrencyPipe } from '@angular/common';
import { BookService, CategoryService } from 'src/app/shared/services';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('BookCreateComponent', () => {
  let component: BookCreateComponent;
  let fixture: ComponentFixture<BookCreateComponent>;
  let router: Router;

  const bookService = {
    getBookDetail: () => {
      return of({
        id: 3,
        title: 'Book 3',
        image:
          'https://cdn.shopify.com/s/files/1/0020/1850/8859/products/TheBookflat_a.jpg?v=1653481303',
        quantity: 1,
        price: 1,
        description: 'This is book description',
        author: 'author',
        category: {
          id: 2,
          name: 'Comedy',
        },
        isDelete: true,
      });
    },
    createBook: () => {
      return of(null);
    },
    updateBook: () => {
      return of(null);
    },
  };

  const categoryService = {
    getCategories: () => {
      return of([
        {
          id: '1',
          name: 'Drama',
        },
        {
          id: '2',
          name: 'Comedy',
        },
        {
          id: '3',
          name: 'Sport',
        },
      ]);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCreateComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
      providers: [
        CurrencyPipe,
        {
          provide: BookService,
          useValue: bookService,
        },
        {
          provide: CategoryService,
          useValue: categoryService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCreateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form in edit mode', () => {
    const expectedResult = {
      id: 3,
      title: 'Book 3',
      image:
        'https://cdn.shopify.com/s/files/1/0020/1850/8859/products/TheBookflat_a.jpg?v=1653481303',
      quantity: 1,
      price: 1,
      description: 'This is book description',
      author: 'author',
      category: {
        id: 2,
        name: 'Comedy',
      },
      isDelete: true,
    };
    const params: Params = { id: '3' };
    const activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.params = of(params);

    component.ngOnInit();

    expect(component.bookForm.value.title).toEqual(expectedResult.title);
    expect(component.bookForm.value.price).toEqual(expectedResult.price);
    expect(component.bookForm.value.quantity).toEqual(expectedResult.quantity);
    expect(component.bookForm.value.image).toEqual(expectedResult.image);
    expect(component.bookForm.value.description).toEqual(
      expectedResult.description
    );
    expect(component.bookForm.value.author).toEqual(expectedResult.author);
    expect(component.bookForm.value.category).toEqual(
      expectedResult.category.id.toString()
    );
  });

  it('should navigate to the book list on cancel', () => {
    spyOn(component.router, 'navigate');

    component.onCancel();

    expect(component.router.navigate).toHaveBeenCalledWith([
      'books/management/book-list',
    ]);
  });

  it('should call createBook and navigate to book list when editMode is false', () => {
    component.bookForm = new FormGroup({
      title: new FormControl('Test Book', Validators.required),
      price: new FormControl(10, Validators.required),
      quantity: new FormControl(5, Validators.required),
      image: new FormControl('test-image.jpg', Validators.required),
      description: new FormControl('Test description', Validators.required),
      author: new FormControl('Test Author', Validators.required),
      category: new FormControl('2', Validators.required),
    });
    spyOn(component.router, 'navigate');

    component.editMode = false;
    component.onSubmit();

    expect(component.router.navigate).toHaveBeenCalledWith([
      'books/management/book-list',
    ]);
  });

  it('should call updateBook and navigate to book list when editMode is true', () => {
    component.bookForm = new FormGroup({
      title: new FormControl('Test Book', Validators.required),
      price: new FormControl(10, Validators.required),
      quantity: new FormControl(5, Validators.required),
      image: new FormControl('test-image.jpg', Validators.required),
      description: new FormControl('Test description', Validators.required),
      author: new FormControl('Test Author', Validators.required),
      category: new FormControl('2', Validators.required),
    });
    spyOn(component.router, 'navigate');

    component.editMode = true;
    component.id = '3';
    component.onSubmit();

    expect(component.router.navigate).toHaveBeenCalledWith([
      'books/management/book-list',
    ]);
  });
});
