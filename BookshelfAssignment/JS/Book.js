// Book: the base class for every book on the shelf.
// Stores the shared data (title, author, pages) in private fields.

class Book {
    #title;
    #author;
    #pages;

    constructor(title, author, pages) {
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
    }

    // Read-only access to the private fields
    get author() {
        return this.#author;
    }

    get pages() {
        return this.#pages;
    }

    // Returns "[title] by [author], [page count] pages"
    getSummary() {
        return `${this.#title} by ${this.#author}, ${this.#pages} pages`;
    }

    // Returns the book's information as an object (used to build book cards)
    getDetails() {
        return {
            title: this.#title,
            author: this.#author,
            pages: this.#pages,
            type: "Book",
            category: null,
        };
    }
}

export default Book;
