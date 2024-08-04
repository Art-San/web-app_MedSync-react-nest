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

@Module({
	imports: [DbModule, AuthModule, BotModule, UserModule, AdminModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(ValidateTelegramDataMiddleware)
			.forRoutes({ path: '*', method: RequestMethod.ALL }) // Или конкретные пути, если требуется

		consumer
			.apply(RoleMiddleware)
			.forRoutes({ path: '*', method: RequestMethod.ALL })
	}
}
