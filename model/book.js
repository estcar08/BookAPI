let books = require('../data/book.json');
const path = require('path');
const filename = path.join(path.dirname(require.main.filename), 'data', 'book.json');
const { Helper } = require('../helper');
const uuid = require('uuid');

function getBooks() {
    return new Promise((resolve, reject) => {
        if (books.length === 0) {
            reject({
                message: 'no books available',
                status: 202
            });
        }
        resolve(books);
    });
}
function insertBook(newBook) {
    return new Promise((resolve, reject) => {
        Helper.isNotInArray(books, newBook)
        .then(exist => {
            if(!exist){
                const guid = { guid: uuid.v4() }
                newBook = { ...guid, ...newBook }
                books.push(newBook);
                Helper.writeJSONFile(filename, books);
                resolve(newBook);
            }
        })
        .catch(err => reject(err));
    })
}

function getBook(guid) {
    return new Promise((resolve, reject) => {
        Helper.mustBeInArray(books, guid)
        .then(book => resolve(book))
        .catch(err => reject(err))
    })
}
function updateBook(guid, newBook) {
    return new Promise((resolve, reject) => {
        Helper.mustBeInArray(books, guid)
        .then(book => {
            const index = books.findIndex(b => b.guid == book.guid);
            guid = { guid: book.guid }
            books[index] = { ...guid, ...newBook }
            Helper.writeJSONFile(filename, books);
            resolve(book[index]);
        })
        .catch(err => reject(err));
    });
}
function deleteBook(guid) {
    return new Promise((resolve, reject) => {
        Helper.mustBeInArray(books,guid)
        .then(() => {
            books = books.filter(b => b.guid != guid);
            console.log(books);
            Helper.writeJSONFile(filename, books);
            resolve();
        })
        .catch(err => reject(err));
    })
}
module.exports = {
    insertBook,
    getBooks,
    getBook, 
    updateBook,
    deleteBook
}