import { Module } from '@nestjs/common'
import { DiagnosticLocationService } from './diagnostic-location.service'
import { DiagnosticLocationController } from './diagnostic-location.controller'
import { DbModule } from 'src/db/db.module'

@Module({
	imports: [DbModule],
	controllers: [DiagnosticLocationController],
	providers: [DiagnosticLocationService],
})
export class DiagnosticLocationModule {}
