import { Module } from '@nestjs/common'
import { SlotsService } from './slots.service'
import { SlotsController } from './slots.controller'
import { DbModule } from 'src/db/db.module'

@Module({
	imports: [DbModule],
	controllers: [SlotsController],
	providers: [SlotsService],
})
export class SlotsModule {}
