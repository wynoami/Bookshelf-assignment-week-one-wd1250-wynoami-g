// Bookshelf: holds Book, FictionBook, and NonFictionBook objects.
// Uses array higher-order functions instead of loops.

class Bookshelf {
    #books = [];

    // Adds a book to the shelf
    addBook(book) {
        this.#books.push(book);
    }

    // Returns an array of books written by the given author
    getBooksByAuthor(author) {
        return this.#books.filter((book) => book.author === author);
    }

    // Returns the book with the most pages, or null if the shelf is empty
    getLongestBook() {
        if (this.#books.length === 0) {
            return null;
        }

        return this.#books.reduce((longest, book) => 
            book.pages > longest.pages ? book : longest);
    }

    // Returns the average page count, or 0 if the shelf is empty
    getAveragePages() {
        if (this.#books.length === 0) {
            return 0;
        }

        const totalPages = this.#books.reduce((total, book) => total + book.pages, 0);
        return totalPages / this.#books.length;
    }

    // Returns an array of summary strings, one per book
    getBookSummaries() {
        return this.#books.map((book) => book.getSummary());
    }
}

export default Bookshelf;