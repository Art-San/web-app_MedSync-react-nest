import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { SlotsService } from './slots.service'
import { CreateSlotDto } from './dto/create-slot.dto'
import { UpdateSlotDto } from './dto/update-slot.dto'

@Controller('slots')
export class SlotsController {
	constructor(private readonly slotsService: SlotsService) {}

	@Post()
	create(@Body() dto: CreateSlotDto) {
		return this.slotsService.create(dto)
	}

	@Get()
	findAll() {
		return this.slotsService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.slotsService.byId(+id)
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() dto: UpdateSlotDto) {
		return this.slotsService.update(+id, dto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.slotsService.remove(+id)
	}
}
