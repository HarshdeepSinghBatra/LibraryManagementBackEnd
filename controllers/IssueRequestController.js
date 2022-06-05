const IssueRequestSchema = require('../models/IssueRequests.db')

const getIssueRequests = async (req, res) => {
    try {
        const requests = await IssueRequestSchema.find()
        res.send(requests)
    } catch (err) {
        console.log(err)
    }
}

const requestIssue = async (req, res) => {
    try {
        const { bookId, studentId, requestDate, status } = req.body
        const request = await IssueRequestSchema.create({
            bookId,
            studentId,
            requestDate,
            status,
        })

        res.send('Issue requested' + request.id)
    } catch (err) {
        console.log(err)
    }
}

const handleRequest = async (req, res) => {
    try {
        const { requestId, status } = req.body
        const request = await IssueRequestSchema.findById(requestId)
        request.status = status
        await request.save()

        res.send('request handled')
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getIssueRequests,
    requestIssue,
    handleRequest,
}
