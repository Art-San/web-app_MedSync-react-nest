import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Put,
} from '@nestjs/common'
import { DiagnosticService } from './diagnostic.service'
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto'
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto'

@Controller('diagnostics')
export class DiagnosticController {
	constructor(private readonly diagnosticService: DiagnosticService) {}

	@Get()
	async findAll() {
		return this.diagnosticService.findAll()
	}

	@Post()
	async create(@Body() dto: CreateDiagnosticDto) {
		return this.diagnosticService.create(dto)
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.diagnosticService.findById(+id)
	}
	@Get(':id/locations')
	async findAllLoc(@Param('id') id: string) {
		return this.diagnosticService.findByIdAllLoc(+id)
	}

	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateDiagnosticDto) {
		return this.diagnosticService.update(+id, dto)
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.diagnosticService.remove(+id)
	}
}
