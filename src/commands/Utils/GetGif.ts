/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import axios from "axios";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { MessageType, Mimetype } from "@adiwajshing/baileys";
import request from "../../lib/request";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "getgif",
			description: "Will give you random gif of the given search term.",
			category: "utils",
			usage: `${client.config.prefix}getgif [term]`,
			aliases: ["gif"],
			baseXp: 40,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!this.client.config.gifApi)
			return void M.reply("𝑁𝑜 𝑘𝑒𝑦 𝑠𝑒𝑡 𝑓𝑜𝑟 𝑠𝑒𝑎𝑟𝑐ℎ𝑖𝑛𝑔 𝑔𝑖𝑓𝑠. ");
		if (!joined) return void (await M.reply(`𝑃𝑙𝑒𝑎𝑠𝑒 𝑝𝑟𝑜𝑣𝑖𝑑𝑒 𝑚𝑒 𝑎 𝑠𝑒𝑎𝑟𝑐ℎ 𝑡𝑒𝑟𝑚!`));
		const search = joined.trim();
		const gif = await axios
			.get(
				`https://g.tenor.com/v1/search?q=${search}&key=${this.client.config.gifApi}&limit=100`
			)
			.catch(() => null);
		if (!gif)
			return void (await M.reply(`𝐺𝑖𝑓 𝑛𝑜𝑡 𝑓𝑜𝑢𝑛𝑑.`));
		const i = Math.floor(Math.random() * gif.data.results.length);
		const caption = "🌺 𝑯𝒆𝒓𝒆...";
		return void M.reply(
			await request.buffer(gif.data.results[i].media[0].mp4.url),
			MessageType.video,
			Mimetype.gif,
			[caption],
			caption
		);
	};
}
