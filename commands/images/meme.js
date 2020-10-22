const Discord = require("discord.js");
const fetch = require("node-fetch"); 

exports.run = async (client, message, _args) => {
    const url = "https://some-random-api.ml/meme";

    try {
    //This is a command purely for memes (Copy) - Wow thanks couldnt tell

    let res = await fetch(url);

    if(!res.ok) return message.channel.send('Sorry, it appears an error has occurred fetching your meme!').then(() => console.error(error.message))

    const json = await res.json();
    const { id, image, caption, category } = json;

    const emb = new Discord.MessageEmbed();
        emb.setDescription(`${caption} - ${category} #${id}`);
        emb.setColor(client.config.embedColor);
        emb.setImage(image);

    message.channel.send(emb);
    } catch (e) {
        console.error(e.message);
    }
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "image",
    name: "meme",
    description: "The `meme` command displays a random meme from the interwebs.",
    usage: "`yabe meme`",
}
