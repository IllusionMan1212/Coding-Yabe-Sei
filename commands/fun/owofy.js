const Discord = require('discord.js');
const owo = require('owofy');

exports.run = (client, message, args) => {
    let sentence = args.join(' ');
    if (!sentence) return message.reply('I can\'t owo-fy an empty message! uwu');

    let cleanSentence = sentence.replace('@', ' ');

    let newSentence = owo(cleanSentence);

    // fuck you this is now finished
    message.channel.send(newSentence);
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "fun",
    name: "owofy",
    description: "The `owofy` command takes text and owofies it! Just try it out and you'll get the gist of it.",
    usage: "`yabe owofy <text to put through the owofication process>`"
}
