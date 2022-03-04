import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import yts from 'yt-search'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'karaoke',
            description: 'Gives you karaoke song playable on WhatsApp',
            category: 'media',
            aliases: ['sing'],
            usage: `${client.config.prefix}karaoke [term]`,
            baseXp: 20
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined) return void M.reply('𝑃𝑙𝑒𝑎𝑠𝑒 𝑔𝑖𝑣𝑒 𝑚𝑒 𝑎 𝑠𝑒𝑎𝑟𝑐ℎ 𝑡𝑒𝑟𝑚')
        const term = joined.trim()
        const { videos } = await yts(term + ' karaoke song')
        if (!videos || videos.length <= 0) return void M.reply(`𝑇ℎ𝑒𝑟𝑒'𝑠 𝑛𝑜 𝑚𝑎𝑡𝑐ℎ𝑖𝑛𝑔 𝑣𝑖𝑑𝑒𝑜𝑠 𝑓𝑜𝑢𝑛𝑑 𝑓𝑜𝑟 𝑡ℎ𝑒 𝑡𝑒𝑟𝑚 *${term}*`)
        const text = `🌸 𝐅𝐨𝐫 𝐘𝐨𝐮 𝐁𝐲 𝐒𝐡𝐮𝐧𝐚 🌸`

        this.client
            .sendMessage(M.from, text, MessageType.extendedText, {
                quoted: M.WAMessage,
                contextInfo: {
                    externalAdReply: {
                        title: `Search Term: ${term}`,
                        body: `🌺 𝐒𝐇𝐔𝐍𝐀 🌺`,
                        mediaType: 2,
                        thumbnailUrl: videos[0].thumbnail,
                        mediaUrl: videos[0].url
                    }
                }
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((reason: any) => M.reply(`✖  An error occurred, Reason: ${reason}`))
    }
}
