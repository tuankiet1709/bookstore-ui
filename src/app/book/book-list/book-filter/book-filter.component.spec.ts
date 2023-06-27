import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFilterComponent } from './book-filter.component';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryService } from 'src/app/shared/services';

describe('BookFilterComponent', () => {
  let component: BookFilterComponent;
  let fixture: ComponentFixture<BookFilterComponent>;

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
      declarations: [BookFilterComponent],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [{ provide: CategoryService, useValue: categoryService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get Categories', () => {
    const expectedCategories = [
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
    ];

    component.getCategories();

    expect(component.categories).toEqual(expectedCategories);
  });

  it('should emit the selected category when calling onShowCategory', () => {
    const categoryId = '1';
    const emitSpy = spyOn(component.showCategory, 'next');

    component.onShowCategory(categoryId);

    expect(emitSpy).toHaveBeenCalledWith(categoryId);
  });
});
