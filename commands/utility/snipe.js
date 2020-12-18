const Discord = require('discord.js')
const Paginator = require("djs-pagination");
const Guild = require("../../db/schemas/guild");

exports.run = async (client, message, args) => {
       
    String.prototype.embedify = function() {
        return new Discord.MessageEmbed().setColor(client.config.embedColor).setDescription(this)
    }

    let msg = await message.channel.send("Loading... <a:loading:789100802257715211>");

    Guild.findOne({ snowflake: message.guild.id })
    .populate("deletedMessages")
    .exec((err, guild) => {
        if (err) {
            msg.edit(err);
            return;
        }
        if (guild) {
            if (!guild.deletedMessages.length) {
                msg.delete();
                message.channel.send("Could not find any deleted messages".embedify());
                return;
            }
            let counter = 0
            if(args[0] == 'image') {
                if(!args[1]) {
                    msg.delete();
                    message.channel.send('Please provide a message to retrieve the image from!'.embedify());
                    return;
                }
                let image = guild.deletedMessages[args[1] - 1].image;
                if(!image) {
                    msg.delete();
                    message.channel.send('That message does not have an attached (deleted) image!'.embedify())
                    return;
                }
                let imageBuffer = Buffer.from(image.split(";base64,").pop(), "base64");
                let attachment = new Discord.MessageAttachment(imageBuffer, args[1] + "." + image.substring(11, image.indexOf(";base64")));
                msg.delete();
                message.channel.send({ files: [attachment] });
                return;
            }
            let paginator = new Paginator([], { timeout: 60000 });
            let newArray = new Array(Math.ceil(guild.deletedMessages.length / 5))
            .fill()
            .map(() => guild.deletedMessages.splice(0, 5));
            for (let i = 0; i < newArray.length; i++) {
                paginator.add(`${newArray[i].map(msg => `**${++counter} -** ${msg.content ? `${msg.content}${!msg.image ? '' : '\n[IMAGE WAS DELETED]'}` : (!msg.image ? '' : '[IMAGE WAS DELETED]')}\n**Author -** <@${msg.author}>\n**Created At -** ${new Date(msg.createdTimestamp).getUTCFullYear()}/${new Date(msg.createdTimestamp).getUTCMonth() + 1}/${new Date(msg.createdTimestamp).getUTCDate()} ${new Date(msg.createdTimestamp).getUTCHours()}:${new Date(msg.createdTimestamp).getUTCMinutes()} UTC+0`).join('\n\n')}`
                .embedify()
                .addField('NOTE:', `Message appear in order, newest deleted message is \`1.\` ,etc. Only the last 20 deleted messages are preserved. Messages above a 200 character limit are truncated to fit within the embed.\nTo view the images, please type \`yabe snipe image <number of message to get the image from>\``));
            }
            paginator.setTransform((embed, index, total) => embed.setFooter(`Page ${index + 1} / ${total}`));
            msg.delete();
            paginator.start(message.channel);
            return;
        } else {
            let newGuild = new Guild();
            newGuild.snowflake = message.guild.id;
            newGuild.save((err, savedGuild) => {
                if (err) {
                    msg.edit(err);
                    return;
                }
                msg.delete();
                message.channel.send('Could not find any deleted messages.'.embedify());
                return;
            })
        }
    });
}
exports.help = {
    enabled: true,
    hideHelp: false,
    type: "util",
    name: "snipe",
    description: "The `snipe` command allows you to view the last deleted message in the server. Can assist in identifying ghost pingers.",
    usage: "`yabe snipe`"
}
