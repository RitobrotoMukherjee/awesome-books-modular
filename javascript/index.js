import BookStore from './modules/bookObj.js';

import getHTML from './modules/getHTML.js';

import { DateTime } from './modules/luxon.js';

const bookStore = new BookStore();

// Only to show current date and time
const today = DateTime.now();

const inputTitle = document.getElementById('book-title');
const inputAuthor = document.getElementById('book-author');

const addBookBtn = document.getElementById('add-btn');

const listLink = document.querySelector("a[href='#book-list-section']");

const addLink = document.querySelector("a[href='#add-books']");

const contactLink = document.querySelector("a[href='#contact-info-section']");

const listBookPage = document.querySelector('#book-list-section');
const addBooksPage = document.querySelector('#add-books');
const contactPage = document.querySelector('#contact-info-section');

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

// run functions on window load
window.addEventListener('load', () => {
  document.getElementById('date-time').innerText = today.toLocaleString(DateTime.DATETIME_FULL);

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