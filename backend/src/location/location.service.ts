import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { CreateLocationDto } from './dto/create-location.dto'
import { UpdateLocationDto } from './dto/update-location.dto'
import { DbService } from 'src/db/db.service'
import { BaseService } from 'src/common/base.service'

@Injectable()
export class LocationService extends BaseService {
	// private readonly logger = new Logger(LocationService.name)
	constructor(private readonly dbService: DbService) {
		super(LocationService.name)
	}

	// private handleException(error: any, context: string) {
	// 	this.logger.error(`Ошибка в ${context}`, error.message, error.stack)
	// 	throw new BadRequestException(`Ошибка в ${context}: ${error.message}`)
	// }

	async create(createLocationDto: CreateLocationDto) {
		try {
			const newLocation = await this.dbService.location.create({
				data: createLocationDto,
			})

			return newLocation
		} catch (error) {
			this.handleException(error, 'create Location')
		}
	}

	async findAll() {
		try {
			const locations = await this.dbService.location.findMany()
			return locations
		} catch (error) {
			this.logger.error('Ошибка в findAll Location', error.message)
			this.handleException(error, 'findAll Location')
		}
	}

	async byId(locationId: number) {
		try {
			const location = await this.dbService.location.findUnique({
				where: { locationId },
			})

			if (!location) {
				throw new BadRequestException(
					`Локации с таким ID: ${locationId} нет в БД `
				)
			}

			return location
		} catch (error) {
			this.handleException(error, 'byId Location')
		}
	}

	async update(locationId: number, updateLocationDto: UpdateLocationDto) {
		try {
			const location = await this.byId(locationId)
			// проверка if (!location) после вызова метода byId избыточна,
			// так как этот метод уже выбрасывает исключение, если локация не найдена.
			// if (!location) {
			// 	throw new BadRequestException(
			// 		`Локации с таким ID: ${locationId} нет в БД`
			// 	)
			// }

			const updatedLocation = await this.dbService.location.update({
				where: { locationId },
				data: updateLocationDto,
			})

			return updatedLocation
		} catch (error) {
			this.handleException(error, 'update Location')
		}
	}

	async delete(locationId: number) {
		try {
			const location = await this.byId(locationId)
			// проверка if (!location) после вызова метода byId избыточна,
			// так как этот метод уже выбрасывает исключение, если локация не найдена.
			// if (!location) {
			// 	throw new BadRequestException(
			// 		`Локации с таким ID: ${locationId} нет в БД`
			// 	)
			// }

			await this.dbService.location.delete({
				where: { locationId },
			})

			return { msg: `Локация с таким ID: ${locationId} удалена` }
		} catch (error) {
			this.handleException(error, 'delete Location')
		}
	}
}
