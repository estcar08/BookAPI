const  { Book }  = require('../model');

module.exports={
    getAll: async function(req,res){
        await Book.getBooks()
        .then(books => {
            res.json(books);
        })
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
    },
    getByGuid: async function(req,res){
        const { guid } = req.params;
        await Book.getBook(guid)
        .then(book => res.json(book))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        });
    },
    create:async function(req,res){
        await Book.insertBook(req.body)
        .then(book =>   res.json({
            message: `The book has been create`,
            GUID:book.guid
        }))
        .catch(err => res.status(500).json({ message: err.message }))
    },
    update: async function(req,res){
        const { guid } = req.params;
        await Book.updateBook(guid, req.body)
        .then(book => res.json({
            message: `The book  has been updated`,
            GUID:guid,
            content: book
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
    },
    delete: async function(req,res){
        const guid = req.params.guid;
        await Book.deleteBook(guid)
        .then(book => res.json({
            message: `The book has been deleted`,
            GUID:guid
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
    }
}