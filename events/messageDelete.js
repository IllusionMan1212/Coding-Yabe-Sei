const deletedMessage = require("../db/schemas/deletedMessage");
const Guild = require("../db/schemas/guild");
const axios = require("axios");

module.exports = async (client, message) => {

    if (message.author.bot) {
        return;
    }

    let image = message.attachments.size > 0 ? extension(message.attachments.array()[0].proxyURL) : false

    message.content.replace('\n', '')

    if (message.content.length > 200) {
        message.content = message.content.slice(0, 200) + ' ...'
    }

    // try to find guild in which message was deleted in
    Guild.findOne({ snowflake: message.guild.id })
    .populate("deletedMessages")
    .exec(async (err, foundGuild) => {
        if (err) {
            console.error(err);
            return;
        }
        let d_msg = new deletedMessage();
        d_msg.content = message.content;
        d_msg.author = message.author.id;
        d_msg.createdTimestamp = message.createdTimestamp;
        if (image && message.attachments.array()[0].size < 524288) { // limit image size to 512 KB
            let res = await axios.request({ method: "get", url: image, responseType: "arraybuffer" });
            d_msg.image = "data:" + res.headers["content-type"] + ";base64," + Buffer.from(res.data).toString("base64"); // encode it to base64
        }
        if (foundGuild) { // if server exists in db
            if (foundGuild.deletedMessages.length >= 20) { // maximum 20 deleted messages per server
                // remove message from db
                deletedMessage.findByIdAndDelete(foundGuild.deletedMessages[19]._id, (err, deletedMessage) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    foundGuild.deletedMessages.pop(); // remove the first deleted message
                });
            }
            foundGuild.deletedMessages.unshift(d_msg); // add the last deleted message as first in the array
            d_msg.save((err, newMsg) => { // save msg
                foundGuild.save((err, updatedGuild) => { // save guild
                    Guild.find()
                    .populate('deletedMessages')
                    .exec((err, guild) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                })
            })
        } else { // if server doesn't exist in db, set the snowflake id and default prefix
            let guild = new Guild();
            guild.snowflake = message.guild.id;
            guild.deletedMessages.unshift(d_msg);        
            d_msg.save((err, newMsg) => {
                guild.save((err, newGuild) => {
                    Guild.find()
                    .populate('deletedMessages')
                    .exec((err, guild) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                });
            });
        }
    });

    function extension(attachment) {
        const imageLink = attachment.split('.')
        const typeOfImage = imageLink[imageLink.length - 1]
        const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage)
        if(!image) return ''
        return attachment
    }
}
