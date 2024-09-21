import { Module, forwardRef } from '@nestjs/common'
import { BookingService } from './booking.service'
import { BookingController } from './booking.controller'
import { DbModule } from 'src/db/db.module'
import { BotModule } from 'src/both/bot.module'

@Module({
	imports: [DbModule, BotModule],
	controllers: [BookingController],
	providers: [BookingService],
	exports: [BookingService],
})
export class BookingModule {}
