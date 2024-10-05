import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import { DbService } from 'src/db/db.service'
import { BotDopService } from './bot.dop.service'
const fs = require('fs')
const path = require('path')

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

	async getPagination(current, maxPage, data) {
		console.log(32, 'current', current)
		console.log(33, 'maxPage', maxPage)
		let keys = []
		if (current == 1) {
			keys.push({ text: `⛔️`, callback_data: 'prev' })
		}

		if (current > 1) {
			keys.push({ text: `⬅️`, callback_data: (current - 1).toString() })
		}

		keys.push({
			text: `${current}/${maxPage}`,
			callback_data: current.toString(),
		})

		if (current == maxPage) {
			keys.push({ text: `⛔️`, callback_data: 'last' })
		}
		if (current < maxPage) {
			keys.push({ text: `➡️`, callback_data: (current + 1).toString() })
		}

		console.log(34, 'keys', keys)
		// keys [
		// 	{ text: '⛔️', callback_data: 'prev' },
		// 	{ text: '1/5', callback_data: '1' },
		// 	{ text: '➡️', callback_data: '2' }
		// ]

		// return {
		// 	reply_markup: JSON.stringify({
		// 		inline_keyboard: [
		// 			[{ text: `🔗 Оформить займ`, url: data.cards.data[0].link }],
		// 			keys,
		// 		],
		// 	}),
		// }

		return {
			reply_markup: {
				inline_keyboard: [
					[{ text: `🔗 Оформить путевку`, url: data.cards[0].link }],
					keys,
				],
			},
		}
	}

	async messageText(data) {
		const info = data.cards[0]
		const message =
			`💸Отдых и путешествия💸` +
			`\n\nВ любой точке мира! ` +
			`\n\n📝Доступно!` +
			`\n🙋🏻‍♂️Без предоплаты!` +
			`\n💰От ${info.amount} ${info.time}.` +
			`\n📃Можно в кредит! ` +
			`\n🙌🏻 С ЛЮБОЙ кредитной историей!` +
			`\n💳Расчет по карте💳` +
			`\n\n\n👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻`
		return message
	}

	async onModuleInit() {
		this.bot.onText(/\/start/, async (msg) => {
			try {
				const cards = await this.dbService.card.findMany({
					skip: 0,
					take: 1,
				})
				// console.log(1, 'cards', cards) //  [ { hgjgjgkj } ]
				const data = {
					cards,
					from: 1,
					last_page: Math.ceil((await this.dbService.card.count()) / 1), // Получение количества страниц
				}

				// console.log(2, 'data.last_page', data.last_page) // 5

				const messageEnter = Object.assign(
					{},
					await this.getPagination(data.from, data.last_page, data),
					{ caption: await this.messageText(data) }
				)

				// console.log(3, messageEnter)
				// const photoPath = data.cards[0].logo

				// console.log(999, messageEnter)
				// this.bot.sendPhoto(msg.chat.id, 'Товары много товаров', messageEnter)
				this.bot.sendPhoto(msg.chat.id, data.cards[0].logo, messageEnter)
			} catch (error) {
				console.log('error', error)
			}
		})

		this.bot.on('callback_query', async (callbackQuery) => {
			const msg = callbackQuery.message

			// console.log(23, 'callbackQuery.data ---', callbackQuery.data)
			// console.log(24, 'callbackQuery.id ----', callbackQuery.id)

			if (callbackQuery.data == 'prev') {
				this.bot.answerCallbackQuery(callbackQuery.id, {
					text: 'Вы уже на первой странице!',
					show_alert: true,
				})
				return
			} else if (callbackQuery.data == 'last') {
				this.bot.answerCallbackQuery(callbackQuery.id, {
					text: 'Вы уже на последней странице!',
					show_alert: true,
				})
				return
			}

			try {
				const page = parseInt(callbackQuery.data)
				console.log(35, 'data', page)
				const cards = await this.dbService.card.findMany({
					skip: page - 1,
					take: 1,
					// skip: (page - 1) * 5,
					// take: 5,
				})

				console.log(36, 'cards', cards)
				const data = {
					cards,
					from: page,
					last_page: Math.ceil(await this.dbService.card.count()), // Получение количества страниц
				}
				console.log(37, 'data', data)
				const editOptions = Object.assign(
					{},
					await this.getPagination(page, data.last_page, data),
					{
						chat_id: msg.chat.id,
						message_id: msg.message_id,
					}
				)
				// console.log(38, 'editOptions', editOptions)
				this.bot.editMessageMedia(
					{
						type: 'photo',
						media: data.cards[0].logo.toString(),
						caption: await this.messageText(data),
					},
					editOptions
				)
			} catch (error) {
				console.log('callback_query', error)
			}
		})

		this.bot.on('polling_error', (err) =>
			console.log('polling_error', err.message)
		)
	}
}

// import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common'
// import * as TelegramBot from 'node-telegram-bot-api'
// import { DbService } from 'src/db/db.service'
// import { BotDopService } from './bot.dop.service'

// export interface Telegram {
// 	chatId: string
// 	token: string
// }

// @Injectable()
// export class BotService implements OnModuleInit {
// 	bot: TelegramBot
// 	options: Telegram
// 	private webAppUrl: string

