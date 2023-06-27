import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(environment.category.get);
  }
}
