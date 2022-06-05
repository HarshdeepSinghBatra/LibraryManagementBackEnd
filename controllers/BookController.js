const BookSchema = require('../models/Books.db')

const getBooks = async (req, res) => {
    try {
        const books = await BookSchema.find()
        res.send(books)
    } catch (err) {
        console.log(err)
    }
}

const addBook = async (req, res) => {
    try {
        const { name, author, quantity, genre } = req.body
        const book = await BookSchema.create({
            name,
            author,
            quantity,
            genre,
        })

        res.send('Book added' + book.name)
    } catch (err) {
        console.log(err)
    }
}

const updateBook = async (req, res) => {
    try {
        const { bookId, genre, name, author, quantity } = req.body
        const book = await BookSchema.findById(bookId)
        if (genre) book.genre = genre
        if (name) book.name = name
        if (author) book.author = author
        if (quantity) book.quantity = quantity
        await book.save()
        res.send('Book updated ' + book.name)
    } catch (err) {
        console.log(err)
    }
}

const deleteBook = async (req, res) => {
    try {
        const { bookId } = req.body
        const book = await BookSchema.findById(bookId)
        book.remove()
        res.send('Book deleted')
    } catch (err) {
        console.log(err)
    }
}

const searchBooks = async (req, res) => {
    try {
        const { category, query } = req.query
        const books = await BookSchema.find({
            [category]: { $regex: query, $options: 'i' },
        })
        
        console.log(books)
        res.send(books)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getBooks,
    addBook,
    updateBook,
    deleteBook,
    searchBooks,
}
