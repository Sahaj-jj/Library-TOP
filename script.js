function Book(name, author, isRead) {
    this.name = name;
    this.author = author;
    this.isRead = isRead;
}

function addBookToLibrary(name, author, isRead) {
    let newBook = new Book();
    newBook.name = name;
    newBook.author = author
    newBook.isRead = isRead;
    myLibrary.push(newBook);
}

function updateTable() {
    table.innerHTML = '';
    let i = 0;

    if (myLibrary.length == 0) {
        table.appendChild(addData(document.createElement('div'), 'Nothing to see here :('))
    }

    myLibrary.forEach(book => {
        const tr = document.createElement('tr');
        tr.classList.add(`id-${i++}`);
        
        tr.appendChild(addData(document.createElement('div'), book.name));
        tr.appendChild(addData(document.createElement('div'), book.author));
        tr.appendChild(addData(document.createElement('div'), book.isRead ? "\uD83D\uDDF8" : "\u2716", 'read-btn', book.isRead ? 'read' : 'unread'));
        tr.appendChild(addData(document.createElement('div'), "\uD83D\uDDD1", 'delete-btn'));

        table.appendChild(tr);
    })
    deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => btn.addEventListener('click', deleteEntry));
    readButtons = document.querySelectorAll('.read-btn');
    readButtons.forEach(btn => btn.addEventListener('click', toggleRead));
}

function addData(element, text = '', className = '', className2 = '') {
    const td = document.createElement('td');
    if (className) element.classList.add(className);
    if (className2) element.classList.add(className2);
    if (text) element.textContent = text;
    td.appendChild(element);
    return td;
}

function showModal() {
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('active');
    }, 0);
}

function clearModal() {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500);
    newBookInputs[0].value = '';
    newBookInputs[1].value = '';
    newBookInputs[2].checked = false;
}

function createNewEntry() {
    addBookToLibrary(newBookInputs[0].value, newBookInputs[1].value, newBookInputs[2].checked);
    updateTable();
    clearModal();
}

function deleteEntry() {
    let index = (this.parentNode.parentNode.classList.value);
    myLibrary.splice(index.slice(-1), 1);
    this.parentNode.parentNode.classList.add('delete');
    setTimeout(() => {
        updateTable();
        this.parentNode.parentNode.classList.remove('delete');
        this.parentNode.parentNode.remove();
    }, 300);
}

function toggleRead() {
    let index = (this.parentNode.parentNode.classList.value);
    myLibrary[index.slice(-1)].isRead = !myLibrary[index.slice(-1)].isRead;
    updateTable();
}

let myLibrary = []

let table = document.querySelector('tbody');
const modal = document.querySelector('.modal-active');
const addButton = document.querySelector('.add-button');
const cancelButton = document.querySelector('.cancel-btn');
const okButton = document.querySelector('.ok-btn');
const newBookInputs = document.querySelectorAll('input');
let deleteButtons = document.querySelectorAll('.delete-btn');
let readButtons = document.querySelectorAll('.read-btn');

addButton.addEventListener('click', showModal);
okButton.addEventListener('click', createNewEntry);
cancelButton.addEventListener('click', clearModal);

//Default Data

addBookToLibrary(' In Search of Lost Time','Marcel Proust', true);
addBookToLibrary('Pride and Prejudice', 'Jane Austen', true);
addBookToLibrary("Alice's Adventures in Wonderland", "Lewis Carroll", false);
updateTable();