const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const request = require('request');

//Uptime ayar
const app = express();
app.get("/", (request, response) => {
  console.log("CodeArius");
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//
var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

///////////////////////////////////////////////////Aquarius Moderasyon ///////////////////////////////////////////////////


/*
// odaya sokma
client.on("ready", () => {
  client.channels.cache.get("").join();
})
*/

// Yeni gelenlere dmden mesaj
/*
client.on("guildMemberAdd", member => {
const rademoon = new Discord.MessageEmbed()
.setColor('f5f5f5')
.setTitle('başlık')
.setDescription('içerik')
.setImage('resim linki')
.setFooter(`CodeArius`)
member.send(rademoon)
})
*/

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;

  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  if (message.author.id === ayarlar.admin1) permlvl = 4;
  if (message.author.id === ayarlar.admin2) permlvl = 4;
  return permlvl;
};

///////////////////////////////////////////////////
client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm Selam, Hoşgeldin ^^');
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'sea') {
    msg.reply(' Aleyküm Selam, Hoşgeldin ^^');
  }
});

///////////////////////////////////////////////////Tag rol sistemi
client.on('userUpdate', async user => {
  let sunucu = client.guilds.cache.get('sunucu id'); //Buraya sunucunuzun IDsini yazın
  let tag = "tag"; //Buraya tagınızı yazın
  let rol = "tag alınca verilecek rol id"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let channel = sunucu.channels.cache.find(x => x.id == 'tag alınca atacağı log kanal id'); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
  if (!tag) return;
  if (!rol) return;
  if (!channel) return;
  let member = sunucu.members.cache.get(user.id);
  if (!member) return;
  if (!member.roles.cache.has(rol)) {
    if (member.user.username.includes(tag)) {
      member.roles.add(rol)
      const rademoon = new Discord.MessageEmbed()
      .setColor("f5f5f5")
      .setDescription(`<@${user.id}> Adlı kişi, ${tag} tagımızı aldığından dolayı <@&${rol}> ailemize katıldı!`)
      .setFooter(`CodeArius`)
      channel.send(rademoon)
    }
  }else{
    if (!member.user.username.includes(tag)) {
      member.roles.remove(rol)
      const rademoon = new Discord.MessageEmbed()
      .setColor("f5f5f5")
      .setDescription(`<@${user.id}> Adlı kişi, ${tag} tagımızı çıkarttığından dolayı <@&${rol}> ailemizden ayrıldı!`)
      .setFooter(`CodeArius`)
      channel.send(rademoon)
    }
  }
});

//Tag sistemi
client.on("message", msg => {
  if (msg.content === "tag") {
    msg.channel.send("tagınız");//Tagınızı yazın
     }
});

client.login(ayarlar.token);
