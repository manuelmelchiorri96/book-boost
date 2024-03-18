import { Component } from '@angular/core';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  searchTerm: string = '';
  searchResults: any[] = [];
  searchResultsVisible: boolean = false; 

  constructor(private bookService: BookService) {}

  searchBooks(): void {
    this.bookService.searchBooks(this.searchTerm).subscribe(
      (response: any) => {
        this.searchResults = response.works;
        this.searchResultsVisible = true; 
      },
      (error: any) => {
        console.error('Errore durante la ricerca dei libri:', error);
      }
    );
  }

  showBookDetails(key: string): void {
    this.bookService.getBookDetails(key).subscribe(
      (response: any) => {
        alert('Descrizione del libro:\n' + response.description);
      },
      (error: any) => {
        console.error(
          'Errore durante il recupero dei dettagli del libro:',
          error
        );
      }
    );
  }
}
