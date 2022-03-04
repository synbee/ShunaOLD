/**
 * /* eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

import { MessageType, proto, WAMessage } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "retrieve",
			description: "retrieve viewOnceMessage WhatsApp Message",
			category: "utils",
			usage: `${client.config.prefix}retrieve [Tag the viewOnceMessage]`,
			baseXp: 10,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		if (!M.quoted)
			return void (await M.reply(
				`Quote the "viewOnceMessage" you want to retrieve`
			));
		if (
			!(M?.quoted?.message?.message as proto.Message)?.viewOnceMessage?.message
				?.videoMessage &&
			!(M.quoted.message?.message as proto.Message).viewOnceMessage?.message
				?.imageMessage
		)
			return void M.reply(
				'𝐐𝐮𝐨𝐭𝐞 𝐭𝐡𝐞 "𝐯𝐢𝐞𝐰𝐎𝐧𝐜𝐞𝐌𝐞𝐬𝐬𝐚𝐠𝐞" 𝐭𝐡𝐚𝐭 𝐲𝐨𝐮 𝐰𝐚𝐧𝐭 𝐭𝐨 𝐫𝐞𝐭𝐫𝐢𝐞𝐯𝐞'
			);
		return void M.reply(
			await this.client.downloadMediaMessage(
				(M.quoted.message?.message as proto.Message)
					.viewOnceMessage as WAMessage
			),
			MessageType[
				(M.quoted.message?.message as proto.Message).viewOnceMessage?.message
					?.imageMessage
					? "image"
					: "video"
			],
			undefined,
			undefined,
			"🌟 𝐇𝐞𝐫𝐞..."
		);
	};
}
