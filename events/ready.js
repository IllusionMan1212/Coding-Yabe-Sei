const Discord = require('discord.js');
const Guild = require("../db/schemas/guild");
const deletedMessage = require("../db/schemas/deletedMessage");
const { createCheeseEmbed } = require("../commands/fun/cheese");
const request = require("request");

module.exports = async (client) => {
    const { config } = client;
    //const activitiesList = [`coding-yabe-sei.io`, `for ${client.users.size} users on ${client.guilds.size} servers`, `with the >help command`, `with the devs`]
    await client.wait(2000);
    // Discords API can take upt to 2-5 seconds to be fully ready. This makes sure the bot doesn't fo any of the following code before that.
    // - Darko

    // You can use this for limitations or fetching the app data in an easy way.
    // - Also Darko
    client.appInfo = await client.fetchApplication();
    setInterval(async () => {
        client.appInfo = await client.fetchApplication();
    }, 60000);

    console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);

    setInterval(() => {
        const now = new Date();
        if (now.getUTCHours() == 3 && now.getUTCMinutes() == 0) {
            url = "https://api.illusionman1212.me/cheese/today"; 
         
            request(url, function (error, _response, body) {
                if (error) {
                    message.channel.send("Sorry something seems to have gone wrong!");
                    console.log(error);
                    return;
                }

                body = JSON.parse(body);

                if (body.failed) {
                    message.channel.send("Sorry something seems to have gone wrong!. try again in a few minutes or submit a bug report");
                }

                const embed = createCheeseEmbed(client, body.cheese);

                client.channels.cache.get(process.env.CHEESE_CHANNEL).send(embed);
            })
        }
    }, 1000 * 60);

    setInterval(() => {
        Guild.find()
        .populate("deletedMessages")
        .exec((err, guilds) => {
            if (err) {
                console.error(err);
            }
            for (let i = 0; i < guilds.length; i++) { // for every guild, check if the last element (first deleted message) is over 24 hours old
                if (guilds[i].deletedMessages.length && Date.now() - guilds[i].deletedMessages[guilds[i].deletedMessages.length - 1].deletedAt >= 3600000 * 24) {
                    const guildMessagesArray = guilds[i].deletedMessages.slice();
                    for (let j = 0; j < guildMessagesArray.length; j++) { // for each deleted message in the guild, find it and delete it from the messages collection and shift it from the array
                        deletedMessage.findByIdAndDelete({ _id: guildMessagesArray[j]._id })
                        .exec((err, message) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                    }
                    guilds[i].deletedMessages.length = 0;
                    guilds[i].save((err, guild) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                }
            };
        });
    }, 3600000 * 6); // check every guild's deleted messages age every 6 hours

    client.user.setActivity(`yabe help | ${client.guilds.cache.size} servers`, { type: 'PLAYING' });

    let embed = new Discord.MessageEmbed()
        .setTitle('I just restarted')
        .setTimestamp()
        .setColor(config.embedColor);

    const channelId = config.logChannel;
    try {
        const channel = await client.channels.cache.get(channelId);
        channel.send(embed);
    }
    catch(e) {
        console.error(`Unable to find channel: ${channelId}`)
    }
};
