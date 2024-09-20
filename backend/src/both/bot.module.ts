import { Module } from '@nestjs/common'
import { BotService } from './bot.service'
import { DbModule } from 'src/db/db.module'

@Module({
	imports: [DbModule],
	providers: [BotService],
	exports: [BotService],
})
export class BotModule {}
