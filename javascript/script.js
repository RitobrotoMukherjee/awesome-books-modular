import { BookStore, getHTML } from './books/bookObj.js';

const bookStore = new BookStore();

// Only to show current date and time
const today = new Date();

const inputTitle = document.getElementById('book-title');
const inputAuthor = document.getElementById('book-author');

const addBookBtn = document.getElementById('add-btn');

const listLink = document.querySelector("a[href='#book-list-section']");

const addLink = document.querySelector("a[href='#add-books']");

const contactLink = document.querySelector("a[href='#contact-info-section']");

const listBookPage = document.querySelector('#book-list-section');
const addBooksPage = document.querySelector('#add-books');
const contactPage = document.querySelector('#contact-info-section');

// create HTML from fragment
const createHTML = () => {
  const docRange = document.createRange();
  const listWrapper = document.getElementById('book-list-wrapper');
  listWrapper.innerHTML = '';
  listWrapper.append(docRange.createContextualFragment(getHTML(bookStore.books)));

  // Add event listener to the newly created button after 500 mili sec
  setTimeout(() => {
    // Get new buttons
    const removeBtn = document.querySelectorAll('.removeBtn');
    // recursively add event listener to the new buttons;
    removeBtn.forEach((item) => {
      item.addEventListener('click', (ev) => {
        const bookIndex = ev.target.getAttribute('data-book-index');
        bookStore.removeBook(bookIndex);
        // after removing book recreate HTML
        createHTML();
      });
    });
  }, 500);
};

const updateBooks = () => {
  const title = inputTitle.value;
  const author = inputAuthor.value;

  const errorShow = document.querySelector('.error');

  if (title === '' && author === '') {
    return errorShow.classList.remove('display-none');
  }
  errorShow.classList.add('display-none');
  inputTitle.value = '';
  inputAuthor.value = '';
  return bookStore.addBook(title, author);
};

// run functions on window load
window.addEventListener('load', () => {
  document.getElementById('date-time').innerText = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

  listLink.addEventListener('click', () => {
    listBookPage.style = 'display: flex';
    addBooksPage.style = 'display: none';
    contactPage.style = 'display: none';
    createHTML();
  });

  addLink.addEventListener('click', () => {
    addBooksPage.style = 'display: flex';
    listBookPage.style = 'display: none';
    contactPage.style = 'display: none';
  });

  contactLink.addEventListener('click', () => {
    listBookPage.style = 'display: none';
    addBooksPage.style = 'display: none';
    contactPage.style = 'display: flex';
  });

  addBookBtn.addEventListener('click', updateBooks);
  createHTML();
});