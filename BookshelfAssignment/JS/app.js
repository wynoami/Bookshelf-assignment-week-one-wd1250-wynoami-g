import Bookshelf from "./Bookshelf.js";
import FictionBook from "./FictionBook.js";
import NonFictionBook  from "./NonFictionBook";

// One shelf for the whole page (created once, outside the submit handler)
const shelf = new Bookshelf();

// DOM elements
const form = document.getElementById("bookForm");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const categoryInput = document.getElementById("category");
const typeRadios = document.querySelectorAll('input[name="bookType"]');
const bookList = document.getElementById("bookList");
const emptyMessage = document.getElementById("emptyMessage");

// Show a theme hint for fiction and a subject hint for non-fiction
function updateCategoryPlaceholder(event) {
    categoryInput.placeholder =
        event.target.value === "fiction"
        ? "Theme (e.g. Dystopian)"
        : "Subject (e.g. History)";
}

// Redraw the list using the shelf's summaries
function renderBookshelf() {
    const summaries = shelf.getBookSummaries();

    bookList.replaceChildren();
    emptyMessage.hidden = summaries.length > 0;

    summaries.forEach((summary) => {
        const listItem = document.createElement("li");
        listItem.textContent = summary;
        bookList.appendChild(listItem);
    });
}

// Build the right kind of book from the form and add it to the shelf
function handleSubmit(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const pages = Number(pagesInput.value);
    const category = categoryInput.value.trim();
    const bookType = document.querySelector('input[name="bookType"]:checked').value;

    const newBook = 
        bookType === "fiction"
            ? new FictionBook(title, author, pages, category)
            : new NonFictionBook(title, author, pages, category);

    shelf.addBook(newBook);
    renderBookshelf();

    form.reset();
    categoryInput.placeholder = "";
}

typeRadios.forEach((radio) => radio.addEventListener("change", updateCategoryPlaceholder));
form.addEventListener("submit", handleSubmit);

renderBookshelf();