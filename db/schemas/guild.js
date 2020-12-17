const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    snowflake: {
        type: String,
        required: true,
        unique: true,
    },
    prefix: {
        type: String,
        default: "yabe ",
    },
    deletedMessages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'deletedMessage',
    }]
});

module.exports = mongoose.model("guild", guildSchema);