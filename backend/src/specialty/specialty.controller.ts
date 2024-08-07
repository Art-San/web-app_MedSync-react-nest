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
import { SpecialtyService } from './specialty.service'
import { CreateSpecialtyDto } from './dto/create-specialty.dto'
import { UpdateSpecialtyDto } from './dto/update-specialty.dto'

@Controller('specialties')
export class SpecialtyController {
	constructor(private readonly specialtyService: SpecialtyService) {}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.specialtyService.byId(+id)
	}

	@Get()
	async findAll() {
		return this.specialtyService.findAll()
	}

	@Post()
	async create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
		console.log(1, 'дрыг')
		return this.specialtyService.create(createSpecialtyDto)
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateSpecialtyDto: UpdateSpecialtyDto
	) {
		return this.specialtyService.update(+id, updateSpecialtyDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.specialtyService.delete(+id)
	}
}
