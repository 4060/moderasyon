const Discord = require('discord.js');//CodeArius
const client = new Discord.Client();//CodeArius
exports.run = (client, message, args, member ) => {//CodeArius
 if (!message.member.hasPermission("BAN_MEMBERS")) //CodeArius
{
    const rademoon = new Discord.MessageEmbed()
    .setColor('f5f5f5 ')
    .setDescription('Bu komutu kullanabilmek için yetkiniz bulunmamaktadır!')
    .setFooter(`CodeArius`)
   return message.channel.send(rademoon)
  } 
  if (!message.guild) {

 }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  client.members.unbanReason = reason;
  client.members.unbanAuth = message.author;
  let user = args[0];
  if (!user) {
    const rademoon = new Discord.MessageEmbed()
    .setColor('f5f5f5 ')
    .setDescription('Lütfen banını kaldırmak istediğiniz üyenin id numarasını belirtin.\n\`${prefix}unban @kullanıcı sebep\` şeklinde kullanın.')
    .setFooter(`CodeArius`)
   return message.channel.send(rademoon).catch(console.error);
  } 
  if (reason.length < 1) {
    const rademoon = new Discord.MessageEmbed()
    .setColor('f5f5f5')
    .setDescription('Ban kaldırma sebebini yazmalısın!') 
    .setFooter(`CodeArius`)
   return message.channel.send(rademoon)
  } 
 
  
  message.guild.members.unban(user);
  const rademoon = new Discord.MessageEmbed()
    .setColor('f5f5f5 ')
    .setDescription('Bir kullanıcın yasağı kaldırıldı!')
    .addField('Kullanıcı', `<@!${user}>`,true)
    .setFooter(`CodeArius`)

  
   message.channel.send(rademoon)
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'unban',
  description: 'İstediğiniz kişinin banını kaldırır.',
  usage: 'unban [kullanıcı] [sebep]'
};