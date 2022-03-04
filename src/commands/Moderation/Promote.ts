import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            adminOnly: true,
            command: 'promote',
            description: 'promotes the mentioned users',
            category: 'moderation',
            usage: `${client.config.prefix}promote [@mention | tag]`,
            baseXp: 10
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
					return void M.reply(
						`𝐻𝑜𝑤 𝑐𝑎𝑛 𝐼 𝑝𝑟𝑜𝑚𝑜𝑡𝑒 𝑠𝑜𝑚𝑒𝑜𝑛𝑒 𝑤𝑖𝑡ℎ𝑜𝑢𝑡 𝑏𝑒𝑖𝑛𝑔 𝑎𝑛 𝑎𝑑𝑚𝑖𝑛?`
					);
				if (M.quoted?.sender) M.mentioned.push(M.quoted.sender);
				if (!M.mentioned.length)
					return void M.reply(
						`𝑇𝑎𝑔 𝑡ℎ𝑒 𝑢𝑠𝑒𝑟𝑠 𝑦𝑜𝑢 𝑤𝑎𝑛𝑡 𝑡𝑜 ${this.config.command}`
					);
        M.mentioned.forEach(async (user) => {
            const usr = this.client.contacts[user]
            const username = usr.notify || usr.vname || usr.name || user.split('@')[0]
            if (M.groupMetadata?.admins?.includes(user)) M.reply(`✖ Skipped *${username}* 𝑎𝑠 𝑡ℎ𝑒𝑦'𝑟𝑒 𝑎𝑙𝑟𝑒𝑎𝑑𝑦 𝑎𝑛 𝑎𝑑𝑚𝑖𝑛`)
            else {
                await this.client.groupMakeAdmin(M.from, [user])
                M.reply(`👑 𝑺𝒖𝒄𝒄𝒆𝒔𝒔𝒇𝒖𝒍𝒍𝒚 𝑷𝒓𝒐𝒎𝒐𝒕𝒆𝒅 *${username}*`)
            }
        })
    }
}
