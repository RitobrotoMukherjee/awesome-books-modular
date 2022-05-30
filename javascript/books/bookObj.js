import { Book } from './book.js';

import { BookList } from './setBookList.js';

class BookStore extends BookList {
  constructor() {
    super();
    this.books = super.getBooks();
  }

  setLocalStorage() {
    return localStorage.setItem('bookStore', JSON.stringify(this.books));
  }

  addBook(title, author) {
    const book = new Book(title, author);
    this.books.push(book);
    return this.setLocalStorage();
  }

  removeBook(id) {
    if (this.books.length > 0) {
      this.books.splice(id, 1);
    }
    return this.setLocalStorage();
  }
}

const getHTML = (books) => {
  let template = '<ul class="book-list">';
  books.forEach((book, i) => {
    template += `<li id="list-id-${i}" class="list-item ${i % 2 !== 0 ? 'dark' : 'light'}">
          <div class="book-list-items">
            <h5 class="book-items book-title">"${book.title}" by ${book.author}</h5>
            <button id="btn-${i}" data-book-index="${i}" type="button" class="removeBtn">Remove</button>
          </div>
        </li>`;
  });

  if (books.length === 0) {
    template += `
      <li class="list-item light">
        <div class="book-list-items book-list-items-empty">
          <h5 class="book-items book-title">Book List is Empty</h5>
        </div>
      </li>
    `;
  }

  template += '</ul>';

  return template;
};

export { BookStore, getHTML };

export default null;