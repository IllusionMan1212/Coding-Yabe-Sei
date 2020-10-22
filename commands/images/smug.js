const Discord = require("discord.js");
const fetch = require("node-fetch"); 

exports.run = async (client, message) => {
    const { config } = client;
    const url = "https://api.imgur.com/3/album/NXyuO/images";
    const options = {
        method: "GET",
        headers: {
            "Authorization": `Client-ID ${config.imgurClientId}`,
        }
    };

    let res = await fetch(url, options);

    if (!res.ok){
        console.log(res);
        message.channel.send("Something went wrong! Tell a dev or try again.");
        return;
    }
    try { //better to be safe than sorry
        let image = await res.json();
        let embed = new Discord.MessageEmbed()
            .setColor(client.config.embedColor)
            .setImage(image.data[Math.floor(Math.random() * image.data.length)].link);
        message.channel.send(embed);
    }
    catch (err) {
        console.log(err);
        message.channel.send("An error occured while getting your smug, try again and if the problem persists make a bug report using `yabe bug <bug report>`");
    }
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "image",
    name: "smug",
    description: "Posts a random picture of a smug anime girl", // i want to die
    usage: "`yabe smug`"
}
