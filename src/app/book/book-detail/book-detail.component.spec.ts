import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailComponent } from './book-detail.component';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { BookService, CartService } from 'src/app/shared/services';
import { BookModel } from 'src/app/shared/models';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;

  const mockBookService = {
    getById: () => {
      return of({
        id: 1,
        title: 'Book 1',
        image: 'book1.jpg',
        price: 10,
        quantity: 1,
        description: 'description',
        author: 'author',
        category: {
          id: '1',
          name: 'cate 1',
        },
        isDelete: false,
      });
    },
  };

  const mockCartService = {
    addToCart: jasmine.createSpy('addToCart').and.returnValue(of({})),
  };

  const mockActivatedRoute = {
    params: of({ id: 1 } as Params),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookDetailComponent],
      providers: [
        { provide: BookService, useValue: mockBookService },
        { provide: CartService, useValue: mockCartService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve book details on initialization', () => {
    const expectedBook: BookModel = {
      id: 1,
      title: 'Book 1',
      image: 'book1.jpg',
      price: 10,
      quantity: 1,
      description: 'description',
      author: 'author',
      category: {
        id: '1',
        name: 'cate 1',
      },
      isDelete: false,
    };

    component.ngOnInit();

    expect(component.book).toEqual(expectedBook);
  });

  it('should add book to cart when "Add to Cart" button is clicked', () => {
    component.book = {
      id: 1,
      title: 'Book 1',
      image: 'book1.jpg',
      price: 10,
      quantity: 1,
      description: 'description',
      author: 'author',
      category: {
        id: '1',
        name: 'cate 1',
      },
      isDelete: false,
    };

    component.onAddToCart();

    expect(mockCartService.addToCart).toHaveBeenCalled();
  });
});
