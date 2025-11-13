const myLibrary = []


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
    //创建card div并添加'card'类和'data-title'属性
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.title = book.title
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




