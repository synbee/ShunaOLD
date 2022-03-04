/** @format */

import { AnimeWallpaper } from "anime-wallpaper";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";
export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "wallpaper",
			description: `Will send you random anime wallpaper of the given term.`,
			aliases: ["wpaper"],
			category: "weeb",
			usage: `${client.config.prefix}wallpaper [term]`,
			baseXp: 20,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if (!joined)
			return void (await M.reply(`𝐺𝑖𝑣𝑒 𝑚𝑒 𝑎 𝑤𝑎𝑙𝑙𝑝𝑎𝑝𝑒𝑟 𝑡𝑒𝑟𝑚 𝑡𝑜 𝑠𝑒𝑎𝑟𝑐ℎ!`));
		const chitoge = joined.trim();
		const wall = new AnimeWallpaper();
		const pages = [1, 2, 3, 4];
		const random = pages[Math.floor(Math.random() * pages.length)];
		const wallpaper = await wall
			.getAnimeWall4({ title: chitoge, type: "sfw", page: random })
			.catch(() => null);
		if (!wallpaper)
			return void (await M.reply(
				`𝘊𝘰𝘶𝘭𝘥𝘯'𝘵 𝘧𝘪𝘯𝘥 𝘢𝘯𝘺 𝘮𝘢𝘵𝘤𝘩𝘪𝘯𝘨 𝘵𝘦𝘳𝘮 𝘰𝘧 𝘸𝘢𝘭𝘭𝘱𝘢𝘱𝘦𝘳.`
			));
		const i = Math.floor(Math.random() * wallpaper.length);
		const buffer = await request.buffer(wallpaper[i].image).catch((e) => {
			return void M.reply(e.message);
		});
		while (true) {
			try {
				M.reply(
					buffer || "✖ 𝐴𝑛 𝑒𝑟𝑟𝑜𝑟 𝑜𝑐𝑐𝑢𝑟𝑟𝑒𝑑. 𝑃𝑙𝑒𝑎𝑠𝑒 𝑡𝑟𝑦 𝑎𝑔𝑎𝑖𝑛 𝑙𝑎𝑡𝑒𝑟.",
					MessageType.image,
					undefined,
					undefined,
					`*🌺 𝐇𝐞𝐫𝐞 𝐲𝐚 𝐠𝐨!*`,
					undefined
				).catch((e) => {
					console.log(
						`This error occurs when an image is sent via M.reply()\n Child Catch Block : \n${e}`
					);
					// console.log('Failed')
					M.reply(`✖ 𝐴𝑛 𝑒𝑟𝑟𝑜𝑟 𝑜𝑐𝑐𝑢𝑟𝑟𝑒𝑑. 𝑃𝑙𝑒𝑎𝑠𝑒 𝑡𝑟𝑦 𝑎𝑔𝑎𝑖𝑛 𝑙𝑎𝑡𝑒𝑟.`);
				});
				break;
			} catch (e) {
				// console.log('Failed2')
				M.reply(`✖ 𝐴𝑛 𝑒𝑟𝑟𝑜𝑟 𝑜𝑐𝑐𝑢𝑟𝑟𝑒𝑑. 𝑃𝑙𝑒𝑎𝑠𝑒 𝑡𝑟𝑦 𝑎𝑔𝑎𝑖𝑛 𝑙𝑎𝑡𝑒𝑟.`);
				console.log(
					`This error occurs when an image is sent via M.reply()\n Parent Catch Block : \n${e}`
				);
			}
		}
		return void null;
	};
}

		

	
		
