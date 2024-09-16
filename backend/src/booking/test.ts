// import { BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common'

// export class BaseService {
// 	protected readonly logger: Logger

// 	constructor(serviceName: string) {
// 		this.logger = new Logger(serviceName)
// 	}

// 	protected handleException(error: any, context: string) {
// 		this.logger.error(`Ошибка в ${context}`, error.message, error.stack)

// 		if (error instanceof BadRequestException) {
// 			throw error
// 		} else {
// 			throw new InternalServerErrorException(`Ошибка в ${context}: ${error.message}`)
// 		}
// 	}
// }

// @Injectable()
// export class BookingService extends BaseService {
// 	constructor(
// 		private readonly dbService: DbService,
// 		private readonly botService: BotService
// 	) {
// 		super(BookingService.name)
// 	}

// 	async byId(bookingId: number) {
// 		try {
// 			const booking = await this.dbService.booking.findUnique({
// 				where: { bookingId },
// 				include: {
// 					doctor: true,
// 					location: true,
// 					diagnostic: true,
// 					slot: true,
// 				},
// 			})

// 			if (!booking) {
// 				throw new BadRequestException(
// 					`Запись с таким ID: ${bookingId} нет в БД`
// 				)
// 			}

// 			return booking
// 		} catch (error) {
// 			this.handleException(error, 'byId booking')
// 		}
// 	}

// 	async delete(bookingId: number) {
// 		try {
// 			const booking = await this.byId(bookingId)

// 			if (!booking.slotId) {
// 				throw new BadRequestException(`Слот для записи с ID: ${bookingId} не найден`)
// 			}

// 			const ids = await this.dbService.$transaction(async (prisma: Prisma.TransactionClient) => {
// 				const delSlot = await prisma.slot.delete({
// 					where: { slotId: booking.slotId },
// 				})

// 				const delBooking = await prisma.booking.delete({
// 					where: { bookingId: booking.bookingId },
// 				})

// 				return { bookingId: delBooking.bookingId, slotId: delSlot.slotId }
// 			})

// 			return {
// 				msg: `Запись с ID: ${ids.bookingId} и слот с ID: ${ids.slotId} были успешно удалены`,
// 			}
// 		} catch (error) {
// 			this.handleException(error, 'delete booking')
// 		}
// 	}
// }
