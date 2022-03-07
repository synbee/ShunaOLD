/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { MessageType, Mimetype } from "@adiwajshing/baileys";
import { Sticker, Categories, StickerTypes } from "wa-sticker-formatter";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "everyone",
      description: "Tags all users in group chat",
      aliases: ["all", "tagall", "ping"],
      category: "moderation",
      usage: `${client.config.prefix}everyone`,
      adminOnly: true,
      baseXp: 20,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined, flags }: IParsedArgs
  ): Promise<void> => {
    flags.forEach((flag) => (joined = joined.replace(flag, "")));
    const members = await (
      await this.client.groupMetadata(M.from)
    ).participants;
    const stickers = [
      "https://www.linkpicture.com/q/1646619032890.jpg",
      "https://www.linkpicture.com/q/IMG_20220307_072807.png",
      "https://www.linkpicture.com/q/173911c10e8cb29698a15530408188d6.jpg",
      "https://www.linkpicture.com/q/25c6aa7a5a2f57980d52949b3e615096.jpg",
      "https://www.linkpicture.com/q/310872bd3a143863bc14f24fe8ab10f6.jpg",
      "https://www.linkpicture.com/q/156169f4a0ef88fd9add7a62fed5bc60.jpg",
    ];
    const random = stickers[Math.floor(Math.random() * stickers.length)];
    if (flags.includes("--s") || flags.includes("--sticker")) {
      const sticker: any = await new Sticker(random, {
        pack: "𝑅𝑒𝑎𝑑 𝑄𝑢𝑜𝑡𝑒𝑑 𝑀𝑒𝑠𝑠𝑎𝑔𝑒",
        author: "𝑆 𝐻 𝑈 𝑁 𝐴,
        quality: 90,
        type: "default",
        categories: ["🎊"],
      });
      return void (await M.reply(
        await sticker.build(),
        MessageType.sticker,
        Mimetype.webp,
        M.groupMetadata?.participants.map((user) => user.jid)
      ));
    } else if (flags.includes("--h") || flags.includes("--hide")) {
      return void (await M.reply(
        `⑅─── ∘°❉ ${M.groupMetadata?.subject} ❉°∘ ───⑅\n❀ 𝐌𝐞𝐦𝐛𝐞𝐫𝐬: ${
          members.length
        }\n✿ 𝐀𝐧𝐧𝐨𝐮𝐧𝐜𝐞𝐫: @${M.sender.jid.split("@")[0]}\n✥ 𝐓𝐚𝐠𝐬: 𝐇𝐈𝐃𝐃𝐄𝐍`,
        undefined,
        undefined,
        M.groupMetadata?.participants.map((user) => user.jid)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ).catch((reason: any) =>
        M.reply(`🎐 𝑨𝒏 𝒆𝒓𝒓𝒐𝒓 𝒐𝒄𝒄𝒖𝒓𝒓𝒆𝒅, 𝑹𝒆𝒂𝒔𝒐𝒏: ${reason}`)
      ));
    } else {
      interface metadata {
        mods: string[];
        admins: string[];
        others: string[];
      }
      const metadata: metadata = {
        mods: [],
        admins: [],
        others: [],
      };
      for (const i of members) {
        if (i.jid === M.sender.jid) continue;
        if (!this.client.config.mods?.includes(i.jid)) continue;
        metadata.mods.push(i.jid);
      }
      for (const a of members) {
        if (a.jid === M.sender.jid) continue;
        if (this.client.config.mods?.includes(a.jid)) continue;
        if (!a.isAdmin) continue;
        metadata.admins.push(a.jid);
      }
      for (const k of members) {
        if (k.jid === M.sender.jid) continue;
        if (this.client.config.mods?.includes(k.jid)) continue;
        if (k.isAdmin) continue;
        metadata.others.push(k.jid);
      }
      let text = `*⑅─── ∘°❉ ${M.groupMetadata?.subject} ❉°∘ ───⑅\n❀ 𝐌𝐞𝐦𝐛𝐞𝐫𝐬: ${
        members.length
      }\n✿ 𝐀𝐧𝐧𝐨𝐮𝐧𝐜𝐞𝐫: @${M.sender.jid.split("@")[0]}\n✥ 𝐓𝐚𝐠𝐬:`;
      if (metadata.mods.length > 0) {
        for (const Mods of metadata.mods) {
          text += `\n🏅 *@${Mods.split("@")[0]}*`;
        }
      }
     // text += `\n`;
      if (metadata.admins.length > 0) {
        text += `\n`;
        for (const admins of metadata.admins) {
          text += `\n👑 *@${admins.split("@")[0]}*`;
        }
      }
     // text += `\n`;
      if (metadata.others.length > 0) {
        text += `\n`;
        for (const others of metadata.others) {
          text += `\n🌺 *@${others.split("@")[0]}*`;
        }
      }
      return void M.reply(
        text,
        MessageType.text,
        undefined,
        M.groupMetadata?.participants.map((user) => user.jid)
      );
    }
  };
}
