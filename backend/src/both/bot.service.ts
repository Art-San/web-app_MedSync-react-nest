import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import {
	extractInfoCallbackQueryCTX,
	getUserDetailsFromTelegramContext,
} from './utils/context-helpers'
import { mainMenuInlineKeyboard, textMainMenu } from './keyboards/inline'
import {
	ReplyKeyboard,
	InlineKeyboard,
	InlineKeyboardButton,
	KeyboardButton,
	Row,
	ForceReply,
} from 'node-telegram-keyboard-wrapper'

export interface Telegram {
	chatId: string
	token: string
}
export interface BotState {
	isReplyKeyboardOpen: boolean
}

@Injectable()
export class BotService implements OnModuleInit {
	bot: TelegramBot
	options: Telegram
	botState: BotState

	constructor() {
		this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
			polling: true,
		})
		this.botState = {
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

	async hasBotCommands(entities: TelegramBot.MessageEntity[]) {
		// console.log(23, !entities)
		// console.log(23, !(entities instanceof Array))
		if (!entities || !(entities instanceof Array)) {
			return false
		}

		return entities.some((e) => e.type === 'bot_command')
	}

	async onModuleInit() {
		const replyKeyboard = new ReplyKeyboard()
		const inlineKeyboard = new InlineKeyboard()

		const firstReplyKeyboardRowToShowConstructor = new Row<KeyboardButton>(
			new KeyboardButton('1:1 Button'),
			new KeyboardButton('1:2 Button')
		)

		const secondReplyKeyboardRowToShowRowAsArray = new Row<KeyboardButton>()

		secondReplyKeyboardRowToShowRowAsArray.push(
			new KeyboardButton('2:1 Button'),
			new KeyboardButton('2:2 Button')
		)

		replyKeyboard.push(
			firstReplyKeyboardRowToShowConstructor,
			secondReplyKeyboardRowToShowRowAsArray
		)

		inlineKeyboard.push(
			/**
			 * Принудительный универсальный тип здесь из-за универсального InlineKeyboardButton
			 * См. файл Роу для лучшего объяснения машинописного текста.
			 */

			new Row<InlineKeyboardButton>(
				new InlineKeyboardButton('1:2 Button', 'url', 'https://www.google.com'),
				new InlineKeyboardButton('1:1 Button', 'callback_data', 'Works 1!'),
				new InlineKeyboardButton('1:2 Button', 'callback_data', 'Works 2!')
			),
			new Row<InlineKeyboardButton>(
				new InlineKeyboardButton('2:1 Button', 'callback_data', 'Works 3!'),
				new InlineKeyboardButton('2:2 Button', 'callback_data', 'Works 4!')
			)
		)

		this.bot.onText(/\.кузднЛунищфкв/i, async (msg) => {
			const messageOptions: TelegramBot.SendMessageOptions = {
				reply_markup: replyKeyboard.getMarkup(),
			}
			console.log(23, 'messageOptions', messageOptions)
			await this.bot.sendMessage(
				msg.from.id,
				'Это сообщение с клавиатурой ответа. Нажмите на одну из кнопок, чтобы закрыть ее.',
				messageOptions
			)
			this.botState.isReplyKeyboardOpen = true
		})

		this.bot.onText(/\/forceReply/i, (msg) => {
			const options: TelegramBot.SendMessageOptions = {
				reply_markup: ForceReply.getMarkup(),
			}

			this.bot.sendMessage(
				msg.from.id,
				'Эй, это вынужденный ответ. Ответь мне. Да ладно. Попробуй.',
				options
			)
		})

		this.bot.onText(/\/inlineKeyboard/i, (msg) => {
			const options: TelegramBot.SendMessageOptions = {
				reply_markup: inlineKeyboard.getMarkup(),
			}

			console.log(23, 'options', options)

			this.bot.sendMessage(
				msg.from.id,
				'Это сообщение с встроенной клавиатурой.',
				options
			)
		})

		this.bot.on('message', async (msg) => {
			if (!this.hasBotCommands(msg.entities)) {
				if (this.botState.isReplyKeyboardOpen) {
					const options: TelegramBot.SendMessageOptions = {
						reply_markup: replyKeyboard.remove(),
					}

					await this.bot.sendMessage(
						msg.from.id,
						'Сообщение получено. Закрываю ответ Клавиатура.',
						options
					)
					this.botState.isReplyKeyboardOpen = false
				} else if (!!msg.reply_to_message) {
					await this.bot.sendMessage(
						msg.from.id,
						'КАК ТЫ ПОСМЕЛ! Но силовой ответ сработал.'
					)
				}
			}
		})

		this.bot.on('callback_query', async (query) => {
			await this.bot.answerCallbackQuery(query.id, {
				text: 'Действие получено!',
			})
			await this.bot.sendMessage(
				query.from.id,
				'Привет! Вы нажали на встроенную кнопку! ;) Итак, как вы видели, библиотека поддержки работает!'
			)
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
