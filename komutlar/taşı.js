const Discord = require("discord.js");//CodeArius
exports.run = (client, message, args) => {//CodeArius
    if (!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send("Bu komutu kullana bilmek için `Üyeleri taşı` yetkisine sahip olmanız gerek")
    let kanal = args[1];
    let kullanici = message.mentions.members.first()
    if (!kullanici) return message.channel.send("Taşıyacağın kişiyi etiketlemelisin!")
    if (!kanal) return message.channel.send("Taşıyacağın kanalın İD'sini belirtmeyi unuttun.")
   
    kullanici.voice.setChannel(`${kanal}`)
        .then(() =>
            message.channel.send(`${kullanici} <#${kanal}> adlı kanala taşındı.`))
        .catch(console.error);
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['üyeyitaşı'],
    permLevel: 0
};
exports.help = {
    name: 'taşı',
    description: 'İstediğiniz kişiniyi bir sesli kanaldan diğerine taşır.',
    usage: 'taşı [kullanıcı] [kanal id]'
};