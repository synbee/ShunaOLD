/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "tomystic",
			description: "Will display the info of the bot",
			category: "general",
			usage: `${client.config.prefix}tomystic`,
			baseXp: 100000,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		/*eslint-disable @typescript-eslint/no-explicit-any*/
		const chats: any = this.client.chats
			.all()
			.filter((v) => !v.read_only && !v.archive)
			.map((v) => v.jid)
			.map((jids) => (jids.includes("g.us") ? jids : null))
			.filter((v) => v);
		const pad = (s: any) => (s < 10 ? "0" : "") + s;
		const formatTime = (seconds: any) => {
			const hours = Math.floor(seconds / (60 * 60));
			const minutes = Math.floor((seconds % (60 * 60)) / 60);
			const secs = Math.floor(seconds % 60);
			return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
		};
		const uptime = () => formatTime(process.uptime());
		await M.reply(
			`𝐂𝐨𝐧𝐠𝐫𝐚𝐭𝐮𝐥𝐚𝐭𝐢𝐨𝐧𝐬! *${username}* 𝐘𝐨𝐮'𝐯𝐞 𝐛𝐞𝐞𝐧 𝐩𝐫𝐨𝐦𝐨𝐭𝐞𝐝 𝐭𝐨 𝐑𝐚𝐧𝐤 𝐌𝐲𝐬𝐭𝐢𝐜🎉\n\n 💮𝐑𝐨𝐥𝐞: ❄️ Mystic\n\n𝐓𝐨 𝐜𝐡𝐞𝐜𝐤 𝐲𝐨𝐮𝐫 𝐜𝐮𝐫𝐫𝐞𝐧𝐭 𝐬𝐭𝐚𝐭𝐬 𝐮𝐬𝐞 𝐭𝐡𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 /𝐫𝐚𝐧𝐤.`
		);
	};
}
