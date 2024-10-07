import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import { mainMenuInlineKeyboard1, textMainMenu } from './keyboards/inline'
import { getNotificationText } from './utils/data'
import { format } from 'date-fns'
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

	// State management
	private userStates = {}

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

	async startHandler(chatId) {
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
			await this.bot.deleteMessage(
				callbackQuery.message.chat.id,
				callbackQuery.message.message_id
			)
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

			await this.startHandler(chatId)
		}
	}

	async showBookings(chatId: number) {
		const bookings = await this.botDopService.findPagination(chatId)

		let messageText: string
		let buttons: any[] = []

		if (bookings.length === 0) {
			messageText = 'У вас нет записей'
		} else {
			buttons = bookings.map((booking) => {
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

			messageText =
				'Вот ваш список бронирования. Выберите один, чтобы увидеть подробности:'
		}

		buttons.push([{ text: 'Выход', callback_data: 'exit_show_bookings' }])

		await this.sendMessage(chatId, messageText, {
			reply_markup: {
				inline_keyboard: [...buttons],
			},
		})

		// const buttons = bookings.map((booking) => {
		// 	const description = booking.doctor
		// 		? `👨‍⚕️ ${format(booking.bookingDateTime, 'dd MMMM')} - ${booking.doctor.fullName}`
		// 		: `🔬 ${format(booking.bookingDateTime, 'dd MMMM')} - ${booking.diagnostic.typeName}`
		// 	return [
		// 		{
		// 			text: description,
		// 			callback_data: `show_booking_${booking.bookingId}`,
		// 		},
		// 	]
		// })

		// await this.sendMessage(
		// 	chatId,
		// 	'Вот ваш список бронирования. Выберите один, чтобы увидеть подробности:',
		// 	{
		// 		reply_markup: {
		// 			inline_keyboard: [
		// 				...buttons,
		// 				[{ text: 'Exit', callback_data: 'exit_show_bookings' }],
		// 			],
		// 		},
		// 	}
		// )
	}

	async showBookingDetails(chatId: number, bookingId: string) {
		const bookingInfo = await this.botDopService.getBookingDetails(bookingId)
		const mes = getNotificationText(bookingInfo)
		const message = `🍓Вот данные вашего бронирования🍓\n\n` + mes

		await this.sendMessage(chatId, message, {
			reply_markup: {
				inline_keyboard: [[{ text: 'Назад', callback_data: 'my_bookings' }]],
			},
		})
	}

	async onModuleInit() {
		this.botDopService.setBotCommands(this.bot)
		this.bot.onText(/\/start/, (msg) => this.startHandler(msg.chat.id))

		this.bot.on('callback_query', (callbackQuery) =>
			this.callbackQueryHandler(callbackQuery)
		)

		this.bot.on('polling_error', (err) =>
			console.log('polling_error', err.message)
		)
	}
}
