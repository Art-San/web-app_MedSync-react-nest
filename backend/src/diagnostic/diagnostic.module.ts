import { Module } from '@nestjs/common'
import { DiagnosticService } from './diagnostic.service'
import { DiagnosticController } from './diagnostic.controller'
import { DbModule } from 'src/db/db.module'

@Module({
	imports: [DbModule],
	controllers: [DiagnosticController],
	providers: [DiagnosticService],
})
export class DiagnosticModule {}
