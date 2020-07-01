
var config = require("../config.json");

const setup = function (guild) {
    let roleName = 'Président.eCE';
    let role = guild.roles.cache.find(x => x.name == roleName);
    if (!role) {
        console.log("created role")
        guild.roles.create({
            data: {
                name: roleName,
                color: 'GREY',
            },
            reason: 'Ce role est necesaire pour les assembles',
        })
            .catch(console.error);
    }
    else {
        //role 
    }

}

const manage = function (msg, assemble) {

    let args = msg.content.split(" ");
    args[0] = args[0].slice(config['prefix'].length)
    if (args[0] == "assemble") {
        if (args.length != 3) {
            msg.reply("La commande doit etre ainsi\n!assemble [role president] [role membre]")
        }
        let channel = msg.channel;
        let voiceChannel = msg.member.voice.channel;

        // if (!voiceChannel) {
        //     channel.send("Vous devez être connecté au canal vocal dans lequel la réunion aura lieu lorsque vous exécuterez cette commande.");
        //     return;
        // }

        // !assemble [role president] [role membre]

        let mentions = msg.mentions;
        let prezMention = mentions.users.first();
        let roleMembre = mentions.roles.first();

        if (!prezMention) {
            msg.reply("Il faut mentionez une personne comme president.e");
        }
        if (!roleMembre) {
            msg.reply("Il faut mentionez un role comme membres de l'assemblee");
        }

        assemble = {
            voice: voiceChannel,
            text: channel,
            president: prezMention,
            membres: roleMembre,
            paroles: [],
            parleur: msg.author
        }



    }
    else if (args[0] == "caduc") {
        assemble.parleur = assemble.paroles[1];
        let ancien = assemble.paroles.pop();
        msg.channel.send(ancien.nickname + "A terminer son tour de parole")
    }
    else {
        console.log("error")
    }



}




module.exports = { setup, manage };
