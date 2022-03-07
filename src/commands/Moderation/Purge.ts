import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            adminOnly: true,
            command: 'purge',
            description: 'Removes all group members',
            category: 'moderation',
            usage: `${client.config.prefix}purge`,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!(M.groupMetadata?.owner.split('@')[0] === M.sender.jid.split('@')[0]))
            return void M.reply('𝐎𝐧𝐥𝐲 𝐭𝐡𝐞 𝐠𝐫𝐨𝐮𝐩 𝐨𝐰𝐧𝐞𝐫 𝐜𝐚𝐧 𝐮𝐬𝐞 𝐭𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝')
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
            return void M.reply("𝐇𝐨𝐰 𝐜𝐚𝐧 𝐈 𝐫𝐞𝐦𝐨𝐯𝐞 𝐚𝐥𝐥 𝐨𝐟 𝐭𝐡𝐞 𝐦𝐞𝐦𝐛𝐞𝐫𝐬 𝐰𝐢𝐭𝐡𝐨𝐮𝐭 𝐛𝐞𝐢𝐧𝐠 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧?")
        if (!this.purgeSet.has(M.groupMetadata?.id || '')) {
            this.addToPurge(M.groupMetadata?.id || '')
            return void M.reply(
                "𝐀𝐫𝐞 𝐲𝐨𝐮 𝐬𝐮𝐫𝐞? 𝐓𝐡𝐢𝐬 𝐰𝐢𝐥𝐥 𝐫𝐞𝐦𝐨𝐯𝐞 𝐞𝐯𝐞𝐫𝐲𝐨𝐧𝐞 𝐟𝐫𝐨𝐦 𝐭𝐡𝐞 𝐠𝐫𝐨𝐮𝐩 𝐜𝐡𝐚𝐭. 𝐔𝐬𝐞 𝐭𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐚𝐠𝐚𝐢𝐧 𝐢𝐟 𝐲𝐨𝐮'𝐝 𝐥𝐢𝐤𝐞 𝐭𝐨 𝐩𝐫𝐨𝐜𝐞𝐞𝐝"
            )
        }
        M.groupMetadata.participants.map(async (user) => {
            if (!user.isAdmin)
                await this.client.groupRemove(M.from, [user.jid]).catch(() => console.log('𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐫𝐞𝐦𝐨𝐯𝐞 𝐮𝐬𝐞𝐫𝐬'))
        })
        // now remove all admins except yourself and the owner
        M.groupMetadata.admins.map(async (user) => {
            if (user !== M.sender.jid && user !== this.client.user.jid)
                await this.client.groupRemove(M.from, [user]).catch(() => console.log('error removing admin'))
        })
        await M.reply('𝐃𝐨𝐧𝐞!').catch(() => console.log('Failed to send message'))
        this.client.groupLeave(M.from)
    }

    purgeSet = new Set<string>()

    addToPurge = async (id: string): Promise<void> => {
        this.purgeSet.add(id)
        setTimeout(() => this.purgeSet.delete(id), 60000)
    }
}
