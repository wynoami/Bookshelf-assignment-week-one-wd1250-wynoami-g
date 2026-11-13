import Book from "./Book.js";

//NonFictionBook: a Book that also has a topic.
// Title, author, and pages are stored privately by the parent book class.

class NonFictionBook extends Book {
    #topic;

    constructor(title, author, pages, topic) {
        super(title, author, pages);
        this.#topic = topic;
    }

    // Returns "[title] by [author], [page count] pages, [topic] - Non-Fiction"
    getSummary() {
        return `${super.getSummary()}, ${this.#topic} - Non-Fiction`;
    }
}

export default NonFictionBook;