class Book {
    constructor(title, author, pages, isRead) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead ? 'already read' : 'not read yet'
        this.uid = crypto.randomUUID()
    }

    toggleReadStatus() {
        this.isRead = (this.isRead === 'already read') ? 'not read yet' : 'already read'
    }
}

class Library {
    constructor() {
        this.books = [] // 这里的 books 代替原来的 myLibrary
    }
    addBookToLibrary(book) {
        this.books.push(book)
        addCardEl(book)
    }
    removeBook(uid) {
        this.books = this.books.filter((book) => book.uid !== uid)
    }
    getBook(uid) {
        return this.books.find(book => book.uid === uid);
    }
}
// 初始化你的图书馆
const myLibrary = new Library()

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 0)
const toKillAMockingbird = new Book('To Kill a Mockingbird', 'Harper Lee', 281, 1)
const nineteenEightyFour = new Book('1984', 'George Orwell', 328, true)
const prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen', 279, 1)
const theGreatGatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, 0)


const display = document.querySelector('.display-book')
// 将示例加入库
myLibrary.addBookToLibrary(theHobbit)
myLibrary.addBookToLibrary(toKillAMockingbird)
myLibrary.addBookToLibrary(nineteenEightyFour)
myLibrary.addBookToLibrary(prideAndPrejudice)
myLibrary.addBookToLibrary(theGreatGatsby)

function addCardEl(book) {
    //创建card div并添加'card'类和'data-uid'属性
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.uid = book.uid
    //遍历每一本书的属性,将属性和内容添加到Card中
    for (const key in book) {
        if (!Object.hasOwn(book, key)) continue;
        if (key === 'uid') continue
        const div = document.createElement('div')
        div.classList.add(`${key}`)
        const content = book[key];
        div.textContent = content
        card.append(div)
    }
    const deleteBtn = document.createElement('button')
    const resetBtn = document.createElement('button')
    card.append(deleteBtn)
    deleteBtn.classList.add('deleteBtn')
    deleteBtn.textContent = 'delete'
    card.append(resetBtn)
    resetBtn.textContent = 'reset'
    resetBtn.classList.add('resetBtn')
    //添加到display中
    display.append(card)
}
const bookCards = document.querySelectorAll('.card')
if (display) {
    display.addEventListener('click', (e) => {
        if (e.target.classList.contains('deleteBtn')) {
            const uid = e.target.closest('.card').dataset.uid
            myLibrary.removeBook(uid)
            e.target.closest('.card').remove()
            console.log('delete card');
        }
        else if (e.target.classList.contains('resetBtn')) {
            const card = e.target.closest('.card')
            const uid = card.dataset.uid
            const isRead = card.querySelector('.isRead')
            const bookToToggle = myLibrary.getBook(uid)
            bookToToggle.toggleReadStatus()
            isRead.textContent = bookToToggle.isRead
        }
    })
}
const dialog = document.querySelector('dialog')
const addBtn = document.querySelector('.addBook')
const subBtn = document.querySelector('#subBtn')
const cancelBtn = document.querySelector('#cancelBtn')
addBtn.addEventListener('click', (e) => {
    dialog.showModal()
})

cancelBtn.addEventListener('click', (e) => {
    dialog.close()
})

subBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.querySelector('.new-book')
    const title = document.querySelector('#book-title').value
    const author = document.querySelector('#book-author').value
    const pages = document.querySelector('#book-pages').value
    const isRead = document.querySelector('#book-isRead').value === '1'
    const newBook = new Book(title, author, pages, isRead)
    myLibrary.addBookToLibrary(newBook)
    form.reset()
    dialog.close()
    console.log('book added:', newBook)
})


