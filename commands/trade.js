const Discord = require("discord.js");

let { players, pokemon } = require("../dataStore.js");

module.exports.run = async (client, message, args) => {
  const target = message.mentions.members.first();

  if (!target) return message.reply("no target to trade with");
  if (!players[message.author.id])
    return message.reply("you don't have any pokemons");
  const pokemon = players[message.author.id];

  console.log("POKEMON", pokemon);
};

exports.help = {
  name: "trade",
  category: "General",
  description: "trade pokemon",
  usage: "trade mention pokemon_number",
};
