const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let embed = new Discord.MessageEmbed().setTitle("Help?").setColor(0xff4500);

  message.channel.send(embed).then((m) => {
    embed.setTitle("**HELP**");

    client.cmdhelp.forEach((element) => {
      embed.addField(
        `**${element.name.toUpperCase()}**`,
        `- ${element.description}\n- ${element.usage}`
      );
    });
    m.edit(embed);
  });
};

exports.help = {
  name: "help",
  category: "General",
  description: "need some help?",
  usage: "help",
};
