import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'
import TelegramBot from 'node-telegram-bot-api'

function verifyInitData(
	telegramInitData: string,
	botToken: string
): { isVerified: boolean; urlParams: URLSearchParams } {
	const urlParams: URLSearchParams = new URLSearchParams(telegramInitData)

	const hash = urlParams.get('hash')
	urlParams.delete('hash')
	urlParams.sort()

	let dataCheckString = ''
	for (const [key, value] of urlParams.entries()) {
		dataCheckString += `${key}=${value}\n`
	}
	dataCheckString = dataCheckString.slice(0, -1)

	const secret = crypto.createHmac('sha256', 'WebAppData').update(botToken)
	const calculatedHash = crypto
		.createHmac('sha256', secret.digest())
		.update(dataCheckString)
		.digest('hex')

	const isVerified = calculatedHash === hash

	return { isVerified, urlParams }
}

@Injectable()
export class ValidateTelegramDataMiddleware implements NestMiddleware {
	use(req: Request & { user: any }, res: Response, next: NextFunction) {
		const telegramInitData = (req.headers.initdata ??
			req.query.initData ??
			req.query.initdata) as string
		const botToken = process.env.TELEGRAM_BOT_TOKEN

		console.log(1, telegramInitData)
		console.log(2, botToken)
		if (!telegramInitData || !botToken) {
			return res.status(400).json({ message: 'Invalid request' })
		}

		const { urlParams, isVerified } = verifyInitData(telegramInitData, botToken)

		if (!isVerified) {
			return res.status(403).json({ message: 'Unauthorized request' })
		}

		const user: TelegramBot.User =
			typeof urlParams.get('user') === 'string'
				? JSON.parse(urlParams.get('user'))
				: urlParams.get('user')

		req.user = user

		next()
	}
}

// import { Injectable, NestMiddleware } from '@nestjs/common'
// import { Request, Response, NextFunction } from 'express'
// import crypto from 'crypto'
// import TelegramBot from 'node-telegram-bot-api'

// function verifyInitData(
// 	telegramInitData: any,
// 	botToken: string
// ): { isVerified: boolean; urlParams: URLSearchParams } {
// 	const urlParams: URLSearchParams = new URLSearchParams()

// 	for (const key in telegramInitData) {
// 		if (telegramInitData.hasOwnProperty(key)) {
// 			urlParams.append(key, telegramInitData[key])
// 		}
// 	}

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
// 		const telegramInitData = req.body // Чтение данных из тела запроса
// 		const botToken = process.env.TELEGRAM_BOT_TOKEN

// 		console.log(1, telegramInitData)
// 		console.log(2, botToken)
// 		if (!telegramInitData || !botToken) {
// 			return res.status(400).json({ message: 'Invalid request' })
// 		}

// 		const { urlParams, isVerified } = verifyInitData(telegramInitData, botToken)

// 		if (!isVerified) {
// 			return res.status(403).json({ message: 'Unauthorized request' })
// 		}

// 		const user: TelegramBot.User =
// 			typeof urlParams.get('user') === 'string'
// 				? JSON.parse(urlParams.get('user'))
// 				: urlParams.get('user')

// 		req.user = user

// 		next()
// 	}
// }
