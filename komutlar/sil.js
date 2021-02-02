const Discord = require('discord.js');
exports.run = function (client, message, args) {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Bu komutu kullanabilmek için yetkiniz bulunmamaktadır!");
  if (!args[0]) return message.channel.send("Silinecek mesajın miktarını yaz.");
  message.delete()
  message.react('622507169442693143')
  message.channel.bulkDelete(args[0]).then(() => {
    const rademoon = new Discord.MessageEmbed()
    .setColor('f5f5f5 ')
    .setDescription(`${args[0]} adet mesaj başarıyla uzay boşluğuna fırlatıldı!`)
    .setFooter(`CodeArius`)
    message.channel.send(rademoon)
  })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['clear' , 'sil'],
  permLevel: 1
};

exports.help = {
  name: 'sil',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'sil <silinicek mesaj sayısı>'
};