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

// <div class="bubble-content-wrapper"><div class="bubble-content"><div class="message spoilers-container" dir="auto"><span class="translatable-message">Here is your booking list. Select one to see details</span><span class="time"><span class="i18n" dir="auto">21:14</span><div class="time-inner" title="30 September 2024, 21:14:23"><span class="i18n" dir="auto">21:14</span></div></span><span class="clearfix"></span></div><svg viewBox="0 0 11 20" width="11" height="20" class="bubble-tail"><use href="#message-tail-filled"></use></svg></div><div class="reply-markup"><div class="reply-markup-row"><button class="reply-markup-button rp"><div class="c-ripple"></div><span class="reply-markup-button-text"><img src="assets/img/emoji/1f468-200d-2695.png" class="emoji emoji-image" alt="👨‍⚕️">29 September - Samuel Rhodes</span></button></div><div class="reply-markup-row"><button class="reply-markup-button rp"><div class="c-ripple"></div><span class="reply-markup-button-text"><img src="assets/img/emoji/1f468-200d-2695.png" class="emoji emoji-image" alt="👨‍⚕️">11 September - Samuel Rhodes</span></button></div><div class="reply-markup-row"><button class="reply-markup-button rp"><div class="c-ripple"></div><span class="reply-markup-button-text"><img src="assets/img/emoji/1f468-200d-2695.png" class="emoji emoji-image" alt="👨‍⚕️">06 September - Samuel Rhodes</span></button></div><div class="reply-markup-row"><button class="reply-markup-button rp"><div class="c-ripple"></div><span class="reply-markup-button-text"><img src="assets/img/emoji/1f468-200d-2695.png" class="emoji emoji-image" alt="👨‍⚕️">06 September - Samuel Rhodes</span></button></div><div class="reply-markup-row"><button class="reply-markup-button rp"><div class="c-ripple"></div><span class="reply-markup-button-text"><img src="assets/img/emoji/1f468-200d-2695.png" class="emoji emoji-image" alt="👨‍⚕️">30 August - Samuel Rhodes</span></button></div><div class="reply-markup-row"><button class="reply-markup-button rp"><div class="c-ripple"></div><span class="reply-markup-button-text"><img src="assets/img/emoji/1f52c.png" class="emoji emoji-image" alt="🔬">29 August - Blood Tests</span></button></div><div class="reply-markup-row"><button class="reply-markup-button rp"><div class="c-ripple"></div><span class="reply-markup-button-text"><img src="assets/img/emoji/1f52c.png" class="emoji emoji-image" alt="🔬">27 August - Computed Tomography</span></button></div><div class="reply-markup-row"><button class="reply-markup-button rp"><div class="c-ripple"></div><span class="reply-markup-button-text"><img src="assets/img/emoji/1f468-200d-2695.png" class="emoji emoji-image" alt="👨‍⚕️">25 August - Samuel Rhodes</span></button></div><div class="reply-markup-row"><button class="reply-markup-button rp"><div class="c-ripple"></div><span class="reply-markup-button-text"><img src="assets/img/emoji/1f468-200d-2695.png" class="emoji emoji-image" alt="👨‍⚕️">13 August - Samuel Rhodes</span></button></div><div class="reply-markup-row"><button class="reply-markup-button rp"><div class="c-ripple"></div><span class="reply-markup-button-text"><img src="assets/img/emoji/1f468-200d-2695.png" class="emoji emoji-image" alt="👨‍⚕️">31 July - Samuel Rhodes</span></button></div><div class="reply-markup-row"><button class="reply-markup-button rp"><div class="c-ripple"></div><span class="reply-markup-button-text">1</span></button><button class="reply-markup-button rp"><div class="c-ripple"></div><span class="reply-markup-button-text">&lt;</span></button><button class="reply-markup-button rp"><div class="c-ripple"></div><span class="reply-markup-button-text">1</span></button><button class="reply-markup-button rp"><div class="c-ripple"></div><span class="reply-markup-button-text">&gt;</span></button><button class="reply-markup-button rp"><div class="c-ripple"></div><span class="reply-markup-button-text">2</span></button></div><div class="reply-markup-row"><button class="is-first is-last reply-markup-button rp"><div class="c-ripple"></div><span class="reply-markup-button-text">Exit</span></button></div></div></div>
