const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const token =
  "MTE3NTUyMzE1NTA3OTU5ODIzMQ.GxXFvN.Lb-L8nHjMeKpEL0NWYSaiSikJuMYqusQ16D8uA";

// Replace 'ADMIN_USER_ID' with the actual User ID of an administrator
const adminUserIds = ["521285172877066270", "1102622469476581388"];

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  try {
    // Check if the message is in a guild (server)
    if (message.guild) {
      // Check if the message author is an administrator
      const isAdministrator = adminUserIds.includes(message.author.id);

      // Check if the message contains a link and the author is not an administrator
      if (!isAdministrator && containsLink(message.content)) {
        // Delete the message
        await message.delete();
        console.log(
          `Deleted message from ${message.author.tag}: ${message.content}`
        );
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
});

// Function to check if a message contains a link
function containsLink(text) {
  const linkRegex = /(http[s]?:\/\/[^\s]+)/gi;
  return linkRegex.test(text);
}

// Log in to Discord
client.login(token);
