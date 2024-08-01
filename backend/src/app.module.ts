import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DbModule } from './db/db.module'
import { AuthModule } from './auth/auth.module'

import { UserModule } from './user/user.module'
import { BotModule } from './both/bot.module'

@Module({
	imports: [DbModule, AuthModule, BotModule, UserModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
