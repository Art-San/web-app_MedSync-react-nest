import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { AdminController } from './admin.controller'
import { DbModule } from 'src/db/db.module'

@Module({
	imports: [DbModule],
	controllers: [AdminController],
	providers: [AdminService],
})
export class AdminModule {}
