export default class {
  constructor() {
    this.books = [];
  }

  getBooks() {
    const tempBooks = JSON.parse(localStorage.getItem('bookStore'));
    if (Array.isArray(tempBooks)) {
      this.books = tempBooks;
    }
    return this.books;
  }
}