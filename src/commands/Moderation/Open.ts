import { GroupSettingChange } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            adminOnly: true,
            command: 'open',
            description: 'Opens the group for all participants.',
            category: 'moderation',
            usage: `${client.config.prefix}open`,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
            return void M.reply("𝐻𝑜𝑤 𝑐𝑎𝑛 𝐼 𝑜𝑝𝑒𝑛 𝑡ℎ𝑒 𝑔𝑟𝑜𝑢𝑝 𝑤𝑖𝑡ℎ𝑜𝑢𝑡 𝑏𝑒𝑖𝑛𝑔 𝑎𝑛 𝑎𝑑𝑚𝑖𝑛?")
        if (M.groupMetadata.announce === 'false') return void M.reply('𝐺𝑟𝑜𝑢𝑝 𝑖𝑠 𝑎𝑙𝑟𝑒𝑎𝑑𝑦 𝑜𝑝𝑒𝑛!')

        this.client.groupSettingChange(M.groupMetadata.id, GroupSettingChange.messageSend, false)
    }
}
