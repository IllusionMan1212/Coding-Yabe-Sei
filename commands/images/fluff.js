const Discord = require("discord.js");
const fetch = require("node-fetch"); 

const descs = ["A big cutie!", "A small cutie!", "OwO whats this?", "UwU so adorable...", "Literally shooketh", "if (this.isCute){die()}"];

exports.run = async (client, message, _args) => { 
    const baseUrl = "https://some-random-api.ml/img/";
    const avail = ["dog", "cat", "panda", "red_panda", "birb", "fox", "koala", "racoon", "kangaroo"];
    const anim = avail.random();

    let res = await fetch(baseUrl + anim);

    if (!res.ok) {
        message.channel.send("Sorry something seems to have gone wrong!");
        console.log(error);
        return;
    }

    body = await res.json();
    const imgURL = body.link;

    const emb = new Discord.MessageEmbed();
        emb.setDescription = descs.random();
        emb.setColor(client.config.embedColor);
        emb.setImage(imgURL);

    message.channel.send(emb);
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "image",
    name: "fluff",
    description: "The `fluff` command sends a random cute animal!",
    usage: "`yabe fluff`",
}
