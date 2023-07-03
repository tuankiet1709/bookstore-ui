import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListAdminComponent } from './book-list-admin.component';
import { of } from 'rxjs';
import { BookService, CategoryService } from 'src/app/shared/services';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';

describe('BookListAdminComponent', () => {
  let component: BookListAdminComponent;
  let fixture: ComponentFixture<BookListAdminComponent>;
  let router: Router;

  const bookService = {
    getBook: () => {
      return of([
        {
          id: 1,
          title: 'Book 1',
          image:
            'https://cdn.shopify.com/s/files/1/0020/1850/8859/products/TheBookflat_a.jpg?v=1653481303',
          quantity: 1,
          price: 1,
          description: 'This is book description',
          author: 'author',
          category: {
            id: 1,
            name: 'Sport',
          },
          isDelete: true,
        },
        {
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
        },
      ]);
    },
    getById: () => {
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
    delete: () => {
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
      declarations: [BookListAdminComponent],
      imports: [SharedModule, RouterTestingModule],
      providers: [
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
    fixture = TestBed.createComponent(BookListAdminComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove book successfully', () => {
    component.onDeleteBook('1');

    expect(component.books.length).toEqual(1);
  });

  it('should route navigate', () => {
    spyOn(router, 'navigate');

    component.onNewBook();

    expect(router.navigate).toHaveBeenCalled();
  });
});
