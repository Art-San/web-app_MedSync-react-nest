import { Module } from '@nestjs/common'
import { WorkingHoursService } from './working_hours.service'
import { WorkingHoursController } from './working_hours.controller'
import { DbModule } from 'src/db/db.module'

@Module({
	imports: [DbModule],
	controllers: [WorkingHoursController],
	providers: [WorkingHoursService],
})
export class WorkingHoursModule {}
