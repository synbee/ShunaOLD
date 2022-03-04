import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'admins',
            description: 'Tags all Admins 🎖️',
            category: 'general',
            usage: `${client.config.prefix}admins (Message)`,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        return void (await M.reply(`𝐀𝐃𝐌𝐈𝐍𝐒!\n[𝐓𝐚𝐠𝐬 𝐇𝐢𝐝𝐝𝐞𝐧]`, undefined, undefined, M.groupMetadata?.admins).catch(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (reason: any) => M.reply(`𝑨𝒏 𝒆𝒓𝒓𝒐𝒓 𝒐𝒄𝒄𝒖𝒓𝒓𝒆𝒅, 𝑹𝒆𝒂𝒔𝒐𝒏: ${reason}`)
        ))
    }
}
