import { PrismaClient } from '@prisma/client'
import { Injectable, OnModuleInit } from '@nestjs/common'

@Injectable()
export class DbService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		// хук onModuleInit для подключения к БД
		//
		await this.$connect()
	}
}

// import { INestApplication, Injectable} from '@nestjs/common'
// import { PrismaClient } from '@prisma/client'

// @Injectable()
// export class DbService extends PrismaClient {
// 	async onModuleInit() {
// 		// хук onModuleInit для подключения к БД
// 		await this.$connect()
// 	}

// 	async onModuleDestroy() {
// 		await this.$disconnect()
// 	}

// 	async enableShutdownHooks(app: INestApplication) {
// 		this.$on('beforeExit', async () => {
// 			await app.close()
// 		})
// 	}
// }
