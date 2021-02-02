const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    const rademoon = new Discord.MessageEmbed()
      .setDescription(`Bu komutu kullanabilmek için yetkiniz bulunmamaktadır!`)
      .setColor("f5f5f5 ")
      

    message.channel.send(rademoon);
    return;
  }
  if (message.channel.type !== "text") return;
  const limit = args[0] ? args[0] : 0;
  if (!limit) {
    var rademoon = new Discord.MessageEmbed()
      .setDescription(`Lütfen bir limit belirtiniz (1-20).`)
      .setColor("f5f5f5 ")
      .setFooter(`CodeArius`)

     
    message.channel.send({ rademoon });
    return;
  }

  let number = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20"
  ];

  if (!number.some(word => message.content.includes(word))) {
    {
      const rademoon = new Discord.MessageEmbed()
        .setDescription(`Süre limiti sadece sayı olabilir`)
        .setColor("f5f5f5 ")
        .setFooter(`CodeArius`)

      message.channel.send(rademoon);
      return;
    }
  }

  if (limit > 20) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Süre limiti maksimum 20 saniye olabilir.")
        .setColor("f5f5f5 ")
        .setFooter(`CodeArius`)
    );
  }
  message.channel.send(
    new Discord.MessageEmbed()
      .setDescription(
        `Yazma süre limiti ${limit} saniye olarak ayarlanmıştır.`
      )
      
      .setColor("eee3e3")
      .setFooter(`CodeArius`)
  );
  var request = require("request");
  request({
    url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
      rate_limit_per_user: limit
    },
    headers: {
      Authorization: `Bot ${client.token}`
    }
  });
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yavaş-mod"],
  permLevel: 2,
  kategori: "moderasyon"
};

exports.help = {
  name: "slowmode",
  description: "Sohbete yazma sınır (süre) ekler.",
  usage: "slowmode [1/20]"
};