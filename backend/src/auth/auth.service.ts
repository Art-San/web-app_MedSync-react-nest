// import { Injectable } from '@nestjs/common'
// import { CreateAuthDto } from './dto/create-auth.dto'
// import { UpdateAuthDto } from './dto/update-auth.dto'
// import * as crypto from 'crypto'
// import { AuthDto } from './dto/auth.dto'

// @Injectable()
// export class AuthService {
// 	private telegramToken = process.env.TELEGRAM_BOT_TOKEN

// 	async authenticate(data: AuthDto) {
// 		// Проверьте данные с помощью хеша
// 		const { queryId, telegramId, username, authDate } = data
// 		const initData = `user={"id":${telegramId},"username":"${username}"}&query_id=${queryId}`
// 		const secret = crypto
// 			.createHash('sha256')
// 			.update(this.telegramToken)
// 			.digest()
// 		const hash = crypto
// 			.createHmac('sha256', secret)
// 			.update(initData)
// 			.digest('hex')

// 		console.log(13, 'secret', secret)
// 		console.log(13, 'hash', hash)
// 		// В реальном сценарии сравниваем хеш с хешем из initData
// 		// Здесь мы просто проверяем корректность данных
// 		// if (hash !== data.hash) {
// 		// 	throw new Error('Invalid data')
// 		// }

// 		// Здесь выполним логику аутентификации пользователя
// 		// Например, находим или создаем пользователя в вашей базе данных
// 		const user = await this.findOrCreateUser({ telegramId, username })

// 		return { authenticated: true, hash: 'valid', user }
// 	}

// 	private async findOrCreateUser({ telegramId, username }) {
// 		// Заменяем фактической логикой поиска/создания пользователя
// 		return { id: telegramId, username: 'vf' }
// 	}

// }

// import { Injectable } from '@nestjs/common'
// import * as crypto from 'crypto'

// @Injectable()
// export class AuthService {
// 	private telegramToken = process.env.TELEGRAM_BOT_TOKEN

// 	async authenticate(data: {
// 		username: string
// 		telegramId: number
// 		queryId: string
// 		authDate: number
// 		hash: string
// 	}) {
// 		const { username, telegramId, queryId, authDate, hash } = data

// 		// Строим строку для проверки данных
// 		const dataCheckString = `auth_date=${authDate}&query_id=${queryId}&user={"id":${telegramId},"username":"${username}"}`

// 		// Создаем HMAC-SHA256 хэш с использованием токена бота
// 		const secret = crypto
// 			.createHash('sha256')
// 			.update(this.telegramToken)
// 			.digest()
// 		const dataHash = crypto
// 			.createHmac('sha256', secret)
// 			.update(dataCheckString)
// 			.digest('hex')

// 		// Проверяем хэш
// 		if (hash !== dataHash) {
// 			throw new Error('Data integrity check failed')
// 		}

// 		// Логика аутентификации пользователя
// 		const userRecord = await this.findOrCreateUser({ telegramId, username })

// 		return { authenticated: true, user: userRecord }
// 	}

// 	private async findOrCreateUser({ telegramId, username }) {
// 		// Замените на реальную логику поиска/создания пользователя
// 		return { id: telegramId, username }
// 	}
// }

// import { Injectable, UnauthorizedException } from '@nestjs/common'
// import { ConfigService } from '@nestjs/config'
// import * as crypto from 'crypto'

// @Injectable()
// export class AuthService {
// 	constructor(private configService: ConfigService) {}

// 	checkTelegramAuth(data: any): boolean {
// 		const { hash, ...userData } = data
// 		console.log(1, hash)
// 		const botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN')
// 		const secretKey = crypto.createHash('sha256').update(botToken).digest()

// 		const dataCheckString = Object.keys(userData)
// 			.sort()
// 			.map((key) => `${key}=${userData[key]}`)
// 			.join('\n')

// 		const calculatedHash = crypto
// 			.createHmac('sha256', secretKey)
// 			.update(dataCheckString)
// 			.digest('hex')

// 		return calculatedHash === hash
// 	}

// 	async authenticateUser(data: any): Promise<any> {
// 		if (!this.checkTelegramAuth(data)) {
// 			throw new UnauthorizedException('Invalid hash')
// 		}

// 		// Далее можно выполнить необходимые действия с аутентифицированным пользователем
// 		return { message: 'Authenticated successfully' }
// 	}
// }

import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
	processUser(user: any): any {
		// Логика обработки пользователя
		return { message: 'User processed successfully', user }
	}
}

// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import crypto from 'crypto';
// import TelegramBot from 'node-telegram-bot-api';

// function verifyInitData(telegramInitData: string, botToken: string): { isVerified: boolean, urlParams: URLSearchParams } {
//   const urlParams: URLSearchParams = new URLSearchParams(telegramInitData);

//   const hash = urlParams.get('hash');
//   urlParams.delete('hash');
//   urlParams.sort();

//   let dataCheckString = '';
//   for (const [key, value] of urlParams.entries()) {
//     dataCheckString += `${key}=${value}\n`;
//   }
//   dataCheckString = dataCheckString.slice(0, -1);

//   const secret = crypto.createHmac('sha256', 'WebAppData').update(botToken);
//   const calculatedHash = crypto.createHmac('sha256', secret.digest()).update(dataCheckString).digest('hex');

//   const isVerified = calculatedHash === hash;

//   return { isVerified, urlParams };
// }

// @Injectable()
// export class ValidateTelegramDataMiddleware implements NestMiddleware {
//   use(req: Request & { user: any }, res: Response, next: NextFunction) {
//     const telegramInitData = ((req.headers.initdata ?? req.query.initData ?? req.query.initdata) as string);
//     const botToken = process.env.TELEGRAM_TOKEN;

//     if (!telegramInitData || !botToken) {
//       return res.status(400).send('Invalid request');
//     }

//     const { urlParams, isVerified } = verifyInitData(telegramInitData, botToken);

//     if (!isVerified) {
//       return res.status(403).send('Unauthorized request');
//     }

//     const user: TelegramBot.User = typeof urlParams.get('user') === 'string' ? JSON.parse(urlParams.get('user')) : urlParams.get('user');

//     req.user = user;

//     next();
//   }
// }
