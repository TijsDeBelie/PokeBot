const Discord = require("discord.js");

let { players } = require("../dataStore.js");
const savePlayers = require("../SavePlayers");

Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

module.exports.run = async (client, msg, args) => {
  players[msg.author.id].move(args[0] - 1, args[1] - 1);
  savePlayers();
  const pokemons = players[msg.author.id].map(
    (el, index) => `${index + 1}. ${Object.keys(el)}`
  );
  const exampleEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle(`UPDATING POKEDEX`)
    .setDescription(`${pokemons.join("\n")}`);
  msg.channel.send(exampleEmbed);
};

exports.help = {
  name: "reorder",
  category: "pokemon",
  description: "reorder 2 pokemons, use the index from the pokedex command",
  usage:
    "reorder from_position to_position, E.G reorder 2 1, to move your second pokemon to the first place",
};
