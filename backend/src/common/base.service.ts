// src/common/base.service.ts
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
