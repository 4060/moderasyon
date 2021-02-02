const Discord = require("discord.js");//CodeArius
 
module.exports.run = async (client, message, args) => {//CodeArius
if(!message.member.roles.cache.has('Rol id'))//CodeArius
return message.channel.send(//CodeArius
new Discord.MessageEmbed()//CodeArius
.setDescription(`Bu komutu kullanabilmek için yetkiniz bulunmamaktadır!`)
.setColor('f5f5f5')//CodeArius
);
    if (!args[0]) {
        let rademoon = new Discord.MessageEmbed//CodeArius
        .setColor('f5f5f5')//CodeArius
        .setDescription(`Bir kullanıcı İD'si belirtmelisiniz.`)
        return message.channel.send(rademoon)
   }
   var sebeb = args.slice(1).join(" ");
   var ege = args[0]
   var now = new Date()
   if (!sebeb) {
       message.guild.fetchBans()
           .then(bans => {
               if (bans.has(ege)) {
                let rademoon = new Discord.MessageEmbed
                .setColor('f5f5f5')
                .setDescription(`Bu kullanıcı zaten yasaklanmış!`)
                return message.channel.send(rademoon)
                   
               }
               message.guild.members.ban(ege, sebeb)
                   .then(async (member) => {
                       let user;
                       if (member instanceof Discord.GuildMember) {
                           user = member.user;
                       }
                       else if (member instanceof Discord.User) {
                           user = member;
                       }
                       else {
                           user = await client.users.fetch(member);
                       }
                       let rademoon = new Discord.MessageEmbed
        .setColor('f5f5f5')
        .setDescription(`<@!${user.id}> Adlı kişi başarıyla yasaklandı!`)
        return message.channel.send(rademoon);
                   })
                   .catch(error => {
                    let rademoon = new Discord.MessageEmbed
                    .setColor('f5f5f5')
                    .setDescription(`Upss!\nBir hata meydana geldi!`)
                    return message.channel.send(rademoon);
                       console.error('Hata', error);
                   });
           });
   } else {
       message.guild.fetchBans()
           .then(bans => {
               if (bans.has(ege)) {
                let rademoon = new Discord.MessageEmbed
                .setColor('f5f5f5')
                .setDescription(`Bu kullanıcı zaten yasaklanmış!`)
                return message.channel.send(rademoon)
        
               }
               message.guild.members.ban(ege, sebeb)
                   .then(async (member) => {
                       let user;
                       if (member instanceof Discord.GuildMember) {
                           user = member.user;
                       }
                       else if (member instanceof Discord.User) {
                           user = member;
                       }
                       else {
                           user = await client.users.fetch(member);
                       }
                       let rademoon = new Discord.MessageEmbed
                       .setColor('f5f5f5')
                       .setDescription(`<@!${user.id}> Sunucudan başarıyla yasaklandı!`)
                       message.channel.send(rademoon);
                   })
                   .catch(error => {
                    let rademoon = new Discord.MessageEmbed
                    .setColor('f5f5f5')
                    .setDescription(`Upss!\nBir hata meydana geldi!`)
                    return message.channel.send(rademoon);
                       console.error('Hata:', error);
                   });
           });
   }
 
}
exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['force-ban'],
   permLevel: 0
 
};
 
exports.help = {
   name: 'forceban',
   description: 'Ban komutu.',
   usage: 'forceban <id>'
};