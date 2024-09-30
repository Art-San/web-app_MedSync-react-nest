import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import {
	extractInfoCallbackQueryCTX,
	getUserDetailsFromTelegramContext,
} from './utils/context-helpers'
import { mainMenuInlineKeyboard1, textMainMenu } from './keyboards/inline'
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
	private webAppUrl: string
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
		this.webAppUrl = process.env.NGROK_URL
	}

	async sendMessage(chatId: number, msg: string, options?: any) {
		console.log(34, 'async sendMessage chatId', typeof chatId)
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
		await this.sendMessage(
			chatId,
			textMainMenu,
			mainMenuInlineKeyboard1(this.webAppUrl)
		)
	}

	async callbackQueryHandler(callbackQuery) {
		const chatId = callbackQuery.message.chat.id
		const data = callbackQuery.data

		if (data === 'my_bookings') {
			await this.showBookings(chatId)
		} else if (data.startsWith('show_booking_')) {
			const bookingId = data.split('_')[2]
			await this.bot.deleteMessage(
				callbackQuery.message.chat.id,
				callbackQuery.message.message_id
			)

			await this.showBookingDetails(chatId, bookingId)
		} else if (data === 'exit_show_bookings') {
			await this.bot.deleteMessage(
				callbackQuery.message.chat.id,
				callbackQuery.message.message_id
			)
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
					inline_keyboard: [
						...buttons,
						[{ text: 'Exit', callback_data: 'exit_show_bookings' }],
					],
				},
			}
		)
	}

	async showBookingDetails(chatId: number, bookingId: string) {
		const bookingInfo = await this.botDopService.getBookingDetails(bookingId)

		const mes = getNotificationText(bookingInfo)
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
		this.bot.on('message', async (ctx) => {
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

			// if (text === '/start') {
			// 	if (!ctx.from?.username) {
			// 		const message = '*Имя пользователя отсутствует в профиле телеграмма*'

			// 		await this.sendMessage(chatId, message)
			// 		return
			// 	}
			// 	this.sendMessage(chatId, textMainMenu)
			// }

			if (text === '/site') {
				await this.sendMessage(
					chatId,
					textMainMenu
					// mainMenuInlineKeyboard(webAppUrl)
				)
			}
		})

		this.bot.on('polling_error', (err) =>
			console.log('polling_error', err.message)
		)
	}
}
