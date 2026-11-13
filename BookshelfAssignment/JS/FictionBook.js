import Book from "./Book.js";

// FictionBook: a Book that also has a genre.
// Title, author, and pages are stored privately by the parent Book class.

class FictionBook extends Book {
    #genre;

    constructor(title, author, pages, genre) {
        super(title, author, pages);
        this.#genre = genre;
    }

    // Returns "[titel] by [author], [page count] pages, [genre] - Fiction"
    getSummary() {
        return `${super.getSummary()}, ${this.#genre} - Fiction`;
    }
}

export default FictionBook;