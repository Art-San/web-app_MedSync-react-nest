import * as crypto from 'crypto'
import { parse } from 'querystring'

export function parseInitData(initData: string): Record<string, any> {
	return parse(initData)
}

export function validateTelegramData(initData: string): boolean {
	const parsedData = parseInitData(initData)

	const receivedHash = parsedData.hash
	delete parsedData.hash

	console.log(11, 'TELEGRAM_BOT_TOKEN', process.env.TELEGRAM_BOT_TOKEN)
	const secretKey = crypto
		.createHmac('sha256', process.env.TELEGRAM_BOT_TOKEN)
		.update('WebAppData')
		.digest()

	const dataCheckString = Object.keys(parsedData)
		.sort()
		.map((key) => `${key}=${parsedData[key]}`)
		.join('\n')

	const computedHash = crypto
		.createHmac('sha256', secretKey)
		.update(dataCheckString)
		.digest('hex')

	console.log(22, 'computedHash', computedHash)
	console.log(22, 'receivedHash', receivedHash)
	return computedHash === receivedHash
}
