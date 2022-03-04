/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			adminOnly: true,
			command: "revoke",
			description: "Revokes the group link.",
			category: "moderation",
			usage: `${client.config.prefix}revoke`,
			baseXp: 0,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
			return void M.reply(
				"𝐻𝑜𝑤 𝑐𝑎𝑛 𝐼 𝑟𝑒𝑣𝑜𝑘𝑒 𝑡ℎ𝑒 𝑔𝑟𝑜𝑢𝑝 𝑙𝑖𝑛𝑘 𝑤𝑖𝑡ℎ𝑜𝑢𝑡 𝑏𝑒𝑖𝑛𝑔 𝑎𝑛 𝑎𝑑𝑚𝑖𝑛?"
			);
		await this.client.revokeInvite(M.from).catch(() => {
			return void M.reply("𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐫𝐞𝐯𝐨𝐤𝐞 𝐭𝐡𝐞 𝐠𝐫𝐨𝐮𝐩 𝐥𝐢𝐧𝐤");
		});
		return void M.reply("𝐆𝐫𝐨𝐮𝐩 𝐥𝐢𝐧𝐤 𝐫𝐞𝐯𝐨𝐤𝐞𝐝");
	};
}
