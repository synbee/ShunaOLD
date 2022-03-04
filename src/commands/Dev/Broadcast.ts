/** @format */

import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "broadcast",
			description:
				"Will make a broadcast for groups where the bot is in. Can be used to make announcements.",
			aliases: ["bcast", "announcement", "bc"],
			category: "dev",
			dm: true,
			usage: `${client.config.prefix}bc`,
			modsOnly: true,
			baseXp: 0,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined)
			return void (await M.reply(`𝑃𝑙𝑒𝑎𝑠𝑒 𝑝𝑟𝑜𝑣𝑖𝑑𝑒 𝑡ℎ𝑒 𝐵𝑟𝑜𝑎𝑑𝑐𝑎𝑠𝑡 𝑀𝑒𝑠𝑠𝑎𝑔𝑒.`));
		const term = joined.trim();
		const images = [
			"https://wallpapercave.com/wp/wp3144753.jpg",
			"https://wallpapercave.com/wp/wp4782018.jpg",
			"https://wallpaperaccess.com/full/1326836.jpg",
			"https://wallpapermemory.com/uploads/711/chitoge-kirisaki-wallpaper-full-hd-323316.jpg",
			"https://data.whicdn.com/images/304776416/original.jpg",
			"https://i.pinimg.com/564x/ca/e7/8a/cae78ad7f8e6459ad20bde350e2eb78b.jpg",
		];
		const selected = images[Math.floor(Math.random() * images.length)];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const chats: any = this.client.chats
			.all()
			.filter((v) => !v.read_only && !v.archive)
			.map((v) => v.jid)
			.map((jids) => (jids.includes("g.us") ? jids : null))
			.filter((v) => v);
		for (let i = 0; i < chats.length; i++) {
			const text = `*🌸「 𝐒𝐇𝐔𝐍𝐀 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓 」🌸*\n\n${term}\n\n 𝐑𝐞𝐠𝐚𝐫𝐝𝐬 ~ *${M.sender.username}*`;
			this.client.sendMessage(chats[i], { url: selected }, MessageType.image, {
				caption: `${text}`,
				contextInfo: {
					mentionedJid: M.groupMetadata?.participants.map((user) => user.jid),
				},
			});
		}
		await M.reply(`✅ 𝐵𝑟𝑜𝑎𝑑𝑐𝑎𝑠𝑡 𝑚𝑒𝑠𝑠𝑎𝑔𝑒 𝑠𝑒𝑛𝑡 𝑡𝑜 *${chats.length} 𝑔𝑟𝑜𝑢𝑝𝑠*.`);
	};
}
