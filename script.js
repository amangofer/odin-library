
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

function createBookElement(book, index) {
  // function that create Element  
  return `
        <div class="book-card">
            <h2>${book.title}</h2>
            <h3>by <span class="author">${book.author}</span></h3>
            <h4>Description:</h4>
            <p class="book-info">${book.info()}</p>
            <p>Pages: <span class="pages">${book.pages}</span></p>
            <button data-index = ${index} class="read-stat ${book.read ? "read" : "not-read"}">${book.read ? "Read" : "Not Read Yet"}</button>
            <button data-index = ${index} class="remove">Remove</button>
        </div>
      `;
}

const addNewBook = document.querySelector("#add-book");
const newBookForm = document.querySelector(".new-book-form");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".btn-close");
const formSubmit = document.querySelector("#form");
let bookList = [...document.querySelectorAll(".remove")];
let bookStatList = [...document.querySelectorAll(".read-stat")];

function listBooks () {
  // function that loops through the array and displays each book 
  const bookCards = document.querySelector('.book-cards');
  myLibrary.forEach((book, index) => {
    bookCards.innerHTML += createBookElement(book, index);

    bookList = [...document.querySelectorAll(".remove")];
    bookStatList = [...document.querySelectorAll(".read-stat")];
    removeBook(bookList);
    changeBookReadSat(bookStatList)
  });
} 

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
function clearForm (){
  // function that clear the form values
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#num-of-pages").value = "";
  document.querySelector("#read-status").value = "";
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


listBooks();

formSubmit.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const newBook = createBookObj();
  addBookToLibrary(newBook);
  const index = myLibrary.length - 1;
  const bookCards = document.querySelector('.book-cards');
  bookCards.innerHTML += createBookElement(newBook, index);

  clearForm();
  closeForm();

  bookList = [...document.querySelectorAll(".remove")];
  bookStatList = [...document.querySelectorAll(".read-stat")];

  removeBook(bookList);
  changeBookReadSat(bookStatList)
});

function removeBook(bookList){
  // function that removes a book
  bookList.forEach((book) => {
    book.addEventListener('click', (e) => {
      const target = e.target;
      const bookIndex = target.getAttribute('data-index');
      myLibrary.splice(bookIndex, 1);
      target.parentElement.remove();
    });
  });
}

function changeBookReadSat(bookStatList){
  // function that changes book read status
  bookStatList.forEach((book) => {
    book.addEventListener('click', (e) => {
    const target = e.target;
    const statIndex = target.getAttribute('data-index');
    myLibrary[statIndex].read = myLibrary[statIndex].read ? false : true;
    target.className = `read-stat ${myLibrary[statIndex].read ? "read" : "not-read"}`;
    target.textContent = `${myLibrary[statIndex].read ? "Read" : "Not Read Yet"}`;
    });
  });
}