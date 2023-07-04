
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

function createBookElement(book) {
  // function that create Element  
  return `
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
}

function listBooks () {
  // function that loops through the array and displays each book 
  const bookCards = document.querySelector('.book-cards');
  myLibrary.forEach((book) => {
    bookCards.innerHTML += createBookElement(book);
  });
} 

const addNewBook = document.querySelector("#add-book");
const newBookForm = document.querySelector(".new-book-form");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".btn-close");
const formSubmit = document.querySelector("#form");

function openForm() {
  // function that open the form
  newBookForm.className += " active";
  overlay.className += " active";
}
function closeForm() {
  // function that closes the form
  newBookForm.classList.remove("active");
  overlay.classList.remove("active");
}

addNewBook.addEventListener('click', openForm);
closeBtn.addEventListener('click', closeForm);
overlay.addEventListener('click', closeForm );

function createBookObj() {
  // function that create Book object
  const bookTitle = document.querySelector("#title").value;
  const bookAuthor = document.querySelector("#author").value;
  const numOfPages = document.querySelector("#num-of-pages").value;
  const readStat = document.querySelector("#read-status").value == "true" ? true : false;

  const newBook = new Book (bookTitle, bookAuthor, parseInt(numOfPages), readStat);
  return newBook;
}

function clearForm (){
  // function that clear the form values
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#num-of-pages").value = "";
  document.querySelector("#read-status").value = "";
}

formSubmit.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const newBook = createBookObj();
  addBookToLibrary(newBook);
  const bookCards = document.querySelector('.book-cards');
  bookCards.innerHTML += createBookElement(newBook);
  clearForm();
  closeForm();
});

listBooks();
