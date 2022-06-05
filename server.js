const express = require("express")
const db = require('./config/db')
const app = express()
const PORT = process.env.PORT || 9000
const cors = require("cors")
app.use(cors())
app.use(express.json())
const { getBooks, addBook, updateBook, deleteBook, searchBooks } = require("./controllers/BookController")
const { getIssuedBooks, issueBook, returnBook } = require("./controllers/IssueController")
const { requestIssue, getIssueRequests, handleRequest } = require("./controllers/IssueRequestController")
const { getIssueHistory } = require("./controllers/IssueHistoryController")

app.get("/api/books", getBooks)
app.post("/api/books", addBook)
app.put("/api/books", updateBook)
app.delete("/api/books", deleteBook)

app.get("/api/books/search", searchBooks)

app.get("/api/issue", getIssuedBooks)
app.post("/api/issue", issueBook)
app.delete("/api/issue", returnBook)

app.get("/api/issuehistory", getIssueHistory)

app.get("/api/requestissue", getIssueRequests)
app.post("/api/requestissue", requestIssue)
app.put("/api/requestissue", handleRequest)

app.listen(PORT, () => console.log("Server is running"))