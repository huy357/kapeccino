const axios = require('axios');



module.exports = {
  config: {
    name: "ai",
    role: 0,
    version: "1.0.0",
    credits: "Jonell Magallanes, port to goatbot by renz",
    description: "EDUCATIONAL",
    commandCategory: "AI",
    usages: "[question]",
    cooldowns: 5,
  },
  onReply: async function({api,args, event}) {
    const { messageID, threadID } = event;

    const id = event.senderID;
      if(!args[0]) {
          return;
      }

    const apiUrl = `https://jonellccprojectapis10.adaptable.app/api/gptconvo?ask=${encodeURIComponent(event.body)}&id=${id}`;

    try {
        const lad = await api.sendMessage("🔎 Searching for an answer. Please wait...", threadID, messageID);
        const response = await axios.get(apiUrl);
        const { response: result } = response.data;

        const responseMessage = `\n╭┈◈『 ✿ 』𝙘𝙝𝙖𝙩𝙜𝙥𝙩 🤖
┆
╰┈◈➤${result}\n\n`;
        api.editMessage(responseMessage, lad.messageID, threadID, messageID);
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", threadID, messageID);
    }
  },
  onStart: function({message, api, args}) {
    
      
      const input = args[0]?.trim();
    if(!input) {
      return message.reply("Provide a prompt.")
    }
  },
  onChat: async function({api,args, message, event}) {
      const prefix = event.body.trim().toLowerCase();
      if(prefix.startsWith("ai")) {
 const { messageID, threadID} = event;
      const input = prefix.replace(/^ai\s*/, "").trim()
    const id = event.senderID;

    if (!args[0]) return message.reply("Please provide your question.\n\nExample: ai what is the solar system?");

    const apiUrl = `https://jonellccprojectapis10.adaptable.app/api/gptconvo?ask=${encodeURIComponent(args.join(" "))}&id=${id}`;

    const lad = await message.reply("🔎 Searching for an answer. Please wait...");

    try {
        if (event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments[0]) {
            const attachment = event.messageReply.attachments[0];

            if (attachment.type === "photo") {
                const imageURL = attachment.url;

                const geminiUrl = `https://joncll.serv00.net/chat.php?ask=${encodeURIComponent(args.join(" "))}&imgurl=${encodeURIComponent(imageURL)}`;
                const response = await axios.get(geminiUrl);
                const { vision } = response.data;

                if (vision) {
                    return api.editMessage(` \n╭┈◈『 ✿ 』𝙘𝙝𝙖𝙩𝙜𝙥𝙩 🤖
┆
╰┈◈➤${vision}\n\n`, lad.messageID, event.threadID, event.messageID);
                } else {
                    return api.sendMessage("🤖 Failed to recognize the image.", threadID, messageID);
                }
            }
        }

        const response = await axios.get(apiUrl);
        const { response: result } = response.data;

        const responseMessage = `\n╭┈◈『 ✿ 』𝙘𝙝𝙖𝙩𝙜𝙥𝙩 🤖
┆
╰┈◈➤${result}\n`;
        api.editMessage(responseMessage, lad.messageID, event.threadID, event.messageID);
        message.reply({
            name: this.config.name,
            messageID: lad.messageID,
            author: event.senderID
        });
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", threadID, messageID);
    }
      }
      }
      
};
