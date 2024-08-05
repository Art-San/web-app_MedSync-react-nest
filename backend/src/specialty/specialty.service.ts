import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateSpecialtyDto } from './dto/create-specialty.dto'
import { UpdateSpecialtyDto } from './dto/update-specialty.dto'
import { DbService } from 'src/db/db.service'
import { error } from 'console'

@Injectable()
export class SpecialtyService {
	constructor(private readonly dbService: DbService) {}

	async findAll() {
		try {
			const specialties = await this.dbService.specialty.findMany()
			return specialties
		} catch (error) {
			console.log('Ошибка в findAll Specialty', error.message)
			throw error
		}
	}

	async create(createSpecialtyDto: CreateSpecialtyDto) {
		try {
			const specialty = await this.bySlug(createSpecialtyDto.slag)
			if (specialty) {
				throw new BadRequestException(
					`Cпециальность с таким слагом уже есть в БД ${specialty.slag}`
				)
			}
			const newSpecialty = await this.dbService.specialty.create({
				data: createSpecialtyDto,
			})

			return newSpecialty
		} catch (error) {
			console.log('Ошибка в create Specialty', error.message)
			throw error
		}
	}

	async bySlug(slag: string) {
		try {
			const specialty = await this.dbService.specialty.findFirst({
				where: {
					slag,
				},
			})

			return specialty
		} catch (error) {
			console.log('Ошибка в bySlug Specialty', error.message)
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
			console.log('Ошибка в byId Specialty', error.message)
			throw error
		}
	}

	async update(specialtyId: number, updateSpecialtyDto: UpdateSpecialtyDto) {
		try {
			const specialty = await this.byId(specialtyId)
			if (!specialty) {
				throw error
				// throw new BadRequestException(
				// 	`Cпециальность с таким ID: ${specialtyId} нет в БД `
				// )
			}

			const existSlagSpecialty = await this.bySlug(updateSpecialtyDto.slag)

			if (existSlagSpecialty) {
				throw new BadRequestException(
					`Cпециальность с таким слагом уже есть в БД ${updateSpecialtyDto.slag}`
				)
			}

			const updatedSpecialty = await this.dbService.specialty.update({
				where: { specialtyId },
				data: updateSpecialtyDto,
			})

			return updatedSpecialty
		} catch (error) {
			console.log('Ошибка в update Specialty', error.message)
			throw error
		}
	}

	async delete(specialtyId: number) {
		try {
			const specialty = await this.byId(specialtyId)
			if (!specialty) {
				throw error
			}

			await this.dbService.specialty.delete({
				where: { specialtyId },
			})

			return { msg: `Cпециальность с таким ID: ${specialtyId} удалена` }
		} catch (error) {
			console.log('Ошибка в delete Specialty', error.message)
			throw error
		}
	}
}
