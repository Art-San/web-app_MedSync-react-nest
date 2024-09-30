// import { Injectable, OnModuleInit } from '@nestjs/common';
// import * as TelegramBot from 'node-telegram-bot-api';
// import { format } from 'date-fns';

// @Injectable()
// export class BotService implements OnModuleInit {
//   private bot: TelegramBot;

//   constructor() {
//     this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
//   }

//   async onModuleInit() {
//     this.bot.on('polling_error', (err) => console.log('polling_error', err.message));
//     this.setupHandlers();
//   }

//   private setupHandlers() {
//     this.bot.onText(/\/myBookings/, async (msg) => {
//       const chatId = msg.chat.id;
//       await this.showBookings(chatId);
//     });

//     this.bot.on('callback_query', async (query) => {
//       const chatId = query.message.chat.id;
//       const bookingId = query.data.split('_')[2];

//       if (query.data.startsWith('show_booking_')) {
//         await this.showBookingDetails(chatId, bookingId);
//       } else if (query.data === 'exit') {
//         await this.bot.sendMessage(chatId, 'Exited.');
//       }

//       await this.bot.answerCallbackQuery(query.id);
//     });
//   }

//   async showBookings(chatId: number) {
//     const bookings = await this.botDopService.getBookings(chatId);

//     const buttons = bookings.map((booking) => {
//       const description = booking.doctor
//         ? `👨‍⚕️ ${format(booking.bookingDateTime, 'dd MMMM')} - ${booking.doctor.fullName}`
//         : `🔬 ${format(booking.bookingDateTime, 'dd MMMM')} - ${booking.diagnostic.typeName}`;

//       return [
//         {
//           text: description,
//           callback_data: `show_booking_${booking.bookingId}`,
//         },
//       ];
//     });

//     await this.bot.sendMessage(
//       chatId,
//       'Here is your booking list. Select one to see details',
//       {
//         reply_markup: {
//           inline_keyboard: [...buttons, [{ text: 'Exit', callback_data: 'exit' }]],
//         },
//       }
//     );
//   }

//   async showBookingDetails(chatId: number, bookingId: string) {
//     const booking = await this.botDopService.getBooking(bookingId);

//     const description = booking.doctor
//       ? `👨‍⚕️ ${format(booking.bookingDateTime, 'dd MMMM yyyy, HH:mm')} - ${booking.doctor.fullName}`
//       : `🔬 ${format(booking.bookingDateTime, 'dd MMMM yyyy, HH:mm')} - ${booking.diagnostic.typeName}`;

//     const details = `
//       Booking ID: ${booking.bookingId}
//       ${description}
//       Location: ${booking.location}
//     `;

//     await this.bot.sendMessage(
//       chatId,
//       details,
//       {
//         reply_markup: {
//           inline_keyboard: [[{ text: 'Back', callback_data: 'back' }]],
//         },
//       }
//     );
//   }
// }
