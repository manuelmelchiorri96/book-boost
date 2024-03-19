import { ComponentFixture, TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';
import { HomePageComponent } from './home-page.component';
import { BookService } from '../../service/book.service';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let bookServiceSpy: jasmine.SpyObj<BookService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('BookService', [
      'searchBooks',
      'getBookDetails',
    ]);

    await TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      providers: [{ provide: BookService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    bookServiceSpy = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
  });

  it('should handle error when searching books', () => {
    const errorMessage = 'Test error message';
    bookServiceSpy.searchBooks.and.returnValue(throwError(errorMessage));

    spyOn(console, 'error');

    component.searchBooks();

    expect(bookServiceSpy.searchBooks).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'Errore durante la ricerca dei libri:',
      errorMessage
    );
  });

  it('should handle error when getting book details', () => {
    const key = '123';
    const errorMessage = 'Test error message';
    bookServiceSpy.getBookDetails.and.returnValue(throwError(errorMessage));

    spyOn(console, 'error');

    component.showBookDetails(key);

    expect(bookServiceSpy.getBookDetails).toHaveBeenCalledWith(key);
    expect(console.error).toHaveBeenCalledWith(
      'Errore durante il recupero dei dettagli del libro:',
      errorMessage
    );
  });
});
