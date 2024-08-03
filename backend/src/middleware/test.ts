// import { Injectable, NestMiddleware } from '@nestjs/common'
// import { Request, Response, NextFunction } from 'express'
// import crypto from 'crypto'
// import TelegramBot from 'node-telegram-bot-api'

// function verifyInitData(
// 	telegramInitData: string,
// 	botToken: string
// ): { isVerified: boolean; urlParams: URLSearchParams } {
// 	const urlParams: URLSearchParams = new URLSearchParams(telegramInitData)

// 	const hash = urlParams.get('hash')
// 	urlParams.delete('hash')
// 	urlParams.sort()

// 	let dataCheckString = ''
// 	for (const [key, value] of urlParams.entries()) {
// 		dataCheckString += `${key}=${value}\n`
// 	}
// 	dataCheckString = dataCheckString.slice(0, -1)

// 	const secret = crypto.createHmac('sha256', 'WebAppData').update(botToken)
// 	const calculatedHash = crypto
// 		.createHmac('sha256', secret.digest())
// 		.update(dataCheckString)
// 		.digest('hex')

// 	const isVerified = calculatedHash === hash

// 	return { isVerified, urlParams }
// }

// @Injectable()
// export class ValidateTelegramDataMiddleware implements NestMiddleware {
// 	use(req: Request & { user: any }, res: Response, next: NextFunction) {
// 		const telegramInitData = (req.headers.initdata ??
// 			req.query.initData ??
// 			req.query.initdata) as string
// 		const botToken = process.env.TELEGRAM_TOKEN

// 		if (!telegramInitData || !botToken) {
// 			return res.status(400).send('Invalid request')
// 		}

// 		const { urlParams, isVerified } = verifyInitData(telegramInitData, botToken)

// 		if (!isVerified) {
// 			return res.status(403).send('Unauthorized request')
// 		}

// 		const user: TelegramBot.User =
// 			typeof urlParams.get('user') === 'string'
// 				? JSON.parse(urlParams.get('user'))
// 				: urlParams.get('user')

// 		req.user = user

// 		next()
// 	}
// }

// https://gist.github.com/konstantin24121/49da5d8023532d66cc4db1136435a885
import crypto from 'crypto'
const TELEGRAM_BOT_TOKEN = '110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw' // https://core.telegram.org/bots#creating-a-new-bot

export const verifyTelegramWebAppData = async (
	telegramInitData: string
): Promise<boolean> => {
	// The data is a query string, which is composed of a series of field-value pairs.
	const encoded = decodeURIComponent(telegramInitData)

	// HMAC-SHA-256 signature of the bot's token with the constant string WebAppData used as a key.
	const secret = crypto
		.createHmac('sha256', 'WebAppData')
		.update(TELEGRAM_BOT_TOKEN)

	// Data-check-string is a chain of all received fields'.
	const arr = encoded.split('&')
	const hashIndex = arr.findIndex((str) => str.startsWith('hash='))
	const hash = arr.splice(hashIndex)[0].split('=')[1]
	// sorted alphabetically
	arr.sort((a, b) => a.localeCompare(b))
	// in the format key=<value> with a line feed character ('\n', 0x0A) used as separator
	// e.g., 'auth_date=<auth_date>\nquery_id=<query_id>\nuser=<user>
	const dataCheckString = arr.join('\n')

	// The hexadecimal representation of the HMAC-SHA-256 signature of the data-check-string with the secret key
	const _hash = crypto
		.createHmac('sha256', secret.digest())
		.update(dataCheckString)
		.digest('hex')

	// if hash are equal the data may be used on your server.
	// Complex data types are represented as JSON-serialized objects.
	return _hash === hash
}

const verifyInitData = (telegramInitData: string): boolean => {
	const urlParams = new URLSearchParams(telegramInitData)

	const hash = urlParams.get('hash')
	urlParams.delete('hash')
	urlParams.sort()

	let dataCheckString = ''
	for (const [key, value] of urlParams.entries()) {
		dataCheckString += `${key}=${value}\n`
	}
	dataCheckString = dataCheckString.slice(0, -1)

	const secret = crypto
		.createHmac('sha256', 'WebAppData')
		.update(process.env.API_TOKEN ?? '')
	const calculatedHash = crypto
		.createHmac('sha256', secret.digest())
		.update(dataCheckString)
		.digest('hex')

	return calculatedHash === hash
}
