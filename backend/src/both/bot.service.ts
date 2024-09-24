import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import {
	extractInfoCallbackQueryCTX,
	getUserDetailsFromTelegramContext,
} from './utils/context-helpers'
import { mainMenuInlineKeyboard, textMainMenu } from './keyboards/inline'
import { getNotificationText } from './utils/data'
import { format } from 'date-fns'
import { DbService } from 'src/db/db.service'
import { BookingService } from 'src/booking/booking.service'
import { BotDopService } from './bot.dop.service'

export interface Telegram {
	chatId: string
	token: string
}

@Injectable()
export class BotService implements OnModuleInit {
	bot: TelegramBot
	options: Telegram
	constructor(
		private readonly dbService: DbService,
		private readonly botDopService: BotDopService
	) {
		this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
			polling: true,
		})
		const BotState = {
			isReplyKeyboardOpen: false,
		}
	}

	async sendMessage(chatId: string, msg: string, options?: any) {
		try {
			await this.bot.sendMessage(chatId, msg, {
				parse_mode: 'HTML', // что бы HTML теги преобразовались в то для чего они прописаны
				...options,
			})
		} catch (error) {
			throw new BadRequestException(error, 'BotService sendMessage')
		}
	}

	async startHandler(msg) {
		const chatId = msg.chat.id
		await this.sendMessage(chatId, 'Welcome! Please choose an option:', {
			reply_markup: {
				inline_keyboard: [
					[{ text: '📋 My bookings', callback_data: 'my_bookings' }],
					[{ text: '📋 My Results', callback_data: 'my_results' }],
				],
			},
		})
	}

	async callbackQueryHandler(callbackQuery) {
		const chatId = callbackQuery.message.chat.id
		const data = callbackQuery.data

		if (data === 'my_bookings') {
			this.sendMessage(chatId, 'my_bookings')
			await this.showBookings(chatId)
		} else if (data.startsWith('show_booking_')) {
			const bookingId = data.split('_')[2]
			await this.bot.deleteMessage(
				callbackQuery.message.chat.id,
				callbackQuery.message.message_id
			)
			// this.sendMessage(chatId, `show_booking_ с ID: ${bookingId}`)
			await this.showBookingDetails(chatId, bookingId)
		}
	}

	async showBookings(chatId: number) {
		const bookings = await this.botDopService.getBookings(chatId)

		const buttons = bookings.map((booking) => {
			const description = booking.doctor
				? `👨‍⚕️ ${format(booking.bookingDateTime, 'dd MMMM')} - ${booking.doctor.fullName}`
				: `🔬 ${format(booking.bookingDateTime, 'dd MMMM')} - ${booking.diagnostic.typeName}`

			return [
				{
					text: description,
					callback_data: `show_booking_${booking.bookingId}`,
				},
			]
		})

		await this.bot.sendMessage(
			chatId,
			'Вот ваш список бронирования. Выберите один, чтобы увидеть подробности:',
			{
				reply_markup: {
					inline_keyboard: buttons,
				},
			}
		)
	}

	async showBookingDetails(chatId: number, bookingId: string) {
		const bookingInfo = await this.botDopService.getBookingDetails(bookingId)
		// console.log(
		// 	23,
		// 	format(bookingInfo.bookingDateTime, 'dd MMM yyyy')
		// )
		// const bookingTime = format(
		// 	new Date(bookingInfo.bookingDateTime),
		// 	'dd MMMM yyyy, kk:mm'
		// )
		// console.log(23, bookingTime)
		// const appointmentTypeText = bookingInfo.doctor
		// 	? `👨‍⚕️ Врач: ${bookingInfo.doctor.fullName}\n`
		// 	: `🔬 Процедура: ${bookingInfo.diagnostic.typeName}\n`
		// const message = `Вот данные вашего бронирования\n\n📋 Запись ID: ${bookingInfo.bookingId}\n${appointmentTypeText}📆 Дата & Время: ${bookingTime}\n\n📍 Локация:  ${bookingInfo.location.name}: ${bookingInfo.location.address}\n\nСпасибо, что выбрали наш сервис! Если у вас есть какие-либо вопросы или вам нужно перенести встречу, свяжитесь с нами. 📞`

		const mes = await getNotificationText(bookingInfo)
		const message = `🍓Вот данные вашего бронирования🍓\n\n` + mes

		await this.bot.sendMessage(chatId, message, {
			reply_markup: {
				inline_keyboard: [[{ text: 'Back', callback_data: 'my_bookings' }]],
			},
		})
	}

	async onModuleInit() {
		const webAppUrl = process.env.NGROK_URL

		this.bot.onText(/\/start/, (msg) => this.startHandler(msg))

		this.bot.on('callback_query', (callbackQuery) =>
			this.callbackQueryHandler(callbackQuery)
		)

		// my_bookings
		// my_results
		this.bot.on('message', async (ctx) => {
			// console.log(11, 'message ctx', ctx)

			const {
				text,
				telegramId,
				chatId,
				userName,
				firstLastName,
				nameButton,
				dataButton,
			} = getUserDetailsFromTelegramContext(ctx)

			const photoUrl1 = './uploads/userName.jpg'

			const textIn = `Добро пожаловать в приложение MedSync!\n\nС помощью нашего веб-приложения вы можете записаться на прием к врачу или пройти обследование в одной из наших клиник.`
			if (text === '/start') {
				if (!ctx.from?.username) {
					const message = '*Имя пользователя отсутствует в профиле телеграмма*'

					await this.sendMessage(chatId, message)
					return
				}
				this.sendMessage(chatId, textMainMenu)
			}

			if (text === '/site') {
				await this.bot.sendMessage(
					chatId,
					textMainMenu,
					mainMenuInlineKeyboard(webAppUrl)
				)
			}
		})

		this.bot.on('polling_error', (err) =>
			console.log('polling_error', err.message)
		)
	}
}

