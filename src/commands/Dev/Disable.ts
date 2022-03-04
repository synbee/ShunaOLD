import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'disable',
            description: 'Disables the given command from being used globally',
            category: 'dev',
            dm: true,
            usage: `${client.config.prefix}config [command] | (reason)`,
            modsOnly: true,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        const split = joined.split('|')
        const key = split[0].toLowerCase().trim()
        if (!key) return void (await M.reply(`𝑃𝑟𝑜𝑣𝑖𝑑𝑒 𝑡ℎ𝑒 𝑐𝑜𝑚𝑚𝑎𝑛𝑑 𝑦𝑜𝑢 𝑤𝑎𝑛𝑡 𝑡𝑜 𝑑𝑖𝑠𝑎𝑏𝑙𝑒`))
        const command = this.handler.commands.get(key) || this.handler.aliases.get(key)
        if (!command) return void (await M.reply(`𝑁𝑜 𝑐𝑜𝑚𝑚𝑎𝑛𝑑 𝑓𝑜𝑢𝑛𝑑`))
        if (await this.client.DB.disabledcommands.findOne({ command: command.config.command }))
            return void M.reply(`${command.config.command} 𝑖𝑠 𝑎𝑙𝑟𝑒𝑎𝑑𝑦 𝑑𝑖𝑠𝑎𝑏𝑙𝑒𝑑`)
        await new this.client.DB.disabledcommands({
            command: command.config.command,
            reason: (split[1] || '').trim() || ''
        }).save()
        await M.reply(
            `*${this.client.util.capitalize(command.config.command)}* 𝑖𝑠 𝑛𝑜𝑤 𝐷𝑖𝑠𝑎𝑏𝑙𝑒𝑑${
                split[1] ? ` for ${split[1]}` : ''
            }`
        )
    }
}
