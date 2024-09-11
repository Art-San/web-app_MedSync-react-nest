import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { DiagnosticLocationService } from './diagnostic-location.service'
import { CreateDiagnosticLocationDto } from './dto/create-diagnostic-location.dto'
import { UpdateDiagnosticLocationDto } from './dto/update-diagnostic-location.dto'

@Controller('diagnostic-location')
export class DiagnosticLocationController {
	constructor(
		private readonly diagnosticLocationService: DiagnosticLocationService
	) {}

	@Post()
	create(@Body() dto: CreateDiagnosticLocationDto) {
		return this.diagnosticLocationService.create(dto)
	}

	@Get()
	findAll() {
		return this.diagnosticLocationService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.diagnosticLocationService.findOne(+id)
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateDiagnosticLocationDto: UpdateDiagnosticLocationDto
	) {
		return this.diagnosticLocationService.update(
			+id,
			updateDiagnosticLocationDto
		)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.diagnosticLocationService.remove(+id)
	}
}