// import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common'
// import * as TelegramBot from 'node-telegram-bot-api'
// import {
// 	extractInfoCallbackQueryCTX,
// 	getUserDetailsFromTelegramContext,
// } from './utils/context-helpers'
// import { mainMenuInlineKeyboard, textMainMenu } from './keyboards/inline'

// export interface Telegram {
// 	chatId: string
// 	token: string
// }

// @Injectable()
// export class BotService implements OnModuleInit {
// 	bot: TelegramBot
// 	options: Telegram
// 	constructor() {
// 		this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
// 			polling: true,
// 		})
// 		const BotState = {
// 			isReplyKeyboardOpen: false,
// 		};
// 	}

// 	async sendMessage(chatId: string, msg: string, options?: any) {
// 		try {
// 			await this.bot.sendMessage(chatId, msg, {
// 				parse_mode: 'HTML', // что бы HTML теги преобразовались в то для чего они прописаны
// 				...options,
// 			})
// 		} catch (error) {
// 			throw new BadRequestException(error, 'BotService sendMessage')
// 		}
// 	}

// 	async onModuleInit() {
// 		const webAppUrl = process.env.NGROK_URL

// 		this.bot.on('callback_query', async (ctx) => {
// 			// console.log(10, 'callback_query ctx', ctx)

// 			const { data, telegramId, chatId, executorId } =
// 				extractInfoCallbackQueryCTX(ctx)

// 			if (data === 'my_bookings') {
// 				this.bot.sendMessage(chatId, 'bookings')
// 			}
// 			if (data === 'my_results') {
// 				this.bot.sendMessage(chatId, 'tested')
// 			}
// 		})

// 		// my_bookings
// 		// my_results
// 		this.bot.on('message', async (ctx) => {
// 			// console.log(11, 'message ctx', ctx)

// 			const {
// 				text,
// 				telegramId,
// 				chatId,
// 				userName,
// 				firstLastName,
// 				nameButton,
// 				dataButton,
// 			} = getUserDetailsFromTelegramContext(ctx)

// 			const photoUrl1 = './uploads/userName.jpg'

// 			const textIn = `Добро пожаловать в приложение MedSync!\n\nС помощью нашего веб-приложения вы можете записаться на прием к врачу или пройти обследование в одной из наших клиник.`
// 			if (text === '/start') {
// 				if (!ctx.from?.username) {
// 					const message = '*Имя пользователя отсутствует в профиле телеграмма*'

// 					this.bot
// 						.sendPhoto(chatId, photoUrl1, {
// 							caption: `${message}`,
// 							parse_mode: 'MarkdownV2',
// 						})
// 						.then(() => {
// 							return this.bot.sendMessage(chatId, message, {
// 								parse_mode: 'MarkdownV2',
// 							})
// 						})
// 						.catch((error) => {
// 							console.error('Ошибка при отправке фото или сообщения:', error)
// 						})

// 					return
// 				}
// 				this.bot.sendMessage(chatId, textMainMenu)
// 			}

// 			if (text === '/site') {
// 				await this.bot.sendMessage(
// 					chatId,
// 					textMainMenu,
// 					mainMenuInlineKeyboard(webAppUrl)
// 				)

// 				// await this.bot.sendMessage(
// 				// 	chatId,
// 				// 	'Ниже появится кнопка, заполни форму',
// 				// 	{
// 				// 		reply_markup: {
// 				// 			keyboard: [
// 				// 				[
// 				// 					{
// 				// 						text: 'Создать заявку',
// 				// 						web_app: { url: webAppUrl + '/admin/add_order' },
// 				// 					},
// 				// 				],
// 				// 				[
// 				// 					{
// 				// 						text: 'Заказы',
// 				// 						web_app: { url: webAppUrl + '/admin/orders' },
// 				// 					},
// 				// 					{
// 				// 						text: 'Товары',
// 				// 						web_app: { url: webAppUrl + '/admin/test_2' },
// 				// 					},
// 				// 				],
// 				// 			],
// 				// 			resize_keyboard: true,
// 				// 		},
// 				// 	}
// 				// )
// 			}
// 		})

// 		this.bot.on('polling_error', (err) =>
// 			console.log('polling_error', err.message)
// 		)
// 	}
// }
