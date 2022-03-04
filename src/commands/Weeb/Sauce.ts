/** @format */

import { TraceMoe } from "trace.moe.ts";
import anilist from "anilist-node";
import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "sauce",
			description: `Gives you the source of the given anime scene.`,
			aliases: ["trace", "source"],
			category: "weeb",
			usage: `${client.config.prefix}sauce [tag_image]`,
			baseXp: 50,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		/*eslint-disable @typescript-eslint/no-explicit-any*/
		/*eslint-disable @typescript-eslint/no-unused-vars*/
		let buffer;
		if (M.quoted?.message?.message?.imageMessage)
			buffer = await this.client.downloadMediaMessage(M.quoted.message);
		else if (M.WAMessage.message?.imageMessage)
			buffer = await this.client.downloadMediaMessage(M.WAMessage);
		else if (M.quoted?.message?.message?.videoMessage)
			buffer = await this.client.downloadMediaMessage(M.quoted.message);
		else if (M.WAMessage.message?.videoMessage)
			buffer = await this.client.downloadMediaMessage(M.WAMessage);
		if (!buffer) return void M.reply(`Give me an image/gif to search, Baka!`);
		const api = new TraceMoe();
		const sauce = await api.fetchAnimeFromBuffer(buffer).catch((err: any) => {
			return void M.reply(`𝐶𝑜𝑢𝑙𝑑𝑛'𝑡 𝑓𝑖𝑛𝑑 𝑎𝑛𝑦 𝑚𝑎𝑡𝑐ℎ𝑖𝑛𝑔 𝑟𝑒𝑠𝑢𝑙𝑡𝑠.`);
		});
		const Anilist = new anilist();
		const details = await Anilist.media.anime(sauce.result[0].anilist);
		const similarity = sauce.result[0].similarity;
		let sentence;
		if (similarity < 0.85) {
			sentence = `𝐴ℎℎ... 𝐼 ℎ𝑎𝑣𝑒 𝑙𝑜𝑤 𝑐𝑜𝑛𝑓𝑖𝑑𝑒𝑛𝑐𝑒 𝑖𝑛 𝑡ℎ𝑖𝑠 𝑜𝑛𝑒 𝑏𝑢𝑡 𝑝𝑙𝑒𝑎𝑠𝑒 𝑡𝑎𝑘𝑒 𝑎 𝑙𝑜𝑜𝑘.`;
		} else {
			sentence = `𝐼 ℎ𝑎𝑣𝑒 𝑠𝑢𝑝𝑒𝑟 𝑐𝑜𝑛𝑓𝑖𝑑𝑒𝑛𝑐𝑒 𝑖𝑛 𝑡ℎ𝑖𝑠 𝑜𝑛𝑒. 𝑇𝑎𝑘𝑒 𝑎 𝑙𝑜𝑜𝑘 𝑎𝑡 𝑡ℎ𝑒 𝑟𝑒𝑠𝑢𝑙𝑡𝑠.`;
		}
		let text = "";
		text += `*${sentence}*\n\n`;
		text += `🌺 *𝐓𝐢𝐭𝐥𝐞: ${details.title.romaji}*\n`;
		text += `🎗 *𝐄𝐩𝐢𝐬𝐨𝐝𝐞: ${sauce.result[0].episode}*\n`;
		text += `💠 *𝐒𝐢𝐦𝐢𝐥𝐚𝐫𝐢𝐭𝐲: ${sauce.result[0].similarity} / 1*\n`;
		text += `💮 *𝐆𝐞𝐧𝐫𝐞𝐬: ${details.genres}*\n`;
		text += `🎋 *𝐓𝐲𝐩𝐞: ${details.format}*\n`;
		text += `📈 *𝐒𝐭𝐚𝐭𝐮𝐬: ${details.status}*\n\n`;
		text += `🌐 *𝐔𝐑𝐋: ${details.siteUrl}*`;
		return void this.client.sendMessage(
			M.from,
			{ url: sauce.result[0].video },
			MessageType.video,
			{
				quoted: M.WAMessage,
				mimetype: Mimetype.gif,
				caption: `${text}`,
			}
		);
	};
}
		
