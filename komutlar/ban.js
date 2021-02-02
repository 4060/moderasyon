const Discord = require('discord.js');//CodeArius
const fs = require('fs');//CodeArius
const ayarlar = require('../ayarlar.json');//CodeArius

var sürüm = ayarlar.sürüm;
var prefix = ayarlar.prefix;
var botid = ayarlar.botid;
exports.run = (client, message, args) => {

  const db = require('quick.db');
  

    
  if(!message.member.roles.cache.has('Rol id'))
    return message.channel.send(`Bu komutu kullanabilmek için yetkiniz bulunmamaktadır!`);
  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
  let modlog = client.channels.cache.cache.find('id', 'Kanal id')
  if (message.mentions.users.cache.size < 1) {
    let rademoon = new Discord.MessageEmbed()
        .setColor('f5f5f5 ')
        .setDescription(`Lütfen banlamak istediğiniz üyeyi etiketleyin.\n\`${prefix}ban @kullanıcı sebep\` şeklinde kullanın.`)

    return message.channel.send(rademoon);
  }
  if (reason.length < 1) {
    let rademoon = new Discord.MessageEmbed()
        .setColor('f5f5f5 ')
        .setDescription(`Lütfen banlamak istediğiniz üyeyi neden yasaklamak istediğinizi yazın.\n\`${prefix}ban @kullanıcı sebep\` şeklinde kullanın.`)
    return message.channel.send(rademoon);
  }
  if (user.id === message.author.id) {
    let rademoon = new Discord.MessageEmbed()
        .setColor('f5f5f5 ')
        .setDescription(`D-dostum sen benimle dalga mı geçiyorsun kendini mi banlatacaksın!?`)
    return message.channel.send(rademoon);
  }
  
  if (!message.guild.member(user).members.bannable) return message.channel.send(`Bu kişiyi sunucudan yasaklayamıyorum çünkü yetkisi benden yüksek!`);
  
  const embed = new Discord.MessageEmbed()
  .setColor('f5f5f5 ')
  .addField('Banlanan ', `${user.tag} (${user.id})`, true)
  .addField('Yetkili', `${message.author.username}#${message.author.discriminator}`, true)
  .addField('Sebep', "```" + reason + "```")
  modlog.send(embed);
  let rademoon = new Discord.MessageEmbed()
      .setColor('f5f5f5 ')
      .setDescription(`\`${message.guild.name}\` Adlı Sunucuda yaptığınız olumsuz davranışlardan dolayı yasaklandınız.\nYetkilinin girdiği sebep \`\`\`\n${reason}\n\`\`\``)
  user.send(rademoon)

  message.guild.members.ban(user, reason);
  
  const atan1 = new Discord.MessageEmbed()
  .setColor('f5f5f5 ')
  .setDescription(`${user} Adlı kullanıcı \`${reason}\` sebebinden dolayı sunucudan yasaklandı.`)
  message.channel.send(atan1)

  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ban'],
  permLevel: 0,
  kategori: "moderasyon",
category: "moderation",
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'yasakla <@kullanıcı> <sebep>',
 
};