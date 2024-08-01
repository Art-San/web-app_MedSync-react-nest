import { Module } from '@nestjs/common'
import { UsersController } from './user.controller'
import { UsersService } from './user.service'
import { DbService } from 'src/db/db.service'
import { DbModule } from 'src/db/db.module'

@Module({
	imports: [DbModule],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UserModule {}
