import { Injectable, BadRequestException } from '@nestjs/common'
import { CreateBookingDto } from './dto/create-booking.dto'
import { UpdateBookingDto } from './dto/update-booking.dto'
import { DbService } from 'src/db/db.service'
import { BaseService } from 'src/common/base.service'
import {
	parseInitData,
	validateTelegramData,
} from 'src/utils/telegram-validation'

@Injectable()
export class BookingService extends BaseService {
	constructor(private readonly dbService: DbService) {
		super(BookingService.name)
	}

	async creationSlotDoc(dto: CreateBookingDto) {
		try {
			// Validate Telegram data
			const initData = dto.userInitData
			// if (initData && !validateTelegramData(initData)) {
			// 	throw new BadRequestException('Неверные инициализационные данные')
			// }

			// Разобрать исходные данные
			// const parsedData = parseInitData(initData)

			// Вариант для размышления
			const slot = await this.dbService.slot.findFirst({
				where: {
					startTime: dto.bookingDateTime,
					doctorId: dto.doctorId,
					locationId: dto.locationId,
				},
			})

			const slotBook = await this.dbService.booking.findFirst({
				where: {
					locationId: dto.locationId,
					bookingDateTime: dto.bookingDateTime,
				},
			})

			const date = new Date(dto.bookingDateTime)
			const hours = String(date.getHours()).padStart(2, '0')
			const minutes = String(date.getMinutes()).padStart(2, '0')
			const mount = date.getMonth()
			// console.log(34, 'месяц', date.getMonth())
			// console.log(34, 'год', date.getFullYear())
			if (slotBook || slot) {
				throw new BadRequestException(
					`Время приема ${hours}:${minutes} у этого специалиста не доступно`
				)
			}

			await this.dbService.slot.create({
				data: {
					doctorId: dto.doctorId,
					locationId: dto.locationId,
					startTime: dto.bookingDateTime,
					monthNumber: mount,
				},
			})

			// Create the booking record in the database
			const booking = await this.dbService.booking.create({
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
				},
			})

			// При желании отправить уведомление пользователю
			// if (parsedData && parsedData.user) {
			// 	const userId = JSON.parse(parsedData.user).id
			// 	// Предполагаем, что sendMessage — это метод отправки сообщения через Telegram
			// 	await this.sendMessage(userId, 'Booking confirmed')
			// }

			return booking
			// return booking
		} catch (error) {
			this.handleException(error, 'byId slots')
			// throw new BadRequestException('Не удалось создать бронирование')
		}
	}

	private async sendMessage(userId: string, text: string) {
		// Реализация для отправки сообщения через Telegram
		// Убедитесь, что идентификатор пользователя и текст имеют правильный тип (строка)
	}

	// create(createBookingDto: CreateBookingDto) {
	// 	return 'This action adds a new booking'
	// }

	// findAll() {
	// 	return `This action returns all booking`
	// }

	// findOne(id: number) {
	// 	return `This action returns a #${id} booking`
	// }

	// update(id: number, updateBookingDto: UpdateBookingDto) {
	// 	return `This action updates a #${id} booking`
	// }

	// remove(id: number) {
	// 	return `This action removes a #${id} booking`
	// }
}

// import { Injectable, BadRequestException } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { CreateBookingDto } from './dto/create-booking.dto';
// import { validateTelegramData, parseInitData } from './utils/telegram-validation';

// @Injectable()
// export class DoctorService {
//   constructor(private prisma: PrismaService) {}

// }
