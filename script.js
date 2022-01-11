let myLibrary = [];
const table = document.querySelector('table tbody');
const modal = document.querySelector('.modal-active');
const addButton = document.querySelector('.add-button');

function Book(name, author, isRead) {
    this.name = name;
    this.author = author;
    this.isRead = isRead;
}

function addBookToLibrary() {
    let newBook = new Book();
    newBook.name = 'l';
    newBook.author = 'm'
    newBook.isRead = true;
    myLibrary.push(newBook);
}

function updateTable() {
    myLibrary.forEach(book => {
        const tr = document.createElement('tr');

        tr.appendChild(addData(document.createElement('div'), book.name));
        tr.appendChild(addData(document.createElement('div'), book.author));
        tr.appendChild(addData(document.createElement('div'), book.isRead ? 'Read' : 'Not read'));
        tr.appendChild(addData(document.createElement('button'), 'Delete', 'delete-button'));

        table.appendChild(tr);
    })
}

function addData(element, text = '', className = '') {
    const td = document.createElement('td');
    if (className) element.classList.add(className);
    if (text) element.textContent = text;
    td.appendChild(element);
    return td;
}

function createNewEntry() {
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('active'), 0)
    
}

addBookToLibrary();
updateTable();

addButton.addEventListener('click', createNewEntry);

