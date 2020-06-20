const Discord = require("discord.js");

let { players, pokemon } = require("../dataStore.js");

module.exports.run = async (client, msg, args) => {
  const pokemons = players[msg.author.id].map(
    (el, index) => `${index + 1}. ${Object.keys(el)}`
  );
  const exampleEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle(`POKEDEX`)
    .setDescription(`${pokemons.join("\n")}`);
  msg.channel.send(exampleEmbed);
};

exports.help = {
  name: "ping",
  category: "General",
  description: "Pong! Check my latency.",
  usage: "ping",
};
