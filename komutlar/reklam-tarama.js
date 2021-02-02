const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')

exports.run = (client, message, args) => {
  
    if (!message.member.hasPermission("ADMINISTRATOR"))

    return message.channel.send(
    new Discord.MessageEmbed()
    .setDescription(`Bu komutu kullanabilmek için yetkiniz bulunmamaktadır!`)
    .setColor('f5f5f5')

    );
    const members = message.guild.members.cache.filter(member => member.user.presence.activites && /(discord|http|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/g.test(member.user.presence.activites.name));
    const memberss = message.guild.members.cache.filter(member => member.user.username && /(discord|http|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/g.test(member.user.username));
    const rademoon = new Discord.MessageEmbed()
        .addField('Durumu', members.map(member => `${member} = ${member.user.presence.activites.name}`).join("\n") || "Sunucu da bulunan üyelerin durumların da reklam içerikli bir yazı tespit edilemedi.")
        .addField('Kullanıcı Adı', memberss.map(member => `${member} = ${member.user.username}`).join("\n") || "Sunucu da bulunan üyelerin kullanıcı adlarında reklam içerikli bir yazı tespit edilemedi.")
    .setFooter(`CodeArius`)
        .setColor("f5f5f5")
    message.channel.send({rademoon})
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['reklam-tarama'],
    permLevel: 1
}

exports.help = {
    name: 'reklam-taraması',
  category: 'moderasyon',
    description: 'Kullanıcıların Oynuyor mesajındaki ve Kullanıcı adlarındaki reklamları tarar.',
    usage: 'reklam-taraması'
}