// import { PrismaClient } from '@prisma/client'
// import { Injectable, OnModuleInit } from '@nestjs/common'

// @Injectable()
// export class DbService extends PrismaClient implements OnModuleInit {
// 	async onModuleInit() {
// 		// хук onModuleInit для подключения к БД
// 		//
// 		await this.$connect()
// 	}
// }

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class DbService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	async onModuleInit() {
		await this.$connect()
	}

	async onModuleDestroy() {
		await this.$disconnect()
	}
}
