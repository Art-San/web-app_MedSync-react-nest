import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateSlotDto } from './dto/create-slot.dto'
import { UpdateSlotDto } from './dto/update-slot.dto'
import { DbService } from 'src/db/db.service'
import { BaseService } from 'src/common/base.service'
import { format } from 'date-fns'

@Injectable()
export class SlotsService extends BaseService {
	constructor(private readonly dbService: DbService) {
		super(SlotsService.name)
	}

	async getAvailableSlotsForDoctor(
		doctorId: number,
		locationId: number,
		monthNumber: number
	) {
		const slots = await this.dbService.slot.findMany({
			where: {
				doctorId,
				locationId,
				monthNumber,
				isBooked: false,
			},
			select: {
				startTime: true,
			},
		})

		return slots.map((slot) => slot.startTime)
	}
	async getAvailableSlotsForDiagnostic(
		diagnosticId: number,
		locationId: number,
		monthNumber: number
	) {
		const slots = await this.dbService.slot.findMany({
			where: {
				diagnosticId,
				locationId,
				monthNumber,
				isBooked: false,
			},
			select: {
				startTime: true,
			},
		})
		return slots.map((slot) => slot.startTime)
	}

	async checkingTimeAvailability(dto: UpdateSlotDto) {
		try {
			const existingAppointmentTime = await this.dbService.slot.findFirst({
				where: {
					doctorId: dto.doctorId,
					// diagnosticId: dto.diagnosticId,
					startTime: dto.startTime,
					monthNumber: dto.monthNumber,
				},
			})

			if (existingAppointmentTime) {
				throw new BadRequestException(
					`Время приема к специалисту c id ${dto.doctorId} в ${dto.startTime}:00 ${dto.monthNumber} уже существуют.`
				)
			}

			return true
		} catch (error) {
			this.handleException(error, 'checkingTimeAvailability slots')
		}
	}

	async byId(slotId: number) {
		try {
			const slot = await this.dbService.slot.findUnique({
				where: { slotId },
			})

			if (!slot) {
				throw new BadRequestException(
					`Время приема с таким с таким ID: ${slotId} нет в БД `
				)
			}

			return slot
		} catch (error) {
			this.handleException(error, 'byId slots')
		}
	}

	async create(dto: CreateSlotDto) {
		try {
			await this.checkingTimeAvailability(dto)
			// const existingAppointmentTime = await this.dbService.slot.findFirst({
			// 	where: {
			// 		doctorId: dto.doctorId,
			// 		// diagnosticId: dto.diagnosticId,
			// 		startTime: dto.startTime,
			// 		dayNumber: dto.dayNumber,
			// 		monthNumber: dto.monthNumber,
			// 	},
			// })

			// if (existingAppointmentTime) {
			// 	throw new BadRequestException(
			// 		`Время приема к специалиста c id ${dto.doctorId} в ${dto.startTime}:00 ${dto.dayNumber}/${dto.monthNumber} уже существуют.`
			// 	)
			// }

			const newAppointmentTime = await this.dbService.slot.create({
				data: dto,
			})

			return newAppointmentTime
		} catch (error) {
			this.handleException(error, 'create slot')
		}
	}

	async findAll() {
		try {
			const slots = await this.dbService.slot.findMany()
			return slots
		} catch (error) {
			this.handleException(error, 'findAll slots')
		}
	}

	async update(slotId: number, dto: UpdateSlotDto) {
		try {
			const slot = await this.byId(slotId)

			// await this.checkingTimeAvailability(dto)

			const updatedLocation = await this.dbService.slot.update({
				where: { slotId },
				data: dto,
			})

			return updatedLocation
			// return 'стоп'
		} catch (error) {
			this.handleException(error, 'update slot')
		}
	}

	remove(id: number) {
		return `This action removes a #${id} slot`
	}
}
// {
//   "doctorId": 1,
//   "locationId": 1,
//   "startTime": "2024-08-17T12:00:00Z",
//   "endTime": "2024-08-17T13:00:00Z",
//   "dayNumber": 17,
//   "monthNumber": 8,
//   "isBooked": false
// }
