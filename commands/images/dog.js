const fetch = require('node-fetch');

exports.run = async (client, message, args) => {
    const url = 'https://random.dog/woof.json';
    
    let res = await fetch(url);

    if(!res.ok){
        message.channel.send("Something went wrong! Tell a dev or try again.")
        return
    }

    const json = await res.json();

    message.channel.send(json.url);

}
exports.help = {
    enabled: true,
    hideHelp: false,
    type: "image",
    name: "dog",
    aliases: ["doggo", "doge"],
    description: "The `dog` command sends a random doggo!",
    usage: "`yabe dog`",
}
