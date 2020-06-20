const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");
const botconfig = require("./botconfig.json");

const fs = require("fs");

let { players, pokemon, prefix } = require("./dataStore.js");
const LevelUpPokemon = require("./LevelUp.js");

client.commands = new Discord.Collection();
client.cmdhelp = new Discord.Collection();

client.loadCommands = () => {
  fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);

    let jsFiles = files.filter((f) => f.split(".").pop() === "js");

    jsFiles.forEach((f, i) => {
      delete require.cache[require.resolve(`./commands/${f}`)];
      let props = require(`./commands/${f}`);
      console.log("LOG : " + f);
      client.commands.set(f, props);
      client.cmdhelp.set(props.help.name, props.help);
    });
  });
};

client.loadCommands();

client.on("error", (error) => {
  console.log(`ERROR ${error}`);
  client.log(error, "Error", "error");
});

client.on("guildCreate", (guild) => {
  console.log(`GUILD JOIN ${guild.name} (${guild.id})`);
  client.log(`${guild.name} (${guild.id})`, "Guild Join", "joinleave");
});

client.on("guildDelete", (guild) => {
  console.log(`GUILD LEAVE ${guild.name} (${guild.id})`);
  client.log(`${guild.name} (${guild.id})`, "Guild Leave", "joinleave");
});

client.on("ready", () => {
  console.log("ready");
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.author.bot) return;

  if (!players.hasOwnProperty(msg.author.id)) {
    players[msg.author.id] = [];
  }

  LevelUpPokemon(msg);

  try {
    args = msg.content.slice(prefix.length).trim().split(/ +/g);
    command = args.shift().toLowerCase();

    let cmd = client.commands.get(command + ".js");

    if (cmd) {
      cmd.run(client, msg, args);
      console.log(
        `[${msg.guild.name}/#${msg.channel.name}] ${msg.author.tag} (${msg.author.id}): ${cmd.help.name}`
      );
    }
  } catch (error3) {
    console.log("ERROR at msg: " + error3);
    client.log(error3, "Error at msg", "error");
  }
});

client.log = async (content, title, type) => {
  let embed = new Discord.RichEmbed()
    .setTitle(title)
    .setDescription(content.toString().substr(0, 2048))
    .setColor(0xff4500)
    .setTimestamp();

  if (type === "event") {
    client.channels.get(botconfig.channel).send(embed);
  } else if (type === "error") {
    client.channels.get(botconfig.channel).send(embed);
  } else if (type === "joinleave") {
    client.channels.get(botconfig.channel).send(embed);
  }
};

client.login(botconfig.token);
