/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";
import Canvacord from "canvacord";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "rank",
			description: "Displays User's Stats",
			category: "general",
			usage: `${client.config.prefix}rank [tag/quote]`,
			aliases: ["stats"],
			baseXp: 10,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		if (M.quoted?.sender) M.mentioned.push(M.quoted.sender);
		const user = M.mentioned[0] ? M.mentioned[0] : M.sender.jid;
		let username = user === M.sender.jid ? M.sender.username : "";
		if (!username) {
			const contact = this.client.getContact(user);
			username =
				contact.notify || contact.vname || contact.name || user.split("@")[0];
		}
		let pfp: string;
		try {
			pfp = await this.client.getProfilePicture(user);
		} catch (err) {
			M.reply(`𝐏𝐫𝐨𝐟𝐢𝐥𝐞 𝐏𝐢𝐜𝐭𝐮𝐫𝐞 𝐧𝐨𝐭 𝐀𝐜𝐜𝐞𝐬𝐬𝐢𝐛𝐥𝐞 𝐨𝐟 ${username}`);
			pfp =
				"https://www.linkpicture.com/q/1646053747862.jpg";
		}
		const exp = (await this.client.getUser(user)).Xp;
		let role: string;
		if (exp < 500) {
			role = "🌸 Citizen";
		} else if (exp < 1000) {
			role = "🔎 Cleric";
		} else if (exp < 2000) {
			role = "🔮 Wizard";
		} else if (exp < 5000) {
			role = "♦️ Mage";
		} else if (exp < 10000) {
			role = "🎯 Noble";
		} else if (exp < 25000) {
			role = "✨ Elite";
		} else if (exp < 50000) {
			role = "🔶️ Ace";
		} else if (exp < 75000) {
			role = "🌀 Hero";
		} else if (exp < 100000) {
			role = "💎 Supreme";
		} else if (exp < 125000) {
		    role = "❄️ Mystic";
		} else if (exp < 150000) {
		    role = "🧿 Majin";
		} else if (exp < 175000) {
		    role = "🧚‍♀️ Fairy";
		} else if (exp < 200000) {
		    role = "♠️ Fallen Angel";
		} else if (exp < 225000) {
		    role = "💥 Orc Disaster";
		} else if (exp < 250000) {
		    role = "🛡️ True Hero";
		} else if (exp < 275000) {
		    role = "🩸 Vampire";
		} else if (exp < 300000) {
		    role = "⚡ Demon Peer";
		} else if (exp < 325000) {
		    role = "🔥 Dragon";
		} else if (exp < 350000) {
		    role = "🧧 Demon Lord";
		} else {
			role = "🐉 True Dragon";
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let level: number;
		if (exp < 500) {
			level = 1;
		} else if (exp < 1000) {
			level = 2;
		} else if (exp < 2000) {
			level = 3;
		} else if (exp < 5000) {
			level = 4;
		} else if (exp < 10000) {
			level = 5;
		} else if (exp < 25000) {
			level = 6;
		} else if (exp < 50000) {
			level = 7;
		} else if (exp < 75000) {
			level = 8;
		} else if (exp < 100000) {
			level = 9;
		} else if (exp < 125000) {
		    level = 10;
		} else if (exp < 150000) {
		    level = 11;
		} else if (exp < 175000) {
		    level = 12;
		} else if (exp < 200000) {
		    level = 13;
		} else if (exp < 225000) {
		    level = 14;
		} else if (exp < 250000) {
		    level = 15;
		} else if (exp < 275000) {
		    level = 16;
		} else if (exp < 300000) {
		    level = 17;
		} else if (exp < 325000) {
		    level = 18;
		} else if (exp < 350000) {
		    level = 19;
		} else {
			level = 20;
		}
		let required: number;
		if (exp < 500) {
			required = 500;
		} else if (exp < 1000) {
			required = 1000;
		} else if (exp < 2000) {
			required = 2000;
		} else if (exp < 5000) {
			required = 5000;
		} else if (exp < 10000) {
			required = 10000;
		} else if (exp < 25000) {
			required = 25000;
		} else if (exp < 50000) {
			required = 50000;
		} else if (exp < 75000) {
			required = 75000;
		} else if (exp < 100000) {
			required = 100000;
		} else if (exp < 125000) {
		    required = 125000;
		} else if (exp < 150000) {
		    required = 150000;
		} else if (exp < 175000) {
		    required = 175000;
		} else if (exp < 200000) {
		    required = 200000;
		} else if (exp < 225000) {
		    required = 225000;
		} else if (exp < 250000) {
		    required = 250000;
		} else if (exp < 275000) {
		    required = 275000;
		} else if (exp < 300000) {
		    required = 300000;
		} else if (exp < 325000) {
		    requred = 325000;
		} else if (exp < 350000) {
		    required = 350000;
		} else {
			required = 0;
		}
		const rank = new Canvacord.Rank()
			.setAvatar(pfp)
			.setCurrentXP(exp || 0)
			.setRequiredXP(required)
			.setStatus("online", false)
			.setLevel(level, "Level:", true)
			.setRank(0, `Role: ${role}`, true)
			.setProgressBar("#A7A7FC", "COLOR")
			.setOverlay("#FFFFFF")
			.setUsername(username)
			.setDiscriminator("0007")
			.setBackground("COLOR", "#A7A7FC");
		rank.build({}).then((rankcard) => {
			const text = `🦄 𝐔𝐬𝐞𝐫𝐧𝐚𝐦𝐞: ${username}\n\n🔖 𝐋𝐞𝐯𝐞𝐥: ${level}\n\n🍥 𝐄𝐱𝐩: ${
				exp || 0
			} / ${required}\n\n💮 𝐑𝐨𝐥𝐞: ${role}\n\n`;
			M.reply(
				rankcard,
				MessageType.image,
				undefined,
				undefined,
				text,
				undefined
			);
		});
	};
}
