import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return search results', () => {
    const category = 'fiction';
    const mockData = { works: [{ title: 'Book 1' }, { title: 'Book 2' }] };

    service.searchBooks(category).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(
      `https://openlibrary.org/subjects/${category}.json`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should return book details', () => {
    const key = '/works/OL1W';
    const mockData = { title: 'Book Title', description: 'Book Description' };

    service.getBookDetails(key).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`https://openlibrary.org${key}.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
