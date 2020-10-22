const Discord = require('discord.js');
const fetch = require("node-fetch"); 

exports.run = async (client, message) => {
    const baseUrl = "https://uselessfacts.jsph.pl/random.json?language=en";

    let res = await fetch(baseUrl);

    if (!res.ok) {
        message.channel.send("Sorry something seems to have gone wrong!");
        return;
    }

    json = await res.json();
    const text = json.text;

    const emb = new Discord.MessageEmbed();
        emb.setColor(client.config.embedColor);
        emb.setDescription(text.replace(/`/g, "'"));

        message.channel.send(emb);
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "fun",
    name: "fact",
    description: "Tells you a random fact",
    usage: "`yabe fact`"
}
