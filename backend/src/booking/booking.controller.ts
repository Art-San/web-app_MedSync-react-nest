import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	BadRequestException,
} from '@nestjs/common'
import { BookingService } from './booking.service'
import { CreateBookingDto } from './dto/create-booking.dto'
import { UpdateBookingDto } from './dto/update-booking.dto'

@Controller('booking')
export class BookingController {
	constructor(
		private readonly bookingService: BookingService
		// private readonly telegramService: TelegramService, // для отправки уведомлений в Telegram
	) {}

	@Post('doctors')
	createBookingDoc(@Body() dto: CreateBookingDto) {
		return this.bookingService.creationSlotDoc(dto)
	}

	@Get()
	findAll() {
		return { msg: 'все гуд' }
		// return this.bookingService.findAll()
	}

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	//   return this.bookingService.findOne(+id);
	// }

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
	//   return this.bookingService.update(+id, updateBookingDto);
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	//   return this.bookingService.remove(+id);
	// }
}
