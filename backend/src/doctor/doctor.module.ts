import { Module } from '@nestjs/common'
import { DoctorService } from './doctor.service'
import { DoctorController } from './doctor.controller'
import { DbModule } from 'src/db/db.module'

@Module({
	imports: [DbModule],
	controllers: [DoctorController],
	providers: [DoctorService],
})
export class DoctorModule {}
