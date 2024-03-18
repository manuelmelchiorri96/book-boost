import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'https://openlibrary.org/subjects/';

  constructor(private http: HttpClient) {}

  searchBooks(category: string): Observable<any> {
    const url = `${this.baseUrl}${category}.json`;
    return this.http.get(url);
  }

  getBookDetails(key: string): Observable<any> {
    const url = `https://openlibrary.org${key}.json`;
    return this.http.get(url);
  }
}
