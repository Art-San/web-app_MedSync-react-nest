import { Module } from '@nestjs/common'
import { BookingService } from './booking.service'
import { BookingController } from './booking.controller'
import { DbModule } from 'src/db/db.module'

@Module({
	imports: [DbModule],
	controllers: [BookingController],
	providers: [BookingService],
})
export class BookingModule {}
