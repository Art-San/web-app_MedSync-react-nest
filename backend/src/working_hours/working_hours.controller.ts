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
import { WorkingHoursService } from './working_hours.service'
import { CreateWorkingHourDto } from './dto/create-working_hour.dto'
import { UpdateWorkingHourDto } from './dto/update-working_hour.dto'

@Controller('working-hours')
export class WorkingHoursController {
	constructor(private readonly workingHoursService: WorkingHoursService) {}

	@Post()
	create(@Body() dto: CreateWorkingHourDto) {
		return this.workingHoursService.create(dto)
	}

	@Get()
	findAll() {
		return this.workingHoursService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.workingHoursService.byId(+id)
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() dto: UpdateWorkingHourDto) {
		return this.workingHoursService.update(+id, dto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.workingHoursService.remove(+id)
	}

	@Get('location/:id')
	findAllLocationId(@Param('id') id: string) {
		return this.workingHoursService.findAllByLocationId(+id)
	}
}
