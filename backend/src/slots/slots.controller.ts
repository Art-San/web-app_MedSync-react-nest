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

	// doctors/1/1/8
	@Get('doctors/:doctorId/:locationId/:monthNumber')
	async getAvailableSlots(
		@Param('doctorId') doctorId: number,
		@Param('locationId') locationId: number,
		@Param('monthNumber') monthNumber: number
	) {
		// console.log('слот дернулся doctorId', doctorId)
		// console.log('слот дернулся locationId', locationId)
		// console.log('слот дернулся monthNumber', monthNumber)
		const res = this.slotsService.getAvailableSlotsForDoctor(
			+doctorId,
			+locationId,
			+monthNumber
		)
		// console.log('слот дернулся', res)
		return res
	}

	// @Get('diagnostics/:diagnosticId/:locationId/:monthNumber')
	// async getAvailableSlotsForDiagnostic(
	//   @Param('diagnosticId') diagnosticId: number,
	//   @Param('locationId') locationId: number,
	//   @Param('monthNumber') monthNumber: number,
	// ) {
	//   return this.slotsService.getAvailableSlotsForDiagnostic(diagnosticId, locationId, monthNumber);
	// }

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
