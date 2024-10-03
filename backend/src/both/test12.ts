import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import { DbService } from 'src/db/db.service'
import { BotDopService } from './bot.dop.service'

export interface Telegram {
	chatId: string
	token: string
}

@Injectable()
export class BotService implements OnModuleInit {
	bot: TelegramBot
	options: Telegram
	private webAppUrl: string

	constructor(
		private readonly dbService: DbService,
		private readonly botDopService: BotDopService
	) {
		this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
			polling: true,
		})
		this.webAppUrl = process.env.NGROK_URL
	}

	async sendMessage(chatId: number, msg: string, options?: any) {
		try {
			await this.bot.sendMessage(chatId, msg, {
				parse_mode: 'HTML', // что бы HTML теги преобразовались в то для чего они прописаны
				...options,
			})
		} catch (error) {
			throw new BadRequestException(error, 'BotService sendMessage')
		}
	}

	async getPagination(current, maxpage, data) {
		let keys = []
		if (current == 1) keys.push({ text: `⛔️`, callback_data: 'prev' })
		if (current > 1)
			keys.push({ text: `⬅️`, callback_data: (current - 1).toString() })
		keys.push({
			text: `${current}/${maxpage}`,
			callback_data: current.toString(),
		})
		if (current == maxpage) keys.push({ text: `⛔️`, callback_data: 'last' })
		if (current < maxpage)
			keys.push({ text: `➡️`, callback_data: (current + 1).toString() })

		return {
			reply_markup: {
				inline_keyboard: [
					[{ text: `🔗 Оформить займ`, url: data.cards.data[0].link }],
					keys,
				],
			},
		}
	}

	async messageText(data) {
		const info = data.cards.data[0]
		const message =
			`💸ЗАЙМ НА ЛЮБЫЕ НУЖДЫ💸` +
			`\n\nДля Всех стран СНГ!🇷🇺🇺🇦🇰🇿 ` +
			`\n\n📝Без справок!` +
			`\n🙋🏻‍♂️Без поручителей!` +
			`\n💰От ${info.amount} ${info.time}.` +
			`\n📃Только по паспорту! ` +
			`\n🙌🏻 С ЛЮБОЙ кредитной историей!` +
			`\n💳Займ прямо на КАРТУ💳` +
			`\n\n\n👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻`
		return message
	}

	async onModuleInit() {
		this.bot.onText(/\/start/, async (msg) => {
			console.log(23, data.cards.data[0])

			const pagination = await this.getPagination(
				data.cards.from,
				data.cards.last_page,
				data
			)
			const caption = await this.messageText(data)

			const messageEnter = {
				...pagination,
				caption: caption,
			}

			this.bot.sendPhoto(msg.chat.id, data.cards.data[0].logo, messageEnter)
		})

		this.bot.on('polling_error', (err) =>
			console.log('polling_error', err.message)
		)
	}
}

const photoUrl1 = './uploads/userName.jpg'
const data = {
	cards: {
		from: 1,
		last_page: 10,
		data: [
			{
				amount: '5000 RUB',
				time: 'на 12 месяцев',
				link: 'https://example.ru/offer1',
				logo: photoUrl1,
			},
			{
				amount: '10000 UAH',
				time: 'на 24 месяца',
				link: 'https://example.ua/offer2',
				logо: 'https://example.ua/logo2.png',
			},
			{
				amount: '200000 KZT',
				time: 'на 18 месяцев',
				link: 'https://example.kz/offer3',
				logо: 'https://example.kz/logo3.png',
			},
			{
				amount: '15000 RUB',
				time: 'на 36 месяцев',
				link: 'https://example.ru/offer4',
				logо: 'https://example.ru/logo4.png',
			},
			{
				amount: '5000 UAH',
				time: 'на 6 месяцев',
				link: 'https://example.ua/offer5',
				logо: 'https://example.ua/logo5.png',
			},
			{
				amount: '300000 KZT',
				time: 'на 48 месяцев',
				link: 'https://example.kz/offer6',
				logо: 'https://example.kz/logo6.png',
			},
			{
				amount: '25000 RUB',
				time: 'на 60 месяцев',
				link: 'https://example.ru/offer7',
				logо: 'https://example.ru/logo7.png',
			},
			{
				amount: '20000 UAH',
				time: 'на 54 месяца',
				link: 'https://example.ua/offer8',
				logо: 'https://example.ua/logo8.png',
			},
			{
				amount: '500000 KZT',
				time: 'на 72 месяца',
				link: 'https://example.kz/offer9',
				logо: 'https://example.kz/logo9.png',
			},
			{
				amount: '30000 RUB',
				time: 'на 84 месяца',
				link: 'https://example.ru/offer10',
				logо: 'https://example.ru/logo10.png',
			},
		],
	},
}
