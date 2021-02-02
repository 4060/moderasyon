const Discord = require('discord.js');//CodeArius
const db = require("quick.db")
exports.run = async (client, message, args) => {
 if (!message.member.roles.cache.has('Rol id') && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setDescription('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!').setColor("f5f5f5"));
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setDescription('Jaile sürgün edilecek üyeyi etiketlemen gerekiyor.').setColor("f5f5f5"));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
   let reason = args.slice(1).join(" ")
      if(!reason) return message.channel.send("Lütfen bir sebep belirtin.").then(m => m.delete({timeout: 5000}));
  message.guild.members.cache.get(member.id).roles.cache.forEach(r => {
message.guild.members.cache.get(member.id).roles.remove(r)
})
  //CodeArius
  member.roles.add('cezalı rol id')
     const kanal = message.guild.channels.cache.cache.find(c => c.id == "log kanal id")
    const rademoon = new Discord.MessageEmbed() 
    .setDescription(`${kullanıcı} Adlı üye **${reason}** sebebi ile jaile sürgün edildi!`)//CodeArius
    .setColor('f5f5f5')
    .setFooter(`CodeArius`)
    return message.channel.send(rademoon)
  //CodeArius
  
  let embed = new Discord.MessageEmbed() 
  .setDescription(`${kullanıcı} Adlı kullanıcı başarıyla jaile sürgün edildi!`) 
  .setColor('f5f5f5')
  .setFooter(`CodeArius`)
  return message.channel.send(embed).then(kanal.send(embed)).then(m => m.delete({timeout: 5000}));
  
}

//CodeArius
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ceza","cezalandır"],
  kategori: "Yetkili Komutları",
  permLevel: 2
}

exports.help = {
  name: 'jail',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: 'jail @etiket sebep'
}