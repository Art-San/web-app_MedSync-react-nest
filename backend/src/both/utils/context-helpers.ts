import * as TelegramBot from 'node-telegram-bot-api'

export function extractInfoCallbackQueryCTX(ctx) {
	const data = ctx.data
	const telegramId = String(ctx.from.id)
	const chatId = String(ctx.message.chat.id)
	const executorId = String(ctx.from.id)
	return { data, telegramId, chatId, executorId }
}

// responder ID
export function getUserDetailsFromTelegramContext(ctx) {
	const text = ctx?.text
	const telegramId = String(ctx?.from?.id)
	const chatId = String(ctx?.chat?.id)
	const nameButton = ctx?.web_app_data?.button_text
	const dataButton = ctx?.web_app_data?.data
	const userName = ctx?.from.username ? `@${ctx.from.username}` : null
	const firstLastName = `${ctx?.from?.first_name} ${ctx?.from?.last_name}`

	return {
		text,
		telegramId,
		chatId,
		userName,
		firstLastName,
		nameButton,
		dataButton,
	}
}
