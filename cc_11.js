// Task 1 Creating A Book Class
class Book {
    constructor(title, author, isbn, copies) {
        this.title = title,// String
        this.author = author,// String
        this.isbn = isbn,// Number
        this.copies = copies;// Number
    };// Sets up Book class with properties
    getDetails(){
        return `Title: ${this.title}, Author: ${this.author}, ISBN: ${this.isbn}, Copies: ${this.copies}`
    }// Returns Book details as formatted string
    updateCopies(quantity){
        if(quantity > this.copies){
            return `Not Enough Available Copies To Lend`;
        }
        this.copies += quantity;
    };// Changes available copies when borrowed or returned
};
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 123456, 5);
console.log(book1.getDetails());
// Expected output: "Title: The Great Gatsby, Author: F. Scott Fitzgerald, ISBN: 123456, Copies: 5"

book1.updateCopies(-1);
console.log(book1.getDetails());
// Expected output: "Title: The Great Gatsby, Author: F. Scott Fitzgerald, ISBN: 123456, Copies: 4"

// Task 2 Creating A Borrower Class
class Borrower {
    constructor(name, borrowerId) {
        this.name = name; // String - The name of the borrower
        this.borrowerId = borrowerId; // Number - The unique ID for the borrower
        this.borrowedBooks = []; // Array - The books borrowed by the borrower
    }
    // Method to borrow a book
    borrowBook(book) {
        // Check if the book has available copies
        if (book.copies > 0) {
            this.borrowedBooks.push(book.title);// Add the book title to the borrowedBooks array
 
            book.updateCopies(-1);
            return `${this.name} Successfully Borrowed "${book.title}".`;// Decrease the available copies of the book
        } else {
            return `${book.title} Is Currently Not Available.`;
        }
    }
    returnBook(book) {
        // Checks if the borrower has the book in their borrowedBooks array
        const index = this.borrowedBooks.indexOf(book.title);
        if (index !== -1) {
            // Remove the book title from the borrowedBooks array
            this.borrowedBooks.splice(index, 1);
            // Increase the available copies of the book now that it has been returned
            book.updateCopies(1);
            return `${this.name} Successfully Returned "${book.title}".`;
        } else {
            return `This Book Was Not Borrowed By ${this.name}.`;
        }
    }
};
// Task 2 Test Cases
const borrower1 = new Borrower("Alice Johnson", 201);
console.log(borrower1.borrowBook(book1)); // Expected: "Alice Johnson successfully borrowed 'The Great Gatsby'."
console.log(JSON.stringify(borrower1.borrowedBooks)); // Expected: ["The Great Gatsby"]

console.log(borrower1.returnBook(book1)); // Expected: "Alice Johnson successfully returned 'The Great Gatsby'."
console.log(JSON.stringify(borrower1.borrowedBooks)); // Expected: []

// Task 3 Creating A Library Class
class Library {
    constructor() {
        this.books = [],
        this.borrowers = [];
    };// Sets up empty books and borrowers array
    addBook(book){
        this.books.push(book);
    };// Adds the book from the Book Class
    listBooks(){
        this.books.forEach(book => console.log(book.getDetails()))
    };
    addBorrower(borrower){
        this.borrowers.push(borrower);
    };// Logs the borrower from the Borrower Class
    findBook(isbn){
        return this.books.find(book => book.isbn === isbn);
    }
    findBorrower(borrowerId){
        return this.borrowers.find(borrower => borrower.borrowerId === borrowerId)
    }
// Task 4 
    lendBook(borrowerId, isbn){
        const book = this.findBook(isbn)
        const borrower = this.findBorrower(borrowerId)
        if(!book){
            console.log(`Book with ISBN ${isbn} Cannot Be Found.`)
            return;
        }
        if(!borrower){
            console.log(`Borrower with ID ${borrowerId} Cannot Be Found.`)
            return;
        }
        if(book.copies <= 0){
            console.log(`There are Not Enough Copies of ${book.title} Available.`)
            return;
        }// Contingencies if the book and borrower cannot be found or if there are not enough copies
        book.updateCopies(-1)// Reduces the amount of avialable copies
        borrower.borrowBook(book);// Updates the borrower lists
        console.log(`${borrower.name} has borrowed ${book.title}`)
    };
    returnBook(borrowerId, isbn){
         const book = this.findBook(isbn);
         const borrower = this.findBorrower(borrowerId);
        if (!book){
            console.log(`Book with ISBN ${isbn} Cannot Be Found`)
            return;
        }// Returns this if the book being returned isn't tied to the borrower by ISBN
        if(!borrower){
            console.log(`Borrower with ID ${borrowerId} Cannot Be Found`)
            return;
        }// Will return this if a book is returned, but not tied to the borrower 
        borrower.returnBook(book);
        book.updateCopies(1);// Increases the total books upon returning
    }
};
// Task 3 Test Cases
const library = new Library();
library.addBook(book1);
library.listBooks();
// Expected output: "Title: The Great Gatsby, Author: F. Scott Fitzgerald, ISBN: 123456, Copies: 4"
// Task 4 Test Cases
library.addBorrower(borrower1);
library.lendBook(201, 123456);
console.log(book1.getDetails());
// Expected output: "Title: The Great Gatsby, Author: F. Scott Fitzgerald, ISBN: 123456, Copies: 3"
console.log(JSON.stringify(borrower1.borrowedBooks));
// Expected output: ["The Great Gatsby"]
// Task 5 Test Cases
library.returnBook(201, 123456);
console.log(book1.getDetails());
// Expected output: "Title: The Great Gatsby, Author: F. Scott Fitzgerald, ISBN: 123456, Copies: 4"
console.log(JSON.stringify(borrower1.borrowedBooks));
// Expected output: []