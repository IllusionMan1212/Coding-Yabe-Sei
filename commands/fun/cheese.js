const Discord = require("discord.js");
const request = require("request");

exports.run = (client, message, args) => {
    let baseUrl = "https://api.illusionman1212.me/cheese/random";

    if (args?.[0]?.toLowerCase() == "today") {
       baseUrl = "https://api.illusionman1212.me/cheese/today"; 
    }

    request(baseUrl, function (error, _response, body) {
        if (error) {
            message.channel.send("Sorry something seems to have gone wrong!");
            console.log(error);
            return;
        }

        
        body = JSON.parse(body);

        if (body.failed) {
            message.channel.send("Sorry something seems to have gone wrong!. try again in a few minutes or submit a bug report");
        }

        const imgURL = body.cheese.image;
        const link = body.cheese.link;
        const name = body.cheese.name;
        const desc = body.cheese.description;

        const emb = new Discord.MessageEmbed();
            emb.setTitle(name);
            emb.setURL(link);
            emb.setDescription(desc);
            emb.setImage(imgURL);
            emb.setColor(client.config.embedColor);
            if (body.cheese.attributes.made) {
                emb.addField("Milk", body.cheese.attributes.made, false);
            }

            if (body.cheese.attributes.countries.length) {
                emb.addField("Countries", body.cheese.attributes.countries.join(", "), true);
            }

            if (body.cheese.attributes.region) {
                emb.addField("Region", body.cheese.attributes.region, true);
            }

            if (body.cheese.attributes.family) {
                emb.addField("Family", body.cheese.attributes.family, true);
            }

            if (body.cheese.attributes.types.length) {
                emb.addField("Type(s)", body.cheese.attributes.types.join(", "), true);
            }

            if (body.cheese.attributes.fat) {
                emb.addField("Fat", body.cheese.attributes.fat, true);
            }

            if (body.cheese.attributes.calcium) {
                emb.addField("Calcium", body.cheese.attributes.calcium, true);
            }

            if (body.cheese.attributes.textures.length) {
                emb.addField("Texture(s)", body.cheese.attributes.textures.join(", "), true);
            }

            if (body.cheese.attributes.rind) {
                emb.addField("Rind", body.cheese.attributes.rind, true);
            }

            if (body.cheese.attributes.color) {
                emb.addField("Color", body.cheese.attributes.color, true);
            }

            if (body.cheese.attributes.flavors.length) {
                emb.addField("Flavor(s)", body.cheese.attributes.flavors.join(", "), true);
            }

            if (body.cheese.attributes.aromas.length) {
                emb.addField("Aroma(s)", body.cheese.attributes.aromas.join(", "), true);
            }

            if (body.cheese.attributes.vegetarian !== null) {
                emb.addField("Vegetarian", body.cheese.attributes.vegetarian, true);
            }

            if (body.cheese.attributes.producers.length) {
                emb.addField("Producer(s)", body.cheese.attributes.producers.join(", "), true);
            }

            if (body.cheese.attributes.synonyms.length) {
                emb.addField("Synonym(s)", body.cheese.attributes.synonyms.join(", "), true);
            }

            if (body.cheese.attributes.alternative_spellings.length) {
                emb.addField("Alternative Spelling(s)", body.cheese.attributes.alternative_spellings.join(", "), true);
            }

        message.channel.send(emb);
    })
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "fun",
    name: "cheese",
    description: "Fetches all sorts of information about cheeses",
    usage: "`yabe cheese` for random cheeses or `yabe cheese today` for cheese of the day",
}