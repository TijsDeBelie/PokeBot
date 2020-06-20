const Discord = require("discord.js");
const fetch = require("node-fetch");

let { players, pokemon, prefix } = require("../dataStore.js");

const getPokemon = async () => {
  return new Promise((resolve, reject) => {
    const random = Math.floor(Math.random() * 807);
    fetch(`https://pokeapi.co/api/v2/pokemon/${random}`)
      .then((resp) => resp.json())
      .then(function (data) {
        const level = Math.floor(Math.random() * 50 + 1);
        let localStats = data.stats.map((element) => {
          return {
            name: element.stat.name,
            value: Math.floor(
              Math.random() * element.base_stat * level + element.base_stat
            ),
          };
        });
        resolve({
          forms: data.forms[0],
          types: data.types,
          image: data.sprites.front_default,
          stats: localStats,
          exp: data.base_experience,
          level: level,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const sendEmbed = ({ msg, pokemon, image, stats, types, level, exp }) => {
  const exampleEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle(`YOU FOUND A WILD POKEMON`)
    .setDescription(`catch it with ${prefix}catch **pokemon**`)
    .setImage(image)
    .setFooter(`${types.join(" - ")} | level: ${level} | exp: ${exp}`);
  [...stats].forEach((el) => {
    exampleEmbed.addField(`**${el.name.toUpperCase()}**`, `${el.value}`, true);
  });

  msg.channel.send(exampleEmbed);
};

module.exports.run = async (client, msg, args) => {
  getPokemon().then((p) => {
    pokemon[msg.guild.id] = {
      name: p.forms.name,
      image: p.image,
      stats: p.stats,
      exp: p.exp,
      level: p.level,
      types: p.types.map((el) => el.type.name),
    };
    console.log("NAME", pokemon[msg.guild.id].name);
    sendEmbed({
      msg: msg,
      pokemon: pokemon[msg.guild.id].name,
      image: pokemon[msg.guild.id].image,
      stats: pokemon[msg.guild.id].stats,
      types: pokemon[msg.guild.id].types,
      level: pokemon[msg.guild.id].level,
      exp: pokemon[msg.guild.id].exp,
    });
  });
};

exports.help = {
  name: "summon",
  category: "General",
  description: "summon a pokemon",
  usage: "summon",
};
