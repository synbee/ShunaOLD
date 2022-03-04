import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'enable',
            description: 'Enables the given command globally',
            category: 'dev',
            dm: true,
            usage: `${client.config.prefix}enable [command]`,
            modsOnly: true,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        const key = joined.toLowerCase().trim()
        if (!key) return void (await M.reply(`𝑃𝑟𝑜𝑣𝑖𝑑𝑒 𝑡ℎ𝑒 𝑐𝑜𝑚𝑚𝑎𝑛𝑑 𝑦𝑜𝑢 𝑤𝑎𝑛𝑡 𝑡𝑜 𝑒𝑛𝑎𝑏𝑙𝑒`))
        const command = this.handler.commands.get(key) || this.handler.aliases.get(key)
        if (!command) return void (await M.reply(`𝑁𝑜 𝑐𝑜𝑚𝑚𝑎𝑛𝑑 𝑓𝑜𝑢𝑛𝑑!`))
        if (!(await this.client.DB.disabledcommands.findOne({ command: command.config.command })))
            return void M.reply(`${this.client.util.capitalize(command.config.command)} 𝑖𝑠 𝑎𝑙𝑟𝑒𝑎𝑑𝑦 𝑒𝑛𝑎𝑏𝑙𝑒𝑑`)
        await this.client.DB.disabledcommands.deleteOne({ command: command.config.command })
        await M.reply(`*${this.client.util.capitalize(command.config.command)}* 𝑖𝑠 𝑛𝑜𝑤 𝐸𝑛𝑎𝑏𝑙𝑒𝑑`)
    }
}
