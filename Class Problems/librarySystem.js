// 🔟 Library System (Composition + Multiple Classes)
// Goal: Work with multiple object types interacting.

// Create:

// Book:

// title, author

// Member:

// name

// Library:

// stores:

// list of books

// which member has borrowed which book

// methods:

// addBook(book)

// registerMember(member)

// borrowBook(title, memberName) → returns "BORROWED" or "NOT_AVAILABLE"

// getBorrowedBooks(memberName) → list of book titles


class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  }
  
  class Member {
    constructor(name) {
      this.name = name;
    }
  }
  
  class Library {
    constructor() {
      this.books = []; // list of available Book objects
      this.members = []; // list of Member names
      this.borrowedBooks = {}; // { memberName: [Book, Book, ...] }
    }
  
    addBook(book) {
      this.books.push(book);
    }
  
    registerMember(member) {
      if (!this.members.includes(member.name)) {
        this.members.push(member.name);
        this.borrowedBooks[member.name] = []; // initialize borrowed books
      }
    }
  
    borrowBook(title, memberName) {
      if (!this.members.includes(memberName)) {
        return "MEMBER_NOT_REGISTERED";
      }
  
      // Find the first available book with this title
      const bookIndex = this.books.findIndex(book => book.title === title);
      if (bookIndex === -1) {
        return "NOT_AVAILABLE";
      }
  
      // Remove the book from library and add to member's borrowed list
      const [borrowedBook] = this.books.splice(bookIndex, 1);
      this.borrowedBooks[memberName].push(borrowedBook);
      return "BORROWED";
    }
  
    getBorrowedBooks(memberName) {
      if (!this.members.includes(memberName)) return [];
      return this.borrowedBooks[memberName].map(book => book.title);
    }
}

//Input:
const lib = new Library();

lib.addBook(new Book("Book A", "Auth 1"));
lib.addBook(new Book("Book B", "Auth 2"));

lib.registerMember(new Member("Ashwin"));
lib.registerMember(new Member("Vasanth"));

console.log(lib.borrowBook("Book A", "Ashwin"));
console.log(lib.borrowBook("Book A", "Vasanth"));

console.log(lib.getBorrowedBooks("Ashwin"));
console.log(lib.getBorrowedBooks("Vasanth"));


//Output
// "BORROWED"
// "NOT_AVAILABLE"
// ["Book A"]
// []

