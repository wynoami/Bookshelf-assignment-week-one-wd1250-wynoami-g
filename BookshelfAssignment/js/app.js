import Bookshelf from "./Bookshelf.js";
import FictionBook from "./FictionBook.js";
import NonFictionBook from "./NonFictionBook.js";
import { getCoverUrl } from "./covers.js";

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
const shelfStats = document.getElementById("shelfStats");

// Show a theme hint for fiction and a subject hint for non-fiction
function updateCategoryPlaceholder(event) {
    categoryInput.placeholder =
        event.target.value === "fiction"
            ? "Theme (e.g. Dystopian)"
            : "Subject (e.g. History)";
}

// Swap in the real cover image once it has finished loading
function addCoverImage(cover, imageUrl, title) {
    const coverImage = new Image();
    coverImage.className = "cover-image";
    coverImage.alt = `Cover of ${title}`;
    coverImage.addEventListener("load", () => {
        cover.prepend(coverImage);
        cover.classList.add("has-image");
    });
    coverImage.src = imageUrl;
}

// Build one book card: a cover with a type badge, plus the book's summary
function createBookCard(details, summary) {
    const card = document.createElement("li");
    card.className = "book-card";

    const typeClass = details.type === "Fiction" ? "fiction" : "non-fiction";

    const cover = document.createElement("div");
    cover.className = `book-cover ${typeClass}`;

    const coverTitle = document.createElement("span");
    coverTitle.className = "cover-title";
    coverTitle.textContent = details.title;

    const coverAuthor = document.createElement("span");
    coverAuthor.className = "cover-author";
    coverAuthor.textContent = details.author;

    const badge = document.createElement("span");
    badge.className = `badge ${typeClass}`;
    badge.textContent = details.type;

    cover.append(coverTitle, coverAuthor, badge);

    const summaryText = document.createElement("p");
    summaryText.className = "book-summary";
    summaryText.textContent = summary;

    card.append(cover, summaryText);

    getCoverUrl(details.title, details.author).then((imageUrl) => {
        if (imageUrl) {
            addCoverImage(cover, imageUrl, details.title);
        }
    });

    return card;
}

// Show the book count, average pages, and longest book
function renderStats(bookCount) {
    shelfStats.hidden = bookCount === 0;

    if (bookCount === 0) {
        return;
    }

    const averagePages = Math.round(shelf.getAveragePages());
    const longestTitle = shelf.getLongestBook().getDetails().title;
    const bookWord = bookCount === 1 ? "book" : "books";

    shelfStats.textContent =
        `${bookCount} ${bookWord} · Average ${averagePages} pages · Longest: ${longestTitle}`;
}

// Redraw the shelf: one card per book, built from the shelf's summaries and details
function renderBookshelf() {
    const summaries = shelf.getBookSummaries();
    const bookDetails = shelf.getBookDetails();

    const cards = bookDetails.map((details, index) =>
        createBookCard(details, summaries[index])
    );

    bookList.replaceChildren(...cards);
    emptyMessage.hidden = summaries.length > 0;
    renderStats(summaries.length);
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
