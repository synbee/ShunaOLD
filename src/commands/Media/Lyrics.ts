import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import Genius from "genius-lyrics";
import yts from "yt-search";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "lyrics",
      description: "Gives you the lyrics of the given song.",
      category: "media",
      aliases: ["ly"],
      usage: `${client.config.prefix}lyrics [song_name]`,
      baseXp: 40,
    });
  }
  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    if (!this.client.config.geniusKey)
      return void M.reply("No Genius Access Token set.");
    if (!joined)
      return void M.reply("𝑂ℎ! 𝑢ℎ 𝑔𝑖𝑣𝑒 𝑚𝑒 𝑎 𝑠𝑜𝑛𝑔 𝑛𝑎𝑚𝑒 𝑡𝑜 𝑓𝑖𝑛𝑑 𝑡ℎ𝑒 𝑙𝑦𝑟𝑖𝑐𝑠!");
    const term = joined.trim();
    const Client = new Genius.Client(this.client.config.geniusKey);
    let search;
    try {
      search = await Client.songs.search(term);
    } catch (error) {
      return void M.reply("𝐶𝑜𝑢𝑙𝑑𝑛'𝑡 𝑓𝑖𝑛𝑑 𝑎𝑛𝑦 𝑚𝑎𝑡𝑐ℎ𝑖𝑛𝑔 𝑠𝑜𝑛𝑔 𝑟𝑒𝑠𝑢𝑙𝑡𝑠.");
    }
    //if(search.error) return void M.reply(`Couldn't find any matching song results.`)
    const lyrics = await search[0].lyrics();
    let text = `🎀 *Title: ${search[0].title}*\n\n`;
    text += `🌐 *URL: ${search[0].url}*\n`;
    await M.reply(
      await this.client.getBuffer(search[0].image),
      MessageType.image,
      undefined,
      undefined,
      text
    );
    const { videos } = await yts(`${term} lyrics`);
    if (!videos || videos.length <= 0)
      return void M.reply(`Couldn't find any matching song results.`);
    return void (await this.client.sendMessage(
      M.from,
      lyrics,
      MessageType.text,
      {
        quoted: M.WAMessage,
        contextInfo: {
          externalAdReply: {
            title: videos[0].title.slice(0, 30),
            body: `Author : ${videos[0].author.name.slice(
              0,
              20
            )}\n🌺 𝐒𝐇𝐔𝐍𝐀 🌺`,
            mediaType: 2,
            thumbnail: await this.client.getBuffer(videos[0].image),
            mediaUrl: videos[0].url,
          },
        },
      }
    ));
  };
}
