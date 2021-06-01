exports.run = (client, message, args) => {

    let answers = [
        //Postive
        "💯", "Yes", "me likey", "👀", "😍😍", "he's cool yea", "she's cool yea", "uhhhh yes", "indede", "would bang", "my favorite", "pretty good", "music to my ears",
        "dreamy", "Cool", "at least it's not bad", "not the best but still good", "AMAZING", "dude, that's like, awesome", `${client.emojis.cache.find(emote => emote.id == "849389557912305664")}`,
        `they're cute ${client.emojis.cache.find(emote => emote.id == "849388949931425842")}`, "underrated",

        //Negative
        "how about no", "yeah no", "needs much improvement", "barely ok, in short it's shit", "💩 basically", "just horrible", "never ask me to rate that again", "overrated",
        "nobody wants to see that", "i disapprove", "i'm not allowed to say", "that's goodn't", "oh no", "very uhh, how do i say this without sounding rude", "might as well throw it away",
        `this makes me wanna ${client.emojis.cache.find(emote => emote.id == "849389014163390474")}`, `what!! ${client.emojis.cache.find(emote => emote.id == "849389027773382716")}`, `you better be joking ${client.emojis.cache.find(emote => emote.id == "849396254814765108")}`
    ];

    let answer = answers[Math.floor(Math.random() * answers.length)];

    if (args[0]) {
        message.channel.send(answer);
    } else {
        message.channel.send("Give me something to rate");
    }
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "fun",
    name: "rate",
    description: "Rates whatever you input as argument based on her mood",
    usage: "`yabe rate <thing to rate>`"
}
