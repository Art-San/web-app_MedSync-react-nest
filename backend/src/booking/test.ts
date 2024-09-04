// 1. Контроллер (Controller)
/////////////////////////////////////////////////////////////////////////////////
// import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
// import { DoctorService } from './doctor.service';
// import { CreateBookingDto } from './dto/create-booking.dto';
// import { TelegramService } from './telegram.service'; // сервис для отправки сообщения в Telegram

// @Controller('doctor')
// export class DoctorController {
// 	constructor(
// 		private readonly doctorService: DoctorService
// 		// private readonly telegramService: TelegramService, // для отправки уведомлений в Telegram
// 	) {}

// 	@Post('book_slot')
// 	async bookSlot(@Body() createBookingDto: CreateBookingDto) {
// 		const initData = createBookingDto.userInitData

// 		if (initData && !this.doctorService.validateTelegramData(initData)) {
// 			throw new BadRequestException('Invalid initData')
// 		}

// 		const parsedData = this.doctorService.parseInitData(initData)
// 		const result = await this.doctorService.bookSlot(
// 			createBookingDto,
// 			parsedData
// 		)

// 		if (initData) {
// 			const userInfo = parsedData?.user
// 			if (userInfo) {
// 				const userId = JSON.parse(userInfo).id
// 				const notification =
// 					await this.doctorService.getBookingNotificationText(result.booking_id)
// 				await this.telegramService.sendMessage(userId, notification)
// 			}
// 		}

// 		return result
// 	}
// }

// 2. Сервис (Service)
/////////////////////////////////////////////////////////////////////////////////////////////
// import { Injectable } from '@nestjs/common';
// import { CreateBookingDto } from './dto/create-booking.dto';

// @Injectable()
// export class DoctorService {
//   async bookSlot(createBookingDto: CreateBookingDto, parsedData: any) {
//     // Логика бронирования слота, например, взаимодействие с базой данных
//     const bookingResult = {
//       booking_id: 123, // предположим, что бронирование успешно и возвращается ID
//     };
//     return bookingResult;
//   }

//   validateTelegramData(initData: string): boolean {
//     // Логика проверки данных из Telegram
//     return true; // верните false, если проверка не прошла
//   }

//   parseInitData(initData: string): any {
//     // Логика парсинга данных из Telegram
//     return { user: JSON.stringify({ id: '123456789' }) }; // пример возвращаемых данных
//   }

//   async getBookingNotificationText(bookingId: number): Promise<string> {
//     // Логика получения текста уведомления
//     return `Your booking is confirmed with ID ${bookingId}`;
//   }
// }

//  4. Модуль (Module)
//////////////////////////////////////////////////////////////////////////
// import { Module } from '@nestjs/common';
// import { DoctorController } from './doctor.controller';
// import { DoctorService } from './doctor.service';
// import { TelegramService } from './telegram.service'; // добавьте TelegramService

// @Module({
//   controllers: [DoctorController],
//   providers: [DoctorService, TelegramService], // добавьте TelegramService
// })
// export class DoctorModule {}

// 5. TelegramService
///////////////////////////////////////////////////////////////////
// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class TelegramService {
//   async sendMessage(chatId: string, text: string) {
//     // Логика отправки сообщения через Telegram Bot API
//     console.log(`Sending message to ${chatId}: ${text}`);
//   }
// }
