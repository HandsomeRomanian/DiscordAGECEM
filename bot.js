delete require.cache[require.resolve("./modules/chatFilter.js")];
delete require.cache[require.resolve("./modules/utils.js")];
delete require.cache[require.resolve("./modules/admin.js")];
delete require.cache[require.resolve("./modules/music.js")];
delete require.cache[require.resolve("./modules/assemble.js")];
delete require.cache[require.resolve("./assets/bannedWords.json")];
delete require.cache[require.resolve("./auth.json")];
delete require.cache[require.resolve("./config.json")];

const Discord = require("discord.js");
const auth = require("./auth.json");

var config = require("./config.json");
var utilModule = require("./modules/utils");
var adminModule = require("./modules/admin");
var msgModule = require("./modules/chatFilter");
var musicController = require("./modules/music");
var assembleController = require("./modules/assemble");

var assemble = null;

const client = new Discord.Client();


client.on("ready", () => {

    client.guilds.cache.forEach(element => {
        assembleController.setup(element);
    });


    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Serving ${client.guilds.cache.size} guilds and ${client.users.cache.size} users!`);
});

client.on("message", async msg => {
    msgModule.checkBadWords(msg);

    if (msg.author.bot) return;

    if (assemble.text && assemble.text == msg.channel) {

    }

    let args = msg.content.split(" ");

    if (args[0][0] == config["prefix"]) {
        args[0] = args[0].substr(1);
        switch (args.shift()) {
            case "assemble":
            case "caduc":
                assembleController.manage(msg, assemble);

                break;
            case "ping":
                utilModule.ping(msg);
                break;
            case "6teen":
                musicController.executeEgg(msg, "https://www.youtube.com/watch?v=Y_jby6F2H3k");
                break;
            case "himark":
                musicController.executeEgg(msg, "https://www.youtube.com/watch?v=zLhoDB-ORLQ");
                break;
            case "music":
                const action = args.shift();
                if (!action) {
                    msg.channel.send("Music help menu here soon");
                }
                switch (action.toLowerCase()) {
                    case "play":
                        musicController.execute(msg);
                        break;
                    case "stop":
                        musicController.stop(msg);
                        break;
                    case "skip":
                        musicController.skip(msg);
                        break;
                    default:
                        msg.channel.send("Invalid argument for command music.")
                        break;
                }
                break;
            case "banword":
            case "banwords":
                for (let i = 0; i < args.length; i++) {
                    msgModule.BanWord(args[i], msg);
                }
                break;
            case "reload":
                reload(args[0], msg)
                break;
            case "ban":
                adminModule.ban(msg);
                break;
            case "test":
                console.log(args[0]);
                break;
            case "purge":
                utilModule.purge(args[0], msg)
                break;
        }
    } else {
    }
});

async function reload(moduleName, msg) {
    if (msg.member.hasPermission('ADMINISTRATOR'))
        if (!moduleName) {
            msg.channel.send("No module has been specified.");
            msg.channel.send("To reload all modules please use 'all' as argument.");
            return;
        }
    let out = null;
    switch (moduleName.toLowerCase()) {
        case "command":
        case "commands":
            out = await msg.channel.send("Reloading commands module.");
            msgModule = null;
            delete require.cache[require.resolve("./modules/commands.js")];
            msgModule = require("./modules/commands.js");
            out.edit("Commands reloaded");
            msg.delete();
            break;
        case "admin":
            out = await msg.channel.send("Reloading admin module.");
            adminModule = null;
            delete require.cache[require.resolve("./modules/admin.js")];
            adminModule = require("./modules/admin");
            out.edit("Admin module reloaded");
            msg.delete();
            break;
        case "util":
        case "utils":
            out = await msg.channel.send("Reloading Utility module.");
            utilModule = null;
            delete require.cache[require.resolve("./modules/utils.js")];
            utilModule = require("./modules/utils.js");
            out.edit("Utilities reloaded");
            msg.delete();
            break;
        case "chatfilter":
            out = await msg.channel.send("Reloading chat filter.");
            msgModule = null;
            delete require.cache[require.resolve("./modules/chatFilter.js")];
            msgModule = require("./modules/chatFilter.js");
            out.edit("ChatFilter reloaded");
            msg.delete();
            break;
        case "assemble":
            out = await msg.channel.send("Reloading assemble module.");
            msgModule = null;
            delete require.cache[require.resolve("./modules/assemble.js")];
            assembleModule = require("./modules/assemble.js");
            out.edit("Assemble module reloaded");
            msg.delete();
            break;
        case "music":
            out = await msg.channel.send("Reloading Music module.");
            musicController = null;
            delete require.cache[require.resolve("./modules/music.js")];
            musicController = require("./modules/music.js");
            out.edit("Music Reloaded");
            msg.delete();
            break;

        case "config":
        case "configs":
        case "all":
            out = await msg.channel.send("Reloading all modules.");
            var config = null;
            var utilModule = null;
            var adminModule = null;
            var msgModule = null;
            var musicController = null;
            var assembleController = null;

            delete require.cache[require.resolve("./assets/bannedWords.json")];
            delete require.cache[require.resolve("./modules/chatFilter.js")];
            delete require.cache[require.resolve("./modules/assemble.js")];
            delete require.cache[require.resolve("./modules/utils.js")];
            delete require.cache[require.resolve("./modules/admin.js")];
            delete require.cache[require.resolve("./modules/music.js")];
            delete require.cache[require.resolve("./config.json")];

            var config = require("./config.json");
            var utilModule = require("./modules/utils");
            var adminModule = require("./modules/admin");
            var msgModule = require("./modules/chatFilter");
            var musicController = require("./modules/music");
            var assembleController = require("./modules/assemble");

            out.edit("Reload complete");
            msg.delete();

            break;

        default:
            msg.channel.send("Module name is invalid.");
            msg.channel.send("To reload all modules please use 'all' as argument.");
            break;
    }
}

client.login(auth["DiscordToken"]);
