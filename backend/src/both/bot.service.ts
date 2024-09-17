import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import {
	extractInfoCallbackQueryCTX,
	getUserDetailsFromTelegramContext,
} from './utils/context-helpers'

export interface Telegram {
	chatId: string
	token: string
}

@Injectable()
export class BotService implements OnModuleInit {
	bot: TelegramBot
	options: Telegram
	constructor() {
		// private readonly botCommandsService: BotCommandsService,
		this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
			polling: true,
		})
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

	async onModuleInit() {
		const webAppUrl = process.env.NGROK_URL

		// this.botCommandsService.setBotCommands(this.bot)

		this.bot.on('callback_query', async (ctx) => {
			// console.log(10, 'callback_query ctx', ctx)

			const { data, telegramId, chatId, executorId } =
				extractInfoCallbackQueryCTX(ctx)
		})

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

			const textIn = `Добро пожаловать в приложение MedSync!\n\nС помощью нашего веб-приложения вы можете записаться на прием к врачу или пройти тестирование в одной из наших клиник.`
			if (text === '/start') {
				if (!ctx.from?.username) {
					const message = '*Имя пользователя отсутствует в профиле телеграмма*'

					this.bot
						.sendPhoto(chatId, photoUrl1, {
							caption: `${message}`,
							parse_mode: 'MarkdownV2',
						})
						.then(() => {
							return this.bot.sendMessage(chatId, message, {
								parse_mode: 'MarkdownV2',
							})
						})
						.catch((error) => {
							console.error('Ошибка при отправке фото или сообщения:', error)
						})

					return
				}
				this.bot.sendMessage(chatId, textIn)
			}

			if (text === '/site') {
				await this.bot.sendMessage(chatId, textIn, {
					reply_markup: {
						inline_keyboard: [
							[{ text: 'Main Page', web_app: { url: webAppUrl } }],
							[
								{
									text: '📅 Book an appointment',
									web_app: { url: webAppUrl + '/see_a_doctor' },
								},
								{
									text: '📝 Get tested',
									web_app: { url: webAppUrl + '/get_tested' },
								},
							],
							[
								{ text: '📋 My bookings', callback_data: 'my_bookings' },
								{ text: '📝 Get tested', callback_data: 'my_results' },
							],
						],
					},
				})
				// await this.bot.sendMessage(
				// 	chatId,
				// 	'Ниже появится кнопка, заполни форму',
				// 	{
				// 		reply_markup: {
				// 			keyboard: [
				// 				[
				// 					{
				// 						text: 'Создать заявку',
				// 						web_app: { url: webAppUrl + '/admin/add_order' },
				// 					},
				// 				],
				// 				[
				// 					{
				// 						text: 'Заказы',
				// 						web_app: { url: webAppUrl + '/admin/orders' },
				// 					},
				// 					{
				// 						text: 'Товары',
				// 						web_app: { url: webAppUrl + '/admin/test_2' },
				// 					},
				// 				],
				// 			],
				// 			resize_keyboard: true,
				// 		},
				// 	}
				// )
			}
		})

		this.bot.on('polling_error', (err) =>
			console.log('polling_error', err.message)
		)
	}
}
