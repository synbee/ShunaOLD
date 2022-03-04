import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'invitelink',
            aliases: ['invite', 'linkgc'],
            description: 'Get the group invite link',
            category: 'general',
            usage: `${client.config.prefix}invite`,
            baseXp: 10
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        // check if Bot is the admin
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
            return void M.reply(`𝐼'𝑚 𝑛𝑜𝑡 𝑎𝑛 𝑎𝑑𝑚𝑖𝑛 𝑜𝑓 𝑡ℎ𝑖𝑠 𝑔𝑟𝑜𝑢𝑝.`)
        if ((await this.client.getGroupData(M.from)).invitelink) {
            const code = await this.client.groupInviteCode(M.from).catch(() => {
                return void M.reply('𝐶𝑜𝑢𝑙𝑑 𝑛𝑜𝑡 𝑔𝑒𝑡 𝑡ℎ𝑒 𝑖𝑛𝑣𝑖𝑡𝑒 𝑙𝑖𝑛𝑘')
            })
            await this.client.sendMessage(
                M.sender.jid,
                `*Invite link:* https://chat.whatsapp.com/${code}`,
                MessageType.text
            )
            return void M.reply('𝑺𝒆𝒏𝒕 𝒚𝒐𝒖 𝒕𝒉𝒆 𝑮𝒓𝒐𝒖𝒑 𝑳𝒊𝒏𝒌 𝒊𝒏 𝒑𝒆𝒓𝒔𝒐𝒏𝒂𝒍 𝒎𝒆𝒔𝒔𝒂𝒈𝒆')
        } else {
            return void M.reply(
                `Command not enabled by the admin.\nUse *${this.client.config.prefix}act invitelink* to enable it`
            )
        }
    }
}
