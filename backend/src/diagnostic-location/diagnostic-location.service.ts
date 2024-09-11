import { Injectable } from '@nestjs/common'
import { CreateDiagnosticLocationDto } from './dto/create-diagnostic-location.dto'
import { UpdateDiagnosticLocationDto } from './dto/update-diagnostic-location.dto'
import { DbService } from 'src/db/db.service'
import { BaseService } from 'src/common/base.service'

@Injectable()
export class DiagnosticLocationService extends BaseService {
	constructor(private readonly dbService: DbService) {
		super(DiagnosticLocationService.name)
	}

	async create(dto: any) {
		try {
			const newDiagnosticLocation =
				await this.dbService.diagnosticLocation.create({
					data: dto,
				})

			return newDiagnosticLocation
		} catch (error) {
			this.handleException(error, 'create DiagnosticLocation')
		}
	}

	findAll() {
		return `This action returns all diagnosticLocation`
	}

	findOne(id: number) {
		return `This action returns a #${id} diagnosticLocation`
	}

	update(id: number, updateDiagnosticLocationDto: UpdateDiagnosticLocationDto) {
		return `This action updates a #${id} diagnosticLocation`
	}

	remove(id: number) {
		return `This action removes a #${id} diagnosticLocation`
	}
}
