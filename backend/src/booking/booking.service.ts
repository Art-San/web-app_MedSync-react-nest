import { Injectable, BadRequestException } from '@nestjs/common'
import { CreateBookingDto } from './dto/create-booking.dto'
import { DbService } from 'src/db/db.service'
import { BaseService } from 'src/common/base.service'
import { BotService } from 'src/both/bot.service'
import { Prisma } from '@prisma/client'
import { getNotificationText } from 'src/both/utils/data'

@Injectable()
export class BookingService extends BaseService {
	constructor(
		private readonly dbService: DbService,
		private readonly botService: BotService
	) {
		super(BookingService.name)
	}

	async findAll() {
		try {
			const booking = await this.dbService.booking.findMany({
				// include: {
				// specialty: true,
				// location: true,
				// },
			})
			return booking
		} catch (error) {
			this.handleException(error, 'findAll bookings')
		}
	}

	async findByTelegramId(telegramId: string) {
		try {
			const booking = await this.dbService.booking.findMany({
				where: { telegramId },
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

			// if (!booking) {
			// 	throw new BadRequestException(
			// 		`Бронирования для пользователя ID: ${telegramId} не найдено в БД `
			// 	)
			// }

			return booking
		} catch (error) {
			this.handleException(error, 'findByTelegramId booking')
		}
	}
	async findById(bookingId: number) {
		try {
			const booking = await this.dbService.booking.findUnique({
				where: { bookingId },
				include: {
					doctor: true,
					location: true,
					diagnostic: true,
					slot: true,
				},
			})

			if (!booking) {
				throw new BadRequestException(
					`Бронирование с таким ID: ${bookingId} не найдено в БД `
				)
			}

			return booking
		} catch (error) {
			this.handleException(error, 'byId booking')
		}
	}

	async delete(bookingId: number) {
		try {
			const booking = await this.findById(bookingId)

			if (!booking.slotId) {
				throw new BadRequestException(
					`Во время удаления слот для записи с ID: ${bookingId} не найден`
				)
			}

			const ids = await this.dbService.$transaction(
				async (prisma: Prisma.TransactionClient) => {
					const delSlot = await prisma.slot.delete({
						where: { slotId: booking.slotId },
					})

					const delBooking = await prisma.booking.delete({
						where: {
							bookingId: booking.bookingId,
						},
					})

					return { bookingId: delBooking.bookingId, slotId: delSlot.slotId }
				}
			)

			return {
				msg: `Запись с таким ID: ${ids.bookingId} и слот с таким ID: ${ids.slotId} удалены`,
			}
		} catch (error) {
			this.handleException(error, 'delete booking')
		}
	}

	async creationSlotDoc(dto: CreateBookingDto) {
		const initData = dto.userInitData //НАДО реализоввовать если есть initData

		try {
			const existingSlot = await this.dbService.$transaction(
				async (prisma: Prisma.TransactionClient) => {
					const isSlot = await prisma.slot.findFirst({
						where: {
							startTime: dto.bookingDateTime,
							diagnosticId: dto.diagnosticId,
							doctorId: dto.doctorId,
							locationId: dto.locationId,
						},
					})

					if (isSlot) {
						throw new BadRequestException(
							`Время приема ${dto.bookingDateTime} у этого специалиста не доступно`
						)
					}

					// const date = new Date(dto.bookingDateTime)
					// const hours = String(date.getHours()).padStart(2, '0')
					// const minutes = String(date.getMinutes()).padStart(2, '0')
					// const day = date.getDate()
					// const mount = date.getMonth()

					const slot = await prisma.slot.create({
						data: {
							doctorId: dto.doctorId,
							diagnosticId: dto.diagnosticId,
							locationId: dto.locationId,
							startTime: dto.bookingDateTime,
							dayNumber: new Date(dto.bookingDateTime).getDate(),
							monthNumber: new Date(dto.bookingDateTime).getMonth(),
						},
					})

					const booking = await prisma.booking.create({
						data: {
							telegramId: dto.telegramId,
							userName: dto.userName,
							userSurname: dto.userSurname,
							userPhoneNumber: dto.userPhoneNumber,
							userEmail: dto.userEmail,
							userMessage: dto.userMessage,
							bookingDateTime: dto.bookingDateTime,
							doctorId: dto.doctorId,
							diagnosticId: dto.diagnosticId,
							locationId: dto.locationId,
							slotId: slot.slotId,
						},
					})

					await prisma.slot.update({
						where: { slotId: slot.slotId },
						data: {
							bookingId: booking.bookingId,
						},
					})

					return booking
				}
			)

			await this.sendMessage(existingSlot.telegramId, existingSlot.bookingId)

			return existingSlot
		} catch (error) {
			this.handleException(error, 'creationSlotDoc bookings')
		}
	}

	async getBookingNotificationText(bookingId: number) {
		try {
			const booking = await this.findById(bookingId)

			const mes = getNotificationText(booking)

			const notificationText =
				`🎉 Поздравляем! Ваше бронирование подтверждено. 🎉\n\n` + mes

			return notificationText
		} catch (error) {
			this.handleException(error, 'getBookingNotificationText booking')
		}
	}

	private async sendMessage(telegramId: string, bookingId: number) {
		try {
			const fieldDoc = await this.getBookingNotificationText(bookingId)

			if (fieldDoc) {
				await this.botService.sendMessage(telegramId, fieldDoc)
			}
		} catch (error) {
			this.handleException(error, 'sendMessage bookings')
		}
	}

	// async findByIdBookLoc(bookingId: number) {
	// 	try {
	// 		const booking = await this.dbService.booking.findUnique({
	// 			where: { bookingId: bookingId },
	// 			include: {
	// 				doctor: true,
	// 				location: true,
	// 				diagnostic: true,
	// 			},
	// 		})

	// 		if (!booking) {
	// 			throw new BadRequestException(
	// 				`Бронирование с таким ID: ${bookingId} не найдено в БД`
	// 			)
	// 		}

	// 		return booking
	// 	} catch (error) {
	// 		this.handleException(error, 'findByIdBookLoc booking')
	// 		throw error // Пробрасываем исключение дальше
	// 	}
	// }
}

// import { Booking } from './entities/booking.entity'
// import { Injectable, BadRequestException } from '@nestjs/common'
// import { CreateBookingDto } from './dto/create-booking.dto'
// import { UpdateBookingDto } from './dto/update-booking.dto'
// import { DbService } from 'src/db/db.service'
// import { BaseService } from 'src/common/base.service'
// import {
// 	parseInitData,
// 	validateTelegramData,
// } from 'src/utils/telegram-validation'
// import { BotService } from 'src/both/bot.service'

// @Injectable()
// export class BookingService extends BaseService {
// 	constructor(
// 		private readonly dbService: DbService,
// 		private readonly botService: BotService
// 	) {
// 		super(BookingService.name)
// 	}

// 	async findByIdBookLoc(bookingId: number) {
// 		try {
// 			const booking = await this.dbService.booking.findUnique({
// 				where: { bookingId: bookingId },
// 				include: {
// 					doctor: true,
// 					location: true,
// 					diagnostic: true,
// 				},
// 			})

// 			if (!booking) {
// 				throw new BadRequestException(
// 					`бронирование с таким ID: ${bookingId} нет в БД`
// 				)
// 			}

// 			return booking
// 			// return { msg: 'findByIdBookLoc' }
// 		} catch (error) {
// 			this.handleException(error, 'findByIdBookLoc booking')
// 		}
// 	}

// 	async getBookingNotificationText(bookingId: number) {
// 		console.log(454, 'bookingId', bookingId)
// 		try {
// 			const booking = await this.findByIdBookLoc(bookingId)

// 			console.log(455, 'booking', booking)
// 			let fieldDoc: string
// 			if (booking?.doctor.doctorId) {
// 				fieldDoc = `👨‍⚕️ Doctor: ${booking?.doctor.fullName}\n`
// 			} else if (booking?.diagnosticId) {
// 				fieldDoc = `🔬 Diagnostic: ${booking?.diagnostic.typeName}\n`
// 			} else {
// 				fieldDoc = 'чет не то'
// 			}

// 			const notificationText = `
// 			🎉 Поздравляем! Ваше бронирование подтверждено. 🎉\n\n
// 			📋 Запись №: ${booking.bookingId}\n
// 			${fieldDoc}
// 			📍 Локация: ${booking.location.name}: ${booking.location.address}\n\n
// 			Спасибо, что выбрали наш сервис! Если у вас есть какие-либо вопросы или вам нужно перенести встречу, свяжитесь с нами 📞.
// 			`

// 			return notificationText
// 			// return booking
// 		} catch (error) {
// 			this.handleException(error, 'getBookingNotificationText booking')
// 		}
// 	}
// 	async creationSlotDoc(dto: CreateBookingDto) {
// 		try {
// 			// Validate Telegram data
// 			const initData = dto.userInitData
// 			// if (initData && !validateTelegramData(initData)) {
// 			// 	throw new BadRequestException('Неверные инициализационные данные')
// 			// }

// 			// Разобрать исходные данные
// 			// const parsedData = parseInitData(initData)

// 			console.log(453, 'slot', dto)
// 			// Вариант для размышления

// 			const isSlot = await this.dbService.slot.findFirst({
// 				where: {
// 					startTime: dto.bookingDateTime,
// 					diagnosticId: dto.diagnosticId,
// 					doctorId: dto.doctorId,
// 					locationId: dto.locationId,
// 				},
// 			})

// 			console.log(454, 'slot', isSlot)

// 			const isSlotBook = await this.dbService.booking.findFirst({
// 				where: {
// 					bookingDateTime: dto.bookingDateTime,
// 					diagnosticId: dto.diagnosticId,
// 					doctorId: dto.doctorId,
// 					locationId: dto.locationId,
// 				},
// 			})
// 			console.log(455, 'slotBook', isSlotBook)

// 			const date = new Date(dto.bookingDateTime)
// 			const hours = String(date.getHours()).padStart(2, '0')
// 			const minutes = String(date.getMinutes()).padStart(2, '0')
// 			const mount = date.getMonth()

// 			if (isSlotBook || isSlot) {
// 				throw new BadRequestException(
// 					`Время приема ${hours}:${minutes} у этого специалиста не доступно`
// 				)
// 			}

// 			const slot = await this.dbService.slot.create({
// 				data: {
// 					doctorId: dto.doctorId,
// 					diagnosticId: dto.diagnosticId,
// 					locationId: dto.locationId,
// 					startTime: dto.bookingDateTime,
// 					monthNumber: mount,
// 				},
// 			})

// 			// Создайте запись о бронировании в базе данных
// 			const booking = await this.dbService.booking.create({
// 				data: {
// 					telegramId: dto.telegramId,
// 					userName: dto.userName,
// 					userSurname: dto.userSurname,
// 					userPhoneNumber: dto.userPhoneNumber,
// 					userEmail: dto.userEmail,
// 					userMessage: dto.userMessage,
// 					bookingDateTime: dto.bookingDateTime,
// 					doctorId: dto.doctorId,
// 					diagnosticId: dto.diagnosticId,
// 					locationId: dto.locationId,
// 					// slotId: slot.slotId,
// 				},
// 			})

// 			// При желании отправить уведомление пользователю
// 			// if (parsedData && parsedData.user) {
// 			// 	const userId = JSON.parse(parsedData.user).id
// 			// 	// Предполагаем, что sendMessage — это метод отправки сообщения через Telegram
// 			// 	await this.sendMessage(userId, 'Бронирование подтверждено')
// 			// }

// 			// const fieldDoc = await this.getBookingNotificationText(booking.bookingId)
// 			// if (fieldDoc) {
// 			// 	await this.botService.sendMessage(booking.telegramId, fieldDoc)
// 			// }
// 			// await this.sendMessage(booking.telegramId, 'Бронирование подтверждено')

// 			// return { msg: 'cnm' }
// 			return booking
// 			// return booking
// 		} catch (error) {
// 			this.handleException(error, 'creationSlotDoc bookings')
// 			// throw new BadRequestException('Не удалось создать бронирование')
// 		}
// 	}

// 	private async sendMessage(userId: string, fieldDoc: string) {
// 		// Реализация для отправки сообщения через Telegram
// 		// Убедитесь, что идентификатор пользователя и текст имеют правильный тип (строка)
// 	}

// 	async findAll() {
// 		try {
// 			const booking = await this.dbService.booking.findMany({
// 				// include: {
// 				// 	specialty: true,
// 				// 	location: true,
// 				// },
// 			})
// 			return booking
// 		} catch (error) {
// 			this.handleException(error, 'findAll bookings')
// 		}
// 	}
// }
