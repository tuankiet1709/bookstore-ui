import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import { BookService, CartService } from 'src/app/shared/services';
import { of } from 'rxjs';
import { BookModel } from 'src/app/shared/models';
import { BookGetResponse } from 'src/app/shared/models/book/book-response.model';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let bookService: jasmine.SpyObj<BookService>;
  let cartService: jasmine.SpyObj<CartService>;

  const mockBooks: BookGetResponse = {
    status: 'string',
    totalItems: 1,
    totalPages: 1,
    currentPage: 1,
    items: [
      {
        id: 1,
        title: 'Book 1',
        image: 'image1.jpg',
        price: 10,
        category: { _id: '1', name: 'Category 1' },
        author: 'author',
        description: 'description',
        quantity: 1,
        isDelete: false,
      },
      {
        id: 2,
        title: 'Book 2',
        image: 'image2.jpg',
        price: 20,
        category: { _id: '2', name: 'Category 2' },
        author: 'author',
        description: 'description',
        quantity: 1,
        isDelete: false,
      },
    ],
  };

  beforeEach(async () => {
    const bookServiceSpy = jasmine.createSpyObj('BookService', ['getBook']);
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);

    await TestBed.configureTestingModule({
      declarations: [BookListComponent],
      providers: [
        { provide: BookService, useValue: bookServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
      ],
    }).compileComponents();

    bookService = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    bookService.getBook.and.returnValue(of(mockBooks));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch books on component initialization', () => {
    expect(bookService.getBook).toHaveBeenCalled();
    expect(component.books).toEqual(mockBooks.items);
    expect(component.bookDisplay).toEqual(mockBooks.items);
  });

  it('should update bookDisplay when onShowCategory is called', () => {
    const category = '2';
    component.onShowCategory(category);
    expect(component.bookDisplay).toEqual([mockBooks.items[1]]);
  });

  it('should call addToCart when onAddToCart is called', () => {
    const book = mockBooks.items[0];
    component.onAddToCart(book);
    expect(cartService.addToCart).toHaveBeenCalledWith({
      product: book.image,
      name: book.title,
      price: book.price,
      quantity: 1,
      id: book.id,
    });
  });
});
