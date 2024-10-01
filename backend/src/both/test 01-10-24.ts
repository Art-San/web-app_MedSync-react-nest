// const { Telegraf, Scenes, session, Markup } = require('telegraf');
// const { BaseScene, Stage } = Scenes;
// const { format } = require('date-fns');

// // Создаем сцену для отображения списка бронирований
// const bookingListScene = new BaseScene('bookingList');

// bookingListScene.enter(async (ctx) => {
//   const chatId = ctx.from.id;
//   // Получаем список бронирований пользователя
//   const bookings = await getBookingsForUser(chatId); // Реализуйте эту функцию

//   if (bookings.length === 0) {
//     await ctx.reply('У вас нет активных бронирований.');
//     return ctx.scene.leave();
//   }

//   // Генерируем кнопки для каждого бронирования
//   const buttons = bookings.map((booking) => {
//     const dateStr = format(new Date(booking.bookingDateTime), 'dd MMMM');
//     const description = booking.doctor
//       ? `👨‍⚕️ ${dateStr} - ${booking.doctor.fullName}`
//       : `🔬 ${dateStr} - ${booking.diagnostic.typeName}`;

//     return [Markup.button.callback(description, `show_booking_${booking.bookingId}`)];
//   });

//   // Добавляем кнопку выхода
//   buttons.push([Markup.button.callback('Выход', 'exit_show_bookings')]);

//   await ctx.reply('Вот ваш список бронирований. Выберите одно, чтобы увидеть подробности:', Markup.inlineKeyboard(buttons));
// });

// bookingListScene.action(/show_booking_(.+)/, async (ctx) => {
//   const bookingId = ctx.match[1];
//   ctx.scene.state.bookingId = bookingId;
//   await ctx.scene.enter('bookingDetails');
// });

// bookingListScene.action('exit_show_bookings', async (ctx) => {
//   await ctx.reply('Вы вышли из списка бронирований.');
//   await ctx.scene.leave();
// });

// // Создаем сцену для отображения деталей бронирования
// const bookingDetailsScene = new BaseScene('bookingDetails');

// bookingDetailsScene.enter(async (ctx) => {
//   const bookingId = ctx.scene.state.bookingId;
//   // Получаем детали бронирования
//   const bookingInfo = await getBookingDetails(bookingId); // Реализуйте эту функцию

//   const bookingTime = format(new Date(bookingInfo.bookingDateTime), 'dd MMMM yyyy, HH:mm');

//   const appointmentTypeText = bookingInfo.doctor
//     ? `👨‍⚕️ Врач: ${bookingInfo.doctor.fullName}\n`
//     : `🔬 Диагностика: ${bookingInfo.diagnostic.typeName}\n`;

//   const message = `📋 ID бронирования: ${bookingInfo.bookingId}\n` +
//     `${appointmentTypeText}` +
//     `📆 Дата и время: ${bookingTime}\n\n` +
//     `📍 Местоположение: ${bookingInfo.location.name}: ${bookingInfo.location.address}\n\n` +
//     `Спасибо, что выбрали наш сервис! Если у вас есть вопросы или вам нужно перенести встречу, не стесняйтесь обращаться. 📞`;

//   await ctx.reply(message, Markup.inlineKeyboard([
//     [Markup.button.callback('Назад', 'back_to_list')],
//   ]));
// });

// bookingDetailsScene.action('back_to_list', async (ctx) => {
//   await ctx.scene.enter('bookingList');
// });

// // Инициализируем сцену и регистрируем ее
// const stage = new Stage([bookingListScene, bookingDetailsScene]);
// const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// bot.use(session());
// bot.use(stage.middleware());

// // Обработчик команды /start
// bot.start(async (ctx) => {
//   await ctx.scene.enter('bookingList');
// });

// // Обработка ошибок
// bot.catch((err, ctx) => {
//   console.error(`Ошибка в обработке апдейта ${ctx.updateType}`, err);
// });

// // Запуск бота
// bot.launch();
