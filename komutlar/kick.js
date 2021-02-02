const Discord = require('discord.js');
const fs = require('fs');
const ayarlar = require('../ayarlar.json');

var sürüm = ayarlar.sürüm;
var prefix = ayarlar.prefix;
var botid = ayarlar.botid;
exports.run = (client, message, args) => {

  const db = require('quick.db');
  
  if(!message.member.roles.cache.has('rolid'))
    return message.channel.send(`Bu komutu kullanabilmek için yetkiniz bulunmamaktadır!`);
  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
  let modlog = client.channels.cache.cache.find('id', 'kanalid')
  if (message.mentions.users.cache.size < 1) {
    let rademoon = new Discord.MessageEmbed()
        .setColor('f5f5f5 ')
        .setDescription(`Lütfen atmak istediğiniz üyeyi etiketleyin.\n\`${prefix}kick @kullanıcı sebep\` şeklinde kullanın.`)
    .setFooter(`CodeArius`)
    return message.channel.send(rademoon);
  }
  if (reason.length < 1) {
    let rademoon = new Discord.MessageEmbed()
        .setColor('f5f5f5 ')
        .setDescription(`Lütfen atmak istediğiniz üyeyi neden atmak istediğinizi yazın.\n\`${prefix}kick @kullanıcı sebep\` şeklinde kullanın.`)
    .setFooter(`CodeArius`)
    return message.channel.send(rademoon);
  }
  if (user.id === message.author.id) {
    let rademoon = new Discord.MessageEmbed()
        .setColor('f5f5f5 ')
        .setDescription(`D-dostum kendi mi banlayacaksın?!`)
    .setFooter(`CodeArius`)
    return message.channel.send(rademoon);
  }
  
  
  const rademoon = new Discord.MessageEmbed()
  .setColor('f5f5f5 ')
  .addField('Banlanan ', `${user.tag} (${user.id})`, true)
  .addField('Yetkili', `${message.author.username}#${message.author.discriminator}`, true)
  .addField('Sebep', "```" + reason + "```")
  .setFooter(`CodeArius`)
  modlog.send(rademoon);
  let dmbildir = new Discord.MessageEmbed()
      .setColor('f5f5f5')
      .setDescription(`\`${message.guild.name}\` Adlı Sunucuda yaptığınız olumsuz davranışlardan dolayı yasaklandınız.\nYetkilinin girdiği sebep \`\`\`\n${reason}\n\`\`\``)
  .setFooter(`CodeArius`)
  user.send(dmbildir)
  
  
  message.guild.kick(user, reason);
  
  const rademoon2 = new Discord.MessageEmbed()
  .setColor('f5f5f5')
  .setDescription(`${user} Adlı kullanıcı \`${reason}\` sebebinden dolayı sunucudan uzaklaştırıldı.`)
  .setFooter(`CodeArius`)
  message.channel.send(rademoon2)

  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  kategori: "moderasyon",
category: "moderation",
};

exports.help = {
  name: 'kick',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'yasakla <@kullanıcı> <sebep>',
 
};