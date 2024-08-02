import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { corsConfig } from './config/cors-config'
import { ValidateTelegramDataMiddleware } from './middleware/validate-telegram-data.middleware'
import * as bodyParser from 'body-parser'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// app.enableCors(corsOptions)
	app.enableCors(corsConfig)

	app.setGlobalPrefix('api')

	app.use(bodyParser.json())

	app.use(new ValidateTelegramDataMiddleware().use)

	app.useGlobalPipes(new ValidationPipe()) // глобальный ValidationPipe не надо в контроллерах так писать @UsePipes(new ValidationPipe())

	await app.listen(process.env.PORT || 3001)
	console.log(`Сервер запущен на порту ${process.env.PORT}`)
}
bootstrap()
