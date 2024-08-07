import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Put,
	Param,
	Delete,
} from '@nestjs/common'
import { DoctorService } from './doctor.service'
import { CreateDoctorDto } from './dto/create-doctor.dto'
import { UpdateDoctorDto } from './dto/update-doctor.dto'

@Controller('doctors')
export class DoctorController {
	constructor(private readonly doctorService: DoctorService) {}

	@Post()
	create(@Body() createDoctorDto: CreateDoctorDto) {
		return this.doctorService.create(createDoctorDto)
	}

	@Get()
	findAll() {
		return this.doctorService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.doctorService.byId(+id)
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
		return this.doctorService.update(+id, updateDoctorDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.doctorService.delete(+id)
	}
}
