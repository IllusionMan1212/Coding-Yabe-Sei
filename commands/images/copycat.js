const Discord = require("discord.js");
const fetch = require('node-fetch');


exports.run = async (client, message) => {
    const baseUrl = "https://thatcopy.pw/catapi/rest";

    let res = await fetch(baseUrl);

    if (!res.ok) {
        message.channel.send("Sorry something seems to have gone wrong!");
        console.log(error);
        return;
    }

    body = await res.json();
    const imgURL = body.webpurl;

    const emb = new Discord.MessageEmbed();
        emb.setColor(client.config.embedColor);
        emb.setImage(imgURL);

    message.channel.send(emb);
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "image",
    name: "copycat",
    description: "Gets a copy cat from copy's catAPI",
    usage: "`yabe copycat`",
}
