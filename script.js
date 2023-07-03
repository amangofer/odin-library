
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author} ${this.pages} pages ${this.read ? "read." : "not read yet."}`;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const book1 = new Book ("LINUX BASICS FOR HACKERS", "Occupy The Web", 250, true);
const book2 = new Book ("Eloquent JavaScript", "Marijn Haverbeke", 463, false);
addBookToLibrary(book1);
addBookToLibrary(book2);

function listBooks (lib) {
  // function that loops through the array and displays each book 
  const bookCards = document.querySelector('.book-cards');
  lib.forEach((book) => {
    bookCards.innerHTML += `
          <div class="book-card">
              <h2>${book.title}</h2>
              <h3>by <span class="author">${book.author}</span></h3>
              <h4>Description:</h4>
              <p class="book-info">${book.info()}</p>
              <p>Pages: <span class="pages">${book.pages}</span></p>
              <button class="read-stat ${book.read ? "read" : "not-read"}">${book.read ? "Read" : "Not Read Yet"}</button>
              <button class="remove">Remove</button>
          </div>
    `;
  });
}

listBooks(myLibrary);
