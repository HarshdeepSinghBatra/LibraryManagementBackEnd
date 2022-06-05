const res = require("express/lib/response");
const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    genre: {
        type: String,
        lowercase: true
    },
    quantity: Number
})

bookSchema.pre("remove", async function (next) {
    try {   
        const IssueRequestModel = this.model("issuerequest")
        const requests = await IssueRequestModel.find({bookId: this._id})
        requests.forEach(request => {
            request.status = 2
            request.save()
        })
        next()
    } catch (err) {
        console.log(_id)
    }
}) 

module.exports = mongoose.model("book", bookSchema)
