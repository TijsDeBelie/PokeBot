let { players, pokemon, prefix } = require("./dataStore.js");
const savePlayers = require("./SavePlayers");
const LevelUp = (msg) => {
  const id = msg.author.id;

  if (!players[id][0]) return;
  const pokemonName = Object.keys(players[id][0])[0];

  players[id][0][pokemonName].exp += 100;

  const exp = players[id][0][pokemonName].exp;
  const level = players[id][0][pokemonName].level;
  if (exp >= level * 100) {
    players[id][0][pokemonName].level += 1;
    players[id][0][pokemonName].exp -= level * 100;
    msg.channel.send(
      `${pokemonName.toUpperCase()} leveled up to level ${
        players[id][0][pokemonName].level
      }!!`
    );
  }
  savePlayers();
};

module.exports = LevelUp;
