import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient, { toggleableGroupActions } from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      adminOnly: true,
      command: "deactivate",
      aliases: ["deact"],
      description: "deactivate certain features on group-chats",
      category: "moderation",
      usage: `${client.config.prefix}deactivate [feature]`,
      baseXp: 0,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    const type = joined.trim().toLowerCase() as toggleableGroupActions;
    if (!Object.values(toggleableGroupActions).includes(type))
      return void M.reply(
        `🟥 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐎𝐩𝐭𝐢𝐨𝐧: *${this.client.util.capitalize(type)}*`
      );
    const data = await this.client.getGroupData(M.from);
    if (!data[type])
      return void M.reply(
        `🟨 *${this.client.util.capitalize(
          type
        )}* 𝐢𝐬 𝐚𝐥𝐫𝐞𝐚𝐝𝐲 *𝐢𝐧𝐚𝐜𝐭𝐢𝐯𝐞𝐝*, !`
      );
    if (type === "news") {
      await this.client.DB.group.updateOne(
        { jid: M.from },
        { $set: { news: false } }
      );
      await this.client.DB.feature.updateOne(
        { feature: "news" },
        { $pull: { jids: M.from } }
      );
      return void M.reply(
        `🟩 *${this.client.util.capitalize(type)}* 𝐢𝐬 𝐧𝐨𝐰 𝐢𝐧𝐚𝐜𝐭𝐢𝐯𝐞`
      );
    }
    await this.client.DB.group.updateOne(
      { jid: M.from },
      { $set: { [type]: false } }
    );
    return void M.reply(
      `🟩 *${this.client.util.capitalize(type)}* 𝐢𝐬 𝐧𝐨𝐰 𝐢𝐧𝐚𝐜𝐭𝐢𝐯𝐞`
    );
  };
}
