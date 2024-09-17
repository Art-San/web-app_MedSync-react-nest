import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import {
	extractInfoCallbackQueryCTX,
	getUserDetailsFromTelegramContext,
} from './utils/context-helpers'
import { mainMenuInlineKeyboard, textMainMenu } from './keyboards/inline'

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

			if (data === 'my_bookings') {
				this.bot.sendMessage(chatId, 'bookings')
			}
			if (data === 'my_results') {
				this.bot.sendMessage(chatId, 'tested')
			}
		})

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
				this.bot.sendMessage(chatId, textMainMenu)
			}

			if (text === '/site') {
				await this.bot.sendMessage(
					chatId,
					textMainMenu,
					mainMenuInlineKeyboard(webAppUrl)
				)

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
