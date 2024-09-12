import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateDiagnosticLocationDto } from './dto/create-diagnostic-location.dto'
import { UpdateDiagnosticLocationDto } from './dto/update-diagnostic-location.dto'
import { DbService } from 'src/db/db.service'
import { BaseService } from 'src/common/base.service'

@Injectable()
export class DiagnosticLocationService extends BaseService {
	constructor(private readonly dbService: DbService) {
		super(DiagnosticLocationService.name)
	}

	async findAll() {
		try {
			const diagnosticsLocations =
				await this.dbService.diagnosticLocation.findMany()
			return diagnosticsLocations
		} catch (error) {
			this.handleException(error, 'findAll diagnosticsLocations')
		}
	}

	async create(dto: CreateDiagnosticLocationDto) {
		try {
			const existLocation = await this.dbService.location.findFirst({
				where: {
					locationId: dto.locationId,
				},
			})
			const existDiagnostic = await this.dbService.diagnostic.findFirst({
				where: {
					diagnosticId: dto.diagnosticId,
				},
			})

			if (!existLocation || !existDiagnostic) {
				throw new BadRequestException(
					`Локации с id: ${dto.locationId} или диагностика с id: ${dto.diagnosticId} не существует`
				)
			}

			const diagnosticLocation = await this.findByLocIdDiagId(
				dto.locationId,
				dto.diagnosticId
			)

			if (diagnosticLocation) {
				throw new BadRequestException(
					`В локации с id: ${dto.locationId} диагностика с таким id: ${dto.diagnosticId} уже есть`
				)
			}

			const newDiagnosticLocation =
				await this.dbService.diagnosticLocation.create({
					data: dto,
				})

			return newDiagnosticLocation
		} catch (error) {
			this.handleException(error, 'create DiagnosticLocation')
		}
	}

	async findByLocIdDiagId(locationId: number, diagnosticId: number) {
		try {
			const existDiagnosticLocation =
				await this.dbService.diagnosticLocation.findFirst({
					where: {
						locationId,
						diagnosticId,
					},
				})

			return existDiagnosticLocation
		} catch (error) {
			this.handleException(error, 'findByLocIdDiagId DiagnosticLocation')
		}
	}

	async findLocsRelatedDiag(diagnosticId: number) {
		try {
			const existDiagnosticLocation =
				await this.dbService.diagnosticLocation.findMany({
					where: {
						diagnosticId,
					},
					include: {
						location: true,
					},
				})

			const transformedLocations = existDiagnosticLocation.map((item) => ({
				...item.location,
			}))

			return transformedLocations
		} catch (error) {
			this.handleException(error, 'findOne DiagnosticLocation')
		}
	}
	// findOne(id: number) {
	// 	return `This action returns a #${id} diagnosticLocation`
	// }

	update(id: number, updateDiagnosticLocationDto: UpdateDiagnosticLocationDto) {
		return `This action updates a #${id} diagnosticLocation`
	}

	remove(id: number) {
		return `This action removes a #${id} diagnosticLocation`
	}
}
