// model Slot {
//   slotId       Int      @id @default(autoincrement())
//   doctorId     Int?     // Слот может быть привязан к доктору
//   diagnosticId Int?     // Или к диагностике
//   locationId   Int      // И обязательно привязан к локации
//   startTime    DateTime  // Время начала слота в формате ISO 8601
//   endTime      DateTime  // Время окончания слота в формате ISO 8601
//   dayNumber    Int      // Сделать поле обязательным
//   monthNumber  Int      // Номер месяца (1-12) для фильтрации
//   isBooked     Boolean  @default(false) // Флаг занятости слота
//   createdAt    DateTime @default(now())
//   updatedAt    DateTime @updatedAt

//   doctor       Doctor?     @relation(fields: [doctorId], references: [doctorId])
//   diagnostic   Diagnostic? @relation(fields: [diagnosticId], references: [diagnosticId])
//   location     Location    @relation(fields: [locationId], references: [locationId])
//   booking      Booking?    // Ссылка на бронирование, если слот занят

//   @@map("slots")
// }

// model Booking {
//   bookingId        Int      @id @default(autoincrement())
//   userId           Int?
//   telegramId       String?
//   userName         String
//   userSurname      String
//   userPhoneNumber  String
//   userEmail        String?
//   userMessage      String?
//   bookingDateTime  DateTime @db.Timestamptz
//   doctorId         Int?
//   diagnosticId     Int?
//   locationId       Int
//   slotId           Int?     // Убрать уникальность
//   status           BookingStatus @default(PENDING)
//   createdAt        DateTime @default(now())
//   updatedAt        DateTime @updatedAt
//   deletedAt        DateTime?

//   user             User?     @relation(fields: [userId], references: [userId])
//   doctor           Doctor?   @relation(fields: [doctorId], references: [doctorId])
//   diagnostic       Diagnostic? @relation(fields: [diagnosticId], references: [diagnosticId])
//   location         Location  @relation(fields: [locationId], references: [locationId])
//   slot             Slot?    @relation(fields: [slotId], references: [slotId])
//   results          DiagnosticResult[]

//   @@unique([doctorId, locationId, bookingDateTime], name: "unique_doctor_location_time")
//   @@unique([diagnosticId, locationId, bookingDateTime], name: "unique_diagnostic_location_time")

//   @@map("bookings")
// }

// enum BookingStatus {
//   PENDING
//   FINISHED
//   CANCELLED
// }

// import { Injectable, BadRequestException } from '@nestjs/common'
// import { CreateBookingDto } from './dto/create-booking.dto'
// import { DbService } from 'src/db/db.service'
// import { BaseService } from 'src/common/base.service'
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
// 					`Бронирование с таким ID: ${bookingId} не найдено в БД`
// 				)
// 			}

// 			return booking
// 		} catch (error) {
// 			this.handleException(error, 'findByIdBookLoc booking')
// 		}
// 	}

// 	async getBookingNotificationText(bookingId: number) {
// 		console.log('Booking ID:', bookingId)
// 		try {
// 			const booking = await this.findByIdBookLoc(bookingId)

// 			console.log('Booking:', booking)
// 			let fieldDoc: string
// 			if (booking?.doctor?.doctorId) {
// 				fieldDoc = `👨‍⚕️ Доктор: ${booking.doctor.fullName}\n`
// 			} else if (booking?.diagnosticId) {
// 				fieldDoc = `🔬 Диагностика: ${booking.diagnostic.typeName}\n`
// 			} else {
// 				fieldDoc = 'Ошибка данных'
// 			}

// 			const notificationText = `
//       🎉 Поздравляем! Ваше бронирование подтверждено. 🎉\n\n
//       📋 Запись №: ${booking.bookingId}\n
//       ${fieldDoc}
//       📍 Локация: ${booking.location.name}: ${booking.location.address}\n\n
//         Спасибо, что выбрали наш сервис! Если у вас есть какие-либо вопросы или вам нужно перенести встречу, свяжитесь с нами 📞.
//       `

// 			return notificationText
// 		} catch (error) {
// 			this.handleException(error, 'getBookingNotificationText booking')
// 		}
// 	}

// 	async creationSlotDoc(dto: CreateBookingDto) {
// 		try {
// 			const initData = dto.userInitData

// 			const isSlot = await this.dbService.slot.findFirst({
// 				where: {
// 					startTime: dto.bookingDateTime,
// 					diagnosticId: dto.diagnosticId,
// 					doctorId: dto.doctorId,
// 					locationId: dto.locationId,
// 				},
// 			})

// 			const date = new Date(dto.bookingDateTime)
// 			const hours = String(date.getHours()).padStart(2, '0')
// 			const minutes = String(date.getMinutes()).padStart(2, '0')
// 			const mount = date.getMonth()

// 			if (isSlot) {
// 				throw new BadRequestException(
// 					`Время записи ${hours}:${minutes} не доступно`
// 				)
// 			}

// 			const slot = await this.dbService.slot.create({
// 				data: {
// 					doctorId: dto.doctorId,
// 					diagnosticId: dto.diagnosticId,
// 					locationId: dto.locationId,
// 					startTime: dto.bookingDateTime,
// 					monthNumber: new Date(dto.bookingDateTime).getMonth() + 1,
// 				},
// 			})

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
// 					slotId: slot.slotId,
// 				},
// 			})

// 			const fieldDoc = await this.getBookingNotificationText(booking.bookingId)
// 			if (fieldDoc) {
// 				await this.botService.sendMessage(booking.telegramId, fieldDoc)
// 			}
// 			await this.sendMessage(booking.telegramId, 'Бронирование подтверждено')

// 			return booking
// 		} catch (error) {
// 			this.handleException(error, 'creationSlotDoc bookings')
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
// 				//  specialty: true,
// 				//  location: true,
// 				// },
// 			})
// 			return booking
// 		} catch (error) {
// 			this.handleException(error, 'findAll bookings')
// 		}
// 	}
// }
