import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateWorkingHourDto } from './dto/create-working_hour.dto'
import { UpdateWorkingHourDto } from './dto/update-working_hour.dto'
import { DbService } from 'src/db/db.service'
import { BaseService } from 'src/common/base.service'
// workingHour
// WorkingHour
@Injectable()
export class WorkingHoursService extends BaseService {
	constructor(private readonly dbService: DbService) {
		super(WorkingHoursService.name)
	}

	async byId(workingHourId: number) {
		try {
			const workingHour = await this.dbService.workingHour.findUnique({
				where: { workingHourId },
			})

			if (!workingHour) {
				throw new BadRequestException(
					`Рабочих часов с таким с таким ID: ${workingHourId} нет в БД `
				)
			}

			return workingHour
		} catch (error) {
			this.handleException(error, 'byId WorkingHour')
		}
	}

	async create(dto: CreateWorkingHourDto) {
		try {
			const location = await this.dbService.location.findUnique({
				where: { locationId: dto.locationId },
			})

			if (!location) {
				throw new BadRequestException(
					`Локации с таким ID: ${dto.locationId} нет в БД `
				)
			}
			// Проверка на существование рабочей записи с таким же locationId и weekdayIndex
			const existingWorkingHour = await this.dbService.workingHour.findFirst({
				where: {
					locationId: dto.locationId,
					weekdayIndex: dto.weekdayIndex,
				},
			})

			if (existingWorkingHour) {
				throw new BadRequestException(
					`Рабочие часы для locationId ${dto.locationId} и weekdayIndex ${dto.weekdayIndex} уже существуют.`
				)
			}

			// Создание новой записи WorkingHour
			const newWorkingHour = await this.dbService.workingHour.create({
				data: dto,
			})

			return newWorkingHour
		} catch (error) {
			this.handleException(error, 'create WorkingHour')
		}
	}

	async update(workingHourId: number, dto: UpdateWorkingHourDto) {
		try {
			const workingHour = await this.byId(workingHourId)

			const updatedLocation = await this.dbService.workingHour.update({
				where: { workingHourId },
				data: dto,
			})

			return updatedLocation
			// return 'стоп'
		} catch (error) {
			this.handleException(error, 'update workingHour')
		}
	}

	async findAll() {
		try {
			const workingHours = await this.dbService.workingHour.findMany()
			return workingHours
		} catch (error) {
			this.handleException(error, 'findAll WorkingHour')
		}
	}

	findOne(id: number) {
		return `This action returns a #${id} workingHour`
	}

	// update(id: number, updateWorkingHourDto: UpdateWorkingHourDto) {
	// 	return `This action updates a #${id} workingHour`
	// }

	remove(id: number) {
		return `This action removes a #${id} workingHour`
	}

	async findAllByLocationId(locationId: number) {
		const allHoursForLocation = await this.dbService.workingHour.findMany({
			where: {
				locationId,
			},
			orderBy: {
				// workingHourId: 'asc',
				weekdayIndex: 'asc',
			},
		})
		return allHoursForLocation
	}
}
