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
  bookDescription: string = '';

  constructor(private bookService: BookService) {}

  searchBooks(): void {
    this.bookService.searchBooks(this.searchTerm).subscribe({
      next: (data: any) => {
        this.searchResults = data.works;
        this.searchResultsVisible = true;
        console.log(this.searchResults);
      },
      error: (error) => {
        console.error('Errore durante la ricerca dei libri:', error);
      },
    });
  }

  showBookDetails(key: string): void {
    this.bookService.getBookDetails(key).subscribe({
      next: (data: any) => {
        let descriptionText = '';
        if (
          typeof data.description === 'object' &&
          data.description.type === '/type/text'
        ) {
          descriptionText = data.description.value;
        } else if (typeof data.description === 'string') {
          descriptionText = data.description;
        } else {
          console.warn(
            'Formato della descrizione non supportato:',
            data.description
          );
          descriptionText = 'Descrizione non disponibile';
        }
        this.bookDescription = descriptionText;
        console.log('Descrizione del libro:', descriptionText);
      },
      error: (error) => {
        console.error(
          'Errore durante il recupero dei dettagli del libro:',
          error
        );
      },
    });
  }

  chiudi() {
    this.bookDescription = '';
  }
}
