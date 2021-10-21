const fs = require('fs')

function mustBeInArray(array, guid) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.guid === guid)
        if (!row) {
            reject({
                message: 'GUID is not found!',
                status: 404
            })
        }
        resolve(row)
    })
}

function isNotInArray(array, book) {
    const { title, author, pubYear } = book;
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.title === title && r.author === author && r.pubYear === pubYear);
        if (row) {
            reject({
                message: 'Book already exist!',
                status: 404
            });
        }
        resolve(false);
    })
}

function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err);
        }
    })
}

module.exports = {
    mustBeInArray,
    isNotInArray,
    writeJSONFile
}