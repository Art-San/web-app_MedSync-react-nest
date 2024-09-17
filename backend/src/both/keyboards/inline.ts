export const textMainMenu = `Добро пожаловать в приложение MedSync!\n\nС помощью нашего веб-приложения вы можете записаться на прием к врачу или пройти обследование в одной из наших клиник.`

export function mainMenuInlineKeyboard(domain: string) {
	const keyboard = [
		[{ text: 'Главная страница', web_app: { url: domain } }],
		[
			{
				text: '📅 Записаться на прием',
				web_app: { url: domain + '/see_a_doctor' },
			},
		],
		[
			{
				text: '📝 Пройти обследование',
				web_app: { url: domain + '/get_tested' },
			},
		],
		[{ text: '📋 Мои бронирования', callback_data: 'my_bookings' }],
		[{ text: '📝 Результаты', callback_data: 'my_results' }],
	]

	return {
		reply_markup: {
			inline_keyboard: [
				keyboard[0],
				[keyboard[1][0], keyboard[2][0]],
				[keyboard[3][0], keyboard[4][0]],
			],
		},
	}
}

export function mainMenuInlineKeyboard1(webAppUrl: string) {
	return {
		reply_markup: {
			inline_keyboard: [
				[{ text: 'Main Page', web_app: { url: webAppUrl } }],
				[
					{
						text: '📅 Book an appointment',
						web_app: { url: webAppUrl + '/see_a_doctor' },
					},
					{
						text: '📝 Get tested',
						web_app: { url: webAppUrl + '/get_tested' },
					},
				],
				[
					{ text: '📋 My bookings', callback_data: 'my_bookings' },
					{ text: '📝 Get tested', callback_data: 'my_results' },
				],
			],
		},
	}
}

// const TelegramBot = require('node-telegram-bot-api');
// const { mainMenu } = require('./path_to_your_mainMenu_file'); // укажите правильный путь к файлу mainMenu

// const token = process.env.TELEGRAM_BOT_TOKEN; // Замените на ваш токен
// const bot = new TelegramBot(token, { polling: true });

// bot.onText(/\/start/, (msg) => {
//   const chatId = msg.chat.id;
//   const domain = 'https://yourdomain.com'; // Замените на ваш домен

//   bot.sendMessage(chatId, 'Welcome! Please choose an option:', {
//     reply_markup: mainMenu(domain)
//   });
// });
