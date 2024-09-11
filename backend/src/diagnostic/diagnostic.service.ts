import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto'
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto'
import { DbService } from 'src/db/db.service'
import { BaseService } from 'src/common/base.service'
// diagnostic
// Diagnostic
// diagnostics
// Diagnostics
@Injectable()
export class DiagnosticService extends BaseService {
	constructor(private readonly dbService: DbService) {
		super(DiagnosticService.name)
	}

	async findAll() {
		try {
			const diagnostics = await this.dbService.diagnostic.findMany()
			return diagnostics
		} catch (error) {
			this.handleException(error, 'findAll Diagnostics')
		}
	}

	async create(dto: CreateDiagnosticDto) {
		try {
			const diagnostic = await this.findBySlug(dto.slug)
			if (diagnostic) {
				throw new BadRequestException(
					`Диагностика с таким слагом уже есть в БД ${diagnostic.slug}`
				)
			}
			const newDiagnostics = await this.dbService.diagnostic.create({
				data: dto,
			})

			return newDiagnostics
			return dto
		} catch (error) {
			this.handleException(error, 'create Diagnostic')
		}
	}

	async findBySlug(slug: string) {
		try {
			const diagnostic = await this.dbService.diagnostic.findFirst({
				where: {
					slug,
				},
			})

			return diagnostic
		} catch (error) {
			this.logger.error('Ошибка в findBySlug Diagnostic', error.message)
			throw error
		}
	}

	async findById(diagnosticId: number) {
		try {
			const diagnostic = await this.dbService.diagnostic.findFirst({
				where: { diagnosticId },
			})

			if (!diagnostic) {
				throw new BadRequestException(
					`Диагностики с таким ID: ${diagnosticId} нет в БД `
				)
			}

			return diagnostic
		} catch (error) {
			this.handleException(error, 'findById diagnostic')
		}
	}

	async update(diagnosticId: number, dto: UpdateDiagnosticDto) {
		try {
			const diagnostic = await this.findById(diagnosticId)
			// if (!diagnostic) {
			// 	throw new BadRequestException(
			// 		`Cпециальность с таким ID: ${diagnosticId} нет в БД `
			// 	)
			// }

			if (dto.slug) {
				const existSlugDiagnostic = await this.findBySlug(dto.slug)
				if (existSlugDiagnostic) {
					throw new BadRequestException(
						`Cпециальность с таким слагом уже есть в БД ${dto.slug}`
					)
				}
			}

			const updatedSpecialty = await this.dbService.diagnostic.update({
				where: { diagnosticId },
				data: dto,
			})

			return updatedSpecialty
		} catch (error) {
			this.handleException(error, 'update diagnostic')
		}
	}

	async remove(diagnosticId: number) {
		try {
			const diagnostic = await this.findById(diagnosticId)
			// if (!diagnostic) {
			// 	throw new BadRequestException(
			// 		`Диагностики с таким ID: ${diagnosticId} нет в БД`
			// 	)
			// }

			await this.dbService.diagnostic.delete({
				where: { diagnosticId },
			})

			return { msg: `Диагностики с таким ID: ${diagnosticId} удалена` }
		} catch (error) {
			this.handleException(error, 'delete diagnostic')
		}
	}
}
