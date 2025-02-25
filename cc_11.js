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