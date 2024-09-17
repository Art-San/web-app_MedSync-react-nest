// src/common/base.service.ts
// import {
// 	BadRequestException,
// 	InternalServerErrorException,
// 	Logger,
// } from '@nestjs/common'

// export class BaseService {
// 	protected readonly logger: Logger

// 	constructor(serviceName: string) {
// 		this.logger = new Logger(serviceName)
// 	}

// 	protected handleException(error: any, context: string) {
// 		this.logger.error(`Ошибка в ${context}`, error.message, error.stack)

// 		if (error instanceof BadRequestException) {
// 			throw error
// 		} else {
// 			throw new InternalServerErrorException(
// 				`Ошибка в ${context}: ${error.message}`
// 			)
// 		}
// 	}
// }

import { BadRequestException, Logger } from '@nestjs/common'

export class BaseService {
	protected readonly logger: Logger

	constructor(serviceName: string) {
		this.logger = new Logger(serviceName)
	}

	protected handleException(error: any, context: string) {
		this.logger.error(`Ошибка в ${context}`, error.message, error.stack)
		throw new BadRequestException(`Ошибка в ${context}: ${error.message}`)
	}
}
