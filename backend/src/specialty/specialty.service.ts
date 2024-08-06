import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { CreateSpecialtyDto } from './dto/create-specialty.dto'
import { UpdateSpecialtyDto } from './dto/update-specialty.dto'
import { DbService } from 'src/db/db.service'
import { error } from 'console'
import { BaseService } from 'src/common/base.service'

@Injectable()
export class SpecialtyService extends BaseService {
	constructor(private readonly dbService: DbService) {
		super(SpecialtyService.name)
	}

	async findAll() {
		try {
			const specialties = await this.dbService.specialty.findMany()
			return specialties
		} catch (error) {
			this.handleException(error, 'findAll Specialty')
		}
	}

	async create(createSpecialtyDto: CreateSpecialtyDto) {
		try {
			const specialty = await this.bySlug(createSpecialtyDto.slug)
			if (specialty) {
				throw new BadRequestException(
					`Cпециальность с таким слагом уже есть в БД ${specialty.slug}`
				)
			}
			const newSpecialty = await this.dbService.specialty.create({
				data: createSpecialtyDto,
			})

			return newSpecialty
		} catch (error) {
			this.handleException(error, 'create Specialty')
		}
	}

	async bySlug(slug: string) {
		try {
			const specialty = await this.dbService.specialty.findFirst({
				where: {
					slug,
				},
			})

			return specialty
		} catch (error) {
			this.logger.error('Ошибка в bySlug Specialty', error.message)
			throw error
		}
	}

	async byId(specialtyId: number) {
		try {
			const specialty = await this.dbService.specialty.findFirst({
				where: { specialtyId },
			})

			if (!specialty) {
				throw new BadRequestException(
					`Cпециальность с таким ID: ${specialtyId} нет в БД `
				)
			}

			return specialty
		} catch (error) {
			this.handleException(error, 'byId Specialty')
		}
	}

	async update(specialtyId: number, updateSpecialtyDto: UpdateSpecialtyDto) {
		try {
			const specialty = await this.byId(specialtyId)
			// if (!specialty) {
			// 	throw new BadRequestException(
			// 		`Cпециальность с таким ID: ${specialtyId} нет в БД `
			// 	)
			// }

			const existSlugSpecialty = await this.bySlug(updateSpecialtyDto.slug)

			if (existSlugSpecialty) {
				throw new BadRequestException(
					`Cпециальность с таким слагом уже есть в БД ${updateSpecialtyDto.slug}`
				)
			}

			const updatedSpecialty = await this.dbService.specialty.update({
				where: { specialtyId },
				data: updateSpecialtyDto,
			})

			return updatedSpecialty
		} catch (error) {
			this.handleException(error, 'update Specialty')
		}
	}

	async delete(specialtyId: number) {
		try {
			const specialty = await this.byId(specialtyId)
			// if (!specialty) {
			// 	throw new BadRequestException(
			// 		`Cпециальность с таким ID: ${specialtyId} нет в БД`
			// 	)
			// }

			await this.dbService.specialty.delete({
				where: { specialtyId },
			})

			return { msg: `Cпециальность с таким ID: ${specialtyId} удалена` }
		} catch (error) {
			this.handleException(error, 'delete Specialty')
		}
	}
}
