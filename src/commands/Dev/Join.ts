import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'join',
            description: 'Bot Joins the group',
            category: 'dev',
            dm: true,
            usage: `${client.config.prefix}join`,
            modsOnly: true,
            baseXp: 50
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!M.urls.length) return void M.reply('Link?')
        const url = M.urls.find((url) => url.includes('chat.whatsapp.com'))
        if (!url) return void M.reply('𝑵𝒐 𝑾𝒉𝒂𝒕𝒔𝑨𝒑𝒑 𝑰𝒏𝒗𝒊𝒕𝒆 𝑼𝑹𝑳𝒔 𝒇𝒐𝒖𝒏𝒅 𝒊𝒏 𝒚𝒐𝒖𝒓 𝒎𝒆𝒔𝒔𝒂𝒈𝒆')
        if (this.client.config.mods?.includes(M.sender.jid)) {
            const groups = this.client.chats
                .all()
                .filter((chat) => chat.jid.endsWith('g.us'))
                .map((chat) => chat.jid)
            const s = url.split('/')
            const { status, gid } = await this.client.acceptInvite(s[s.length - 1]).catch(() => ({ status: 401 }))
            if (status === 401) return void M.reply('𝑪𝒂𝒏𝒏𝒐𝒕 𝒋𝒐𝒊𝒏 𝒈𝒓𝒐𝒖𝒑. 𝑴𝒂𝒚𝒃𝒆, 𝑰 𝒘𝒂𝒔 𝒓𝒆𝒎𝒐𝒗𝒆𝒅 𝒇𝒓𝒐𝒎 𝒕𝒉𝒆𝒓𝒆 𝒃𝒆𝒇𝒐𝒓𝒆!')
            if (groups.includes(gid)) return void M.reply('𝑰𝒎 𝒕𝒉𝒆𝒓𝒆')
            return void M.reply(`𝑰 𝑯𝒂𝒗𝒆 𝑱𝒐𝒊𝒏𝒆𝒅 ${(await this.client.fetchGroupMetadataFromWA(gid)).subject}`)
        }
    }
}
