const Discord = require('discord.js');

module.exports = (client) => {
    const { config } = client;
    let embed = new Discord.MessageEmbed()
        .setTitle("I got disconnected. plz help")
        .setTimestamp()
        .setColor(client.config.embedColor);

    client.channels
        .get(config.disconnectChannel)
        .send(embed)
        .catch(console.error);;
}
