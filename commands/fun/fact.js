const request = require("request");
const Discord = require('discord.js');

exports.run = (client, message) => {
    const baseUrl = "https://uselessfacts.jsph.pl/random.json?language=en";

    request(baseUrl, function (error, _response, body) {
        if (error) {
            message.channel.send("Sorry something seems to have gone wrong!");
            console.log(error);
            return;
        }

        body = JSON.parse(body);
        const text = body.text;

        const emb = new Discord.MessageEmbed();
            emb.setColor(client.config.embedColor);
            emb.setDescription(text.replace(/`/g, "'"));

        message.channel.send(emb);
    })
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "fun",
    name: "fact",
    description: "Tells you a random fact",
    usage: "`yabe fact`"
}
