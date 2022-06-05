const mongoose = require('mongoose')
const issueRequestSchema = new mongoose.Schema({
    bookId: mongoose.SchemaTypes.ObjectId,
    studentId: String,
    requestDate: {
        type: Date,
        default: () => Date.now(),
    },
    status: {
        type: Number,
        default: 0,
    },
})

issueRequestSchema.pre('save', async function (next) {
    if (this.status != 1) {
        next()
        return
    }
    
    const IssueModel = this.model('issue')
    try {
        const issue = await IssueModel.create({
            bookId: this.bookId,
            studentId: this.studentId,
        })
    } catch (err) {
        console.log(err)
    }
    next()
})

module.exports = mongoose.model('issuerequest', issueRequestSchema)
