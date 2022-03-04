import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'delete',
            description: 'Deletes the quoted Message',
            aliases: ['del'],
            category: 'moderation',
            usage: `${client.config.prefix}delete`,
            adminOnly: true
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!M?.quoted?.message) return void M.reply('𝑸𝒖𝒐𝒕𝒆 𝒕𝒉𝒆 𝒎𝒆𝒔𝒔𝒂𝒈𝒆 𝒚𝒐𝒖 𝒘𝒂𝒏𝒕 𝒕𝒐 𝒅𝒆𝒍𝒆𝒕𝒆')
        if (M.quoted.sender !== this.client.user.jid)
					return void M.reply(
						`𝑰 𝒄𝒂𝒏'𝒕 𝒅𝒆𝒍𝒆𝒕𝒆 𝒕𝒉𝒆 𝒎𝒆𝒔𝒔𝒂𝒈𝒆 𝒐𝒇 𝒂 𝒓𝒂𝒏𝒅𝒐𝒎 𝒎𝒆𝒎𝒃𝒆𝒓`
					);
        await this.client.deleteMessage(M.from, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            id: (M.quoted.message as any).stanzaId,
            remoteJid: M.from,
            fromMe: true
        })
    }
}
