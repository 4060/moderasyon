const rademoon = require("discord.js");//CodeArius
//CodeArius
exports.run = async (client, message, x) => {//CodeArius
  

  let yetkili = message.member.roles.cache.get("716777613858701415");//Herkeste bulunan bir yetki idsini giriniz

    let kullanici = message.guild.members.cache.filter(
      kullanici =>
        kullanici.roles.highest.position >= yetkili.position &&
        kullanici.presence.status !== "online"
    );

    message.channel.send(
      new rademoon.MessageEmbed()
        .setColor('f5f5f5') 
        .setThumbnail('https://media.giphy.com/media/HJ7vV2YUBHnYA/giphy.gif')
        .setTitle(`Toplam sunucu da bulunan yetkili sayısı`)
        .setDescription(`Toplam ${kullanici.size} yetkili bulunmakta.`)
        .setFooter(`CodeArius`)
    
    );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yetkililer"],
  permLevel: 0
};

exports.help = {
  name: "yetkililer",
  description: "Seste olmayan yetkilileri gösterir.",
  usage: "yetkililer"
};