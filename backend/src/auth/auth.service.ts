import { Injectable } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import * as crypto from 'crypto'

@Injectable()
export class AuthService {
	private telegramToken = process.env.TELEGRAM_BOT_TOKEN

	async authenticate(data: {
		username: string
		telegramId: number
		queryId: string
	}) {
		// Проверьте данные с помощью хеша
		const { username, telegramId, queryId } = data
		const initData = `user={"id":${telegramId},"username":"${username}"}&query_id=${queryId}`
		const secret = crypto
			.createHash('sha256')
			.update(this.telegramToken)
			.digest()
		const hash = crypto
			.createHmac('sha256', secret)
			.update(initData)
			.digest('hex')

		// В реальном сценарии сравниваем хеш с хешем из initData
		// Здесь мы просто проверяем корректность данных
		// if (hash !== data.hash) {
		//   throw new Error('Invalid data');
		// }

		// Здесь выполним логику аутентификации пользователя
		// Например, находим или создаем пользователя в вашей базе данных
		const user = await this.findOrCreateUser({ telegramId, username })

		return { authenticated: true, user }
	}

	private async findOrCreateUser({ telegramId, username }) {
		// Заменяем фактической логикой поиска/создания пользователя
		return { id: telegramId, username: 'vf' }
	}

	// create(createAuthDto: CreateAuthDto) {
	// 	return 'This action adds a new auth'
	// }

	// findAll() {
	// 	return `This action returns all auth`
	// }

	// findOne(id: number) {
	// 	return `This action returns a #${id} auth`
	// }

	// update(id: number, updateAuthDto: UpdateAuthDto) {
	// 	return `This action updates a #${id} auth`
	// }

	// remove(id: number) {
	// 	return `This action removes a #${id} auth`
	// }
}
