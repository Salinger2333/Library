let myLibrary = []
function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead ? 'already read' : 'not read yet'
    this.uid = crypto.randomUUID()

}
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 0)
const toKillAMockingbird = new Book('To Kill a Mockingbird', 'Harper Lee', 281, 1)
const nineteenEightyFour = new Book('1984', 'George Orwell', 328, true)
const prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen', 279, 1)
const theGreatGatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, 0)


const display = document.querySelector('.display-book')
function addBookToLibrary(book) {
    myLibrary.push(book)
}
// 将示例加入库
addBookToLibrary(theHobbit)
addBookToLibrary(toKillAMockingbird)
addBookToLibrary(nineteenEightyFour)
addBookToLibrary(prideAndPrejudice)
addBookToLibrary(theGreatGatsby)

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
myLibrary.forEach((book) => {
    addCardEl(book)
})
console.log(myLibrary);
const deleteBtn = document.querySelectorAll('.deleteBtn')
const resetBtn = document.querySelectorAll('.resetBtn')
const bookCards = document.querySelectorAll('.card')
function deleteBook(e) {
    const uid = e.target.closest('.card').dataset.uid
    myLibrary = myLibrary.filter((book) => {
        return book['uid'] !== uid
    })
    e.target.closest('.card').remove()
    console.log('delete card');
}
function resetBook(e) {
    const card = e.target.closest('.card')
    const uid = card.dataset.uid
    const isReadEl = card.querySelector('.isRead')
    myLibrary.forEach((book) => {
        if (book['uid'] === uid) {
            if (book['isRead'] === 'already read') {
                book['isRead'] = 'not read yet'
            } else {
                book['isRead'] = 'already read'
            }
            isReadEl.textContent = book.isRead
            return book
        }
    })

}

bookCards.forEach((bookCard) => {
    bookCard.addEventListener('click', (e) => {
        if (e.target.classList.contains('deleteBtn')) {
            deleteBook(e)
        }
        else if (e.target.classList.contains('resetBtn')) {
            resetBook(e)
        }
    })
})
const dialog = document.querySelector('dialog')
const addBtn = document.querySelector('.addBook')
const subBtn = document.querySelector('#subBtn')
const cancelBtn = document.querySelector('#cancelBtn')
addBtn.addEventListener('click',(e) => {
    dialog.showModal()
})

cancelBtn.addEventListener('click',(e) => {
    dialog.close()
})

subBtn.addEventListener('click',(e) => {
    e.preventDefault();
    
})


