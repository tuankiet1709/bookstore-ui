import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookItemComponent } from './book-item.component';

describe('BookItemComponent', () => {
  let component: BookItemComponent;
  let fixture: ComponentFixture<BookItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.book = {
      id: 1,
      title: 'Sample Book',
      author: 'John Doe',
      price: 19.99,
      image: 'book-image.jpg',
      quantity: 1,
      description: 'Lorem ipsum dolor sit amet.',
      category: { id: '1', name: 'Category' },
      isDelete: false,
    };

    component.index = 1;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addToCart event when onAddToCart is called', () => {
    spyOn(component.addToCart, 'emit');

    component.onAddToCart();

    expect(component.addToCart.emit).toHaveBeenCalledWith(component.book);
  });
});