// 	constructor(
// 		private readonly dbService: DbService,
// 		private readonly botDopService: BotDopService
// 	) {
// 		this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
// 			polling: true,
// 		})
// 		this.webAppUrl = process.env.NGROK_URL
// 	}
// 	async sendMessage(chatId: number, msg: string, options?: any) {
// 		try {
// 			await this.bot.sendMessage(chatId, msg, {
// 				parse_mode: 'HTML', // что бы HTML теги преобразовались в то для чего они прописаны
// 				...options,
// 			})
// 		} catch (error) {
// 			throw new BadRequestException(error, 'BotService sendMessage')
// 		}
// 	}

// 	async getPagination(current, maxPage, data) {
// 		let keys = []
// 		if (current == 1) keys.push({ text: `⛔️`, callback_data: 'prev' })
// 		if (current > 1)
// 			keys.push({ text: `⬅️`, callback_data: (current - 1).toString() })
// 		keys.push({
// 			text: `${current}/${maxPage}`,
// 			callback_data: current.toString(),
// 		})
// 		if (current == maxPage) keys.push({ text: `⛔️`, callback_data: 'last' })
// 		if (current < maxPage)
// 			keys.push({ text: `➡️`, callback_data: (current + 1).toString() })

// 		// console.log(303, 'keys', keys)
// 		// return {
// 		// 	reply_markup: JSON.stringify({
// 		// 		inline_keyboard: [
// 		// 			[{ text: `🔗 Оформить займ`, url: data.cards.data[0].link }],
// 		// 			keys,
// 		// 		],
// 		// 	}),
// 		// }

// 		return {
// 			reply_markup: {
// 				inline_keyboard: [
// 					[{ text: `🔗 Оформить займ`, url: data.cards.data[0].link }],
// 					keys,
// 				],
// 			},
// 		}
// 	}

// 	async messageText(data) {
// 		const info = data.cards.data[0]
// 		const message =
// 			`💸ЗАЙМ НА ЛЮБЫЕ НУЖДЫ💸` +
// 			`\n\nДля Всех стран СНГ!🇷🇺🇺🇦🇰🇿 ` +
// 			`\n\n📝Без справок!` +
// 			`\n🙋🏻‍♂️Без поручителей!` +
// 			`\n💰От ${info.amount} ${info.time}.` +
// 			`\n📃Только по паспорту! ` +
// 			`\n🙌🏻 С ЛЮБОЙ кредитной историей!` +
// 			`\n💳Займ прямо на КАРТУ💳` +
// 			`\n\n\n👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻`
// 		return message
// 	}

// 	async onModuleInit() {
// 		this.bot.onText(/\/start/, async (msg) => {
// 			// const bookings = await this.botDopService.findPagination(msg.chat.id)
// 			// console.log(203, bookings)
// 			const pagination = await this.getPagination(
// 				data.cards.from,
// 				data.cards.last_page,
// 				data
// 			)
// 			const caption = await this.messageText(data)

// 			const messageEnter = {
// 				...pagination,
// 				caption: caption,
// 			}
// 			this.bot.sendPhoto(msg.chat.id, data.cards.data[0].logo, messageEnter)
// 		})

// 		this.bot.on('callback_query', async (callbackQuery) => {
// 			const chatId = callbackQuery.message.chat.id
// 			const data = callbackQuery.data
// 			console.log(34, 'chatId', chatId)
// 			console.log(34, 'data', data)
// 		})

// 		this.bot.on('polling_error', (err) =>
// 			console.log('polling_error', err.message)
// 		)
// 	}
// }

const photoUrl1 = '../frontend/public/images/get-tested/5-pet.png'
// const photoUrl1 = '../frontend/public/images/doctors-listing/profiles/1.png'
// const photoUrl1 = '../assets/banner.png'
// const photoUrl1 = './uploads/userName.jpg'
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
				logo: 'https://example.ua/logo2.png',
			},
			{
				amount: '200000 KZT',
				time: 'на 18 месяцев',
				link: 'https://example.kz/offer3',
				logo: photoUrl1,
			},
			{
				amount: '15000 RUB',
				time: 'на 36 месяцев',
				link: 'https://example.ru/offer4',
				logo: 'https://example.ru/logo4.png',
			},
			{
				amount: '5000 UAH',
				time: 'на 6 месяцев',
				link: 'https://example.ua/offer5',
				logo: 'https://example.ua/logo5.png',
			},
			{
				amount: '300000 KZT',
				time: 'на 48 месяцев',
				link: 'https://example.kz/offer6',
				logo: 'https://example.kz/logo6.png',
			},
			{
				amount: '25000 RUB',
				time: 'на 60 месяцев',
				link: 'https://example.ru/offer7',
				logo: 'https://example.ru/logo7.png',
			},
			{
				amount: '20000 UAH',
				time: 'на 54 месяца',
				link: 'https://example.ua/offer8',
				logo: 'https://example.ua/logo8.png',
			},
			{
				amount: '500000 KZT',
				time: 'на 72 месяца',
				link: 'https://example.kz/offer9',
				logo: 'https://example.kz/logo9.png',
			},
			{
				amount: '30000 RUB',
				time: 'на 84 месяца',
				link: 'https://example.ru/offer10',
				logo: 'https://example.ru/logo10.png',
			},
		],
	},
}
