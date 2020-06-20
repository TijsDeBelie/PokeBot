const Discord = require("discord.js");
const fs = require("fs");

let { players, pokemon, prefix } = require("../dataStore.js");
const savePlayers = require("../SavePlayers");

module.exports.run = async (client, msg, args) => {
  const guessedPokemon = msg.content.replace(`${prefix}catch `, "");

  const p = pokemon[msg.guild.id];
  if (!p) return console.log("ERROR", p);

  if (guessedPokemon == p.name) {
    msg.reply("you caught it");

    players[msg.author.id] = [
      ...players[msg.author.id],
      {
        [p.name]: {
          exp: p.exp,
          level: p.level,
          stats: [...p.stats],
        },
      },
    ];
    savePlayers();
  }
};

exports.help = {
  name: "catch",
  category: "General",
  description: "catch me",
  usage: "catch <name>",
};
