const IssueSchema = require('../models/Issues.db')

const getIssuedBooks = async (req, res) => {
    try {
        const books = await IssueSchema.find()
        res.send(books)
    } catch (err) {
        console.log(err)
    }
}

const issueBook = async (req, res) => {
    try {
        const { bookId, studentId, issueDate } = req.body
        const book = await IssueSchema.create({
            bookId,
            studentId,
            issueDate,
        })
        res.send('Book issued to' + book.studentId)
    } catch (err) {
        console.log(err)
    }
}

const returnBook = async (req, res) => {
    try {
        const { issueId } = req.body
        const issueDetails = await IssueSchema.findById(issueId)
        if (issueDetails.fine > 0) 
            return
        issueDetails.remove()
        res.send("Book returned")
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getIssuedBooks,
    issueBook,
    returnBook
}
