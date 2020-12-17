const mongoose = require("mongoose");

const deletedMessageSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    image: {
        type: String,
    },
    author: {
        type: String,
        required: true,
    },
    createdTimestamp: {
        type: Date,
        require: true,
    },
    deletedAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model("deletedMessage", deletedMessageSchema);