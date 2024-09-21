import { Module, forwardRef } from '@nestjs/common'
import { BotService } from './bot.service'
import { DbModule } from 'src/db/db.module'
import { BotDopService } from './bot.dop.service'

@Module({
	imports: [DbModule],
	providers: [BotService, BotDopService],
	exports: [BotService],
})
export class BotModule {}
