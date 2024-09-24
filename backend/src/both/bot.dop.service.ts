import { Injectable, BadRequestException } from '@nestjs/common'
import * as TelegramBot from 'node-telegram-bot-api'
import { BaseService } from 'src/common/base.service'
import { DbService } from 'src/db/db.service'

@Injectable()
export class BotDopService extends BaseService {
	constructor(private readonly dbService: DbService) {
		super(BotDopService.name)
	}

	async getBookings(telegramId: number) {
		try {
			const bookings = await this.dbService.booking.findMany({
				where: { telegramId: String(telegramId) },
				select: {
					bookingId: true,
					telegramId: true,
					bookingDateTime: true,
					doctor: {
						select: {
							doctorId: true,
							fullName: true,
						},
					},
					diagnostic: {
						select: {
							diagnosticId: true,
							typeName: true,
						},
					},
				},
			})

			return bookings
		} catch (error) {
			this.handleException(error, 'getBookings bot')
		}
	}

	async getBookingDetails(bookingId: string) {
		try {
			const booking = await this.dbService.booking.findUnique({
				where: { bookingId: +bookingId },
				select: {
					bookingId: true,
					bookingDateTime: true,
					doctor: {
						select: {
							fullName: true,
						},
					},
					diagnostic: {
						select: {
							typeName: true,
						},
					},
					location: {
						select: {
							name: true,
							address: true,
						},
					},
				},
			})

			if (!booking) {
				throw new BadRequestException(
					`Бронирование с таким ID: ${bookingId} не найдено в БД `
				)
			}

			console.log(12, booking)
			return booking
		} catch (error) {
			this.handleException(error, 'byId booking')
		}
	}

	async commandEnd(telegramId: string) {
		try {
			return { msg: `Бот остановлен` }
		} catch (error) {
			console.error('Ошибка в commandEnd', error)
			throw error
		}
	}

	setBotCommands(bot: TelegramBot) {
		bot.setMyCommands([
			{ command: '/start', description: 'Запускает бота' },
			{ command: '/info', description: 'Получить информацию о пользователе' },
			{ command: '/createorder', description: 'добавить заказ, вопросы' },
			{ command: '/help', description: 'пример HTML тегов' },
			{ command: '/end', description: 'Останавливает бота' },
			{ command: '/add_order', description: 'Создание заказа через форму' },
		])
	}
}
