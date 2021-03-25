const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let embed = new Discord.MessageEmbed()
        .setColor(client.config.embedColor)
        .setDescription(`[Click here to invite me to your server :3](https://discord.com/api/oauth2/authorize?client_id=755708845744980051&permissions=470150262&scope=bot)`);

    message.channel.send(embed);
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "util",
    name: "invite",
    description: "The `invite` command sends an instant invite for Yabe straight to your own server(s).",
    usage: "`yabe invite`",
}
