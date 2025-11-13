const myLibrary = []


function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read ? 'read yet' : 'not read yet'
    this.uid = crypto.randomUUID()
    this.info = function () {
        return this.title + ' by ' + this.author + ',' + this.pages + ' pages ,' + this.read
    }
}

function addBookToLibrary(book){
    myLibrary.push(book)
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 0)
console.log(theHobbit.info());