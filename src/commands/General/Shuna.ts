/** @format */

import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "shuna",
			description: "Displays the info",
			category: "general",
			usage: `${client.config.prefix}shuna`,
			baseXp: 200,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		const shuna =
			"https://user-images.githubusercontent.com/97864273/156913350-6426b182-c65b-4971-b964-c8d1849f2c41.mp4";
		return void this.client.sendMessage(
			M.from,
			{ url: shuna },
			MessageType.video,
			{
				quoted: M.WAMessage,
				mimetype: Mimetype.gif,
				caption: `🌺 𝐒𝐇𝐔𝐍𝐀 🌺\n\n🌸 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: 𝐀 𝐖𝐞𝐞𝐛 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 𝐁𝐨𝐭 𝐖𝐢𝐭𝐡 𝐋𝐨𝐭𝐬 𝐎𝐟  𝐀𝐧𝐢𝐦𝐞 𝐅𝐞𝐚𝐭𝐮𝐫𝐞𝐬.\n\n🍹 𝐓𝐨 𝐚𝐝𝐝 𝐛𝐨𝐭 𝐭𝐨 𝐲𝐨𝐮𝐫 𝐠𝐫𝐨𝐮𝐩 \n\n 📒 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 𝐎𝐰𝐧𝐞𝐫: wa.me/+918075922832 \n`,
			}
		);
	};
}
