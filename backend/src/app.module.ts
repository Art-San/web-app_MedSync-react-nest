import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DbModule } from './db/db.module'
import { AuthModule } from './auth/auth.module'

import { UserModule } from './user/user.module'
import { BotModule } from './both/bot.module'

import { ValidateTelegramDataMiddleware } from './middleware/validate-telegram-data.middleware'
import { AdminModule } from './admin/admin.module'
import { RoleMiddleware } from './middleware/role.middleware'

import { DiagnosticModule } from './diagnostic/diagnostic.module'
import { BookingModule } from './booking/booking.module'
import { SpecialtyModule } from './specialty/specialty.module'
import { LocationModule } from './location/location.module'
import { DoctorModule } from './doctor/doctor.module'
import { WorkingHoursModule } from './working_hours/working_hours.module'
import { SlotsModule } from './slots/slots.module'

@Module({
	imports: [
		DbModule,
		AuthModule,
		BotModule,
		UserModule,
		AdminModule,
		DoctorModule,
		DiagnosticModule,
		BookingModule,
		SpecialtyModule,
		LocationModule,
		WorkingHoursModule,
		SlotsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	// configure(consumer: MiddlewareConsumer) {
	// 	consumer
	// 		.apply(ValidateTelegramDataMiddleware)
	// 		.forRoutes({ path: '*', method: RequestMethod.ALL }) // Или конкретные пути, если требуется
	// }
	// configure(consumer: MiddlewareConsumer) {
	// 	consumer
	// 		.apply(ValidateTelegramDataMiddleware)
	// 		.forRoutes({ path: '*', method: RequestMethod.ALL }) // Или конкретные пути, если требуется
	// 	consumer
	// 		.apply(RoleMiddleware)
	// 		.forRoutes({ path: '*', method: RequestMethod.ALL })
	// }
}
