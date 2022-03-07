import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            adminOnly: true,
            command: 'groupchange',
            description: 'Updates the Group Subject or Description.',
            category: 'moderation',
            aliases: ['gadd', 'gset'],
            usage: `${client.config.prefix}gset (sub/desc) (value)`,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
            return void M.reply('𝐂𝐚𝐧 𝐧𝐨𝐭 𝐮𝐩𝐝𝐚𝐭𝐞 𝐰𝐢𝐭𝐡𝐨𝐮𝐭 𝐛𝐞𝐢𝐧𝐠 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧')
        // check if first parameter is subject or description
        if (M.args.length < 2) return void M.reply('𝐘𝐨𝐮 𝐧𝐞𝐞𝐝 𝐭𝐨 𝐬𝐩𝐞𝐜𝐢𝐟𝐲 𝐚 𝐬𝐮𝐛𝐣𝐞𝐜𝐭 𝐚𝐧𝐝 𝐚 𝐯𝐚𝐥𝐮𝐞')
        const subject = M.args[1].toLowerCase()
        const value = M.args.slice(2).join(' ')
        if (subject === 'sub' || subject === 'subject') {
            await this.client
                .groupUpdateSubject(M.groupMetadata.id, value.toString())
                .then(() => {
                    return void M.reply('𝐆𝐫𝐨𝐮𝐩 𝐬𝐮𝐛𝐣𝐞𝐜𝐭 𝐮𝐩𝐝𝐚𝐭𝐞𝐝')
                })
                .catch((e) => {
                    console.error(e)
                    return void M.reply('𝐄𝐫𝐫𝐨𝐫 𝐮𝐩𝐝𝐚𝐭𝐢𝐧𝐠 𝐬𝐮𝐛𝐣𝐞𝐜𝐭')
                })
        } else if (subject === 'desc' || subject === 'description') {
            await this.client
                .groupUpdateDescription(M.groupMetadata.id, value.toString())
                .then(() => {
                    return void M.reply('𝐆𝐫𝐨𝐮𝐩 𝐝𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧 𝐮𝐩𝐝𝐚𝐭𝐞𝐝')
                })
                .catch((e) => {
                    console.log(e)
                    return void M.reply('𝐄𝐫𝐫𝐨𝐫 𝐰𝐡𝐢𝐥𝐞 𝐮𝐩𝐝𝐚𝐭𝐢𝐧𝐠')
                })
        }
        return
    }
}
