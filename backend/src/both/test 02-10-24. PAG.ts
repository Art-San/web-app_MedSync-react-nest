// https://www.youtube.com/watch?v=9MJjPVddTKo
// const TelegramBot = require('node-telegram-bot-api')
// const axios = require('axios')
// require('dotenv').config()

// axios.defaults.baseURL = process.env.API_URL
// const token = process.env.TG_TOKEN
// const bot = new TelegramBot(token, { polling: true })

// const getPagination = (current, maxpage, data) => {
// 	let keys = []
// 	if (current == 1) keys.push({ text: `⛔️`, callback_data: 'prev' })
// 	if (current > 1)
// 		keys.push({ text: `⬅️`, callback_data: (current - 1).toString() })
// 	keys.push({
// 		text: `${current}/${maxpage}`,
// 		callback_data: current.toString(),
// 	})
// 	if (current == maxpage) keys.push({ text: `⛔️`, callback_data: 'last' })
// 	if (current < maxpage)
// 		keys.push({ text: `➡️`, callback_data: (current + 1).toString() })

// 	return {
// 		reply_markup: JSON.stringify({
// 			inline_keyboard: [
// 				[{ text: `🔗 Оформить займ`, url: data.cards.data[0].link }],
// 				keys,
// 			],
// 		}),
// 	}
// }

// const messageText = (data) => {
// 	const info = data.cards.data[0]
// 	const message =
// 		`💸ЗАЙМ НА ЛЮБЫЕ НУЖДЫ💸` +
// 		`\n\nДля Всех стран СНГ!🇷🇺🇺🇦🇰🇿 ` +
// 		`\n\n📝Без справок!` +
// 		`\n🙋🏻‍♂️Без поручителей!` +
// 		`\n💰От ${info.amount} ${info.time}.` +
// 		`\n📃Только по паспорту! ` +
// 		`\n🙌🏻 С ЛЮБОЙ кредитной историей!` +
// 		`\n💳Займ прямо на КАРТУ💳` +
// 		`\n\n\n👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻`
// 	return message
// }

// bot.onText(/\/start/, function (msg) {
// 	axios
// 		.get('api/cards')
// 		.then(function (response) {
// 			const { data } = response
// 			const messageEnter = Object.assign(
// 				{},
// 				getPagination(data.cards.from, data.cards.last_page, data),
// 				{ caption: messageText(data) }
// 			)
// 			bot.sendPhoto(msg.chat.id, data.cards.data[0].logo, messageEnter)
// 		})
// 		.catch(function (error) {
// 			console.log(error)
// 		})
// })

// bot.on('callback_query', function (message) {
// 	const msg = message.message

// 	if (message.data == 'prev') {
// 		bot.answerCallbackQuery(message.id, {
// 			text: 'Вы уже на первой странице!',
// 			show_alert: true,
// 		})
// 		return
// 	} else if (message.data == 'last') {
// 		bot.answerCallbackQuery(message.id, {
// 			text: 'Вы уже на последней странице!',
// 			show_alert: true,
// 		})
// 		return
// 	}

// 	axios
// 		.get('api/cards', {
// 			params: {
// 				page: parseInt(message.data),
// 			},
// 		})
// 		.then(function (response) {
// 			const { data } = response
// 			const editOptions = Object.assign(
// 				{},
// 				getPagination(parseInt(message.data), data.cards.last_page, data),
// 				{
// 					chat_id: msg.chat.id,
// 					message_id: msg.message_id,
// 				}
// 			)
// 			bot.editMessageMedia(
// 				{
// 					type: 'photo',
// 					media: data.cards.data[0].logo.toString(),
// 					caption: messageText(data),
// 				},
// 				editOptions
// 			)
// 		})
// 		.catch(function (error) {
// 			console.log(error)
// 		})
// })

// {
//   "cards": {
//     "from": 1,
//     "last_page": 10,
//     "data": [
//       {
//         "amount": "5000 RUB",
//         "time": "на 12 месяцев",
//         "link": "https://example.ru/offer1",
//         "logo": "https://example.ru/logo1.png"
//       },
//       {
//         "amount": "10000 UAH",
//         "time": "на 24 месяца",
//         "link": "https://example.ua/offer2",
//         "logo": "https://example.ua/logo2.png"
//       },
//       {
//         "amount": "200000 KZT",
//         "time": "на 18 месяцев",
//         "link": "https://example.kz/offer3",
//         "logo": "https://example.kz/logo3.png"
//       },
//       {
//         "amount": "15000 RUB",
//         "time": "на 36 месяцев",
//         "link": "https://example.ru/offer4",
//         "logo": "https://example.ru/logo4.png"
//       },
//       {
//         "amount": "5000 UAH",
//         "time": "на 6 месяцев",
//         "link": "https://example.ua/offer5",
//         "logo": "https://example.ua/logo5.png"
//       },
//       {
//         "amount": "300000 KZT",
//         "time": "на 48 месяцев",
//         "link": "https://example.kz/offer6",
//         "logo": "https://example.kz/logo6.png"
//       },
//       {
//         "amount": "25000 RUB",
//         "time": "на 60 месяцев",
//         "link": "https://example.ru/offer7",
//         "logo": "https://example.ru/logo7.png"
//       },
//       {
//         "amount": "20000 UAH",
//         "time": "на 54 месяца",
//         "link": "https://example.ua/offer8",
//         "logo": "https://example.ua/logo8.png"
//       },
//       {
//         "amount": "500000 KZT",
//         "time": "на 72 месяца",
//         "link": "https://example.kz/offer9",
//         "logo": "https://example.kz/logo9.png"
//       },
//       {
//         "amount": "30000 RUB",
//         "time": "на 84 месяца",
//         "link": "https://example.ru/offer10",
//         "logo": "https://example.ru/logo10.png"
//       }
//     ]
//   }
// }

// const TelegramBot = require('node-telegram-bot-api')
// const prisma = require('./prismaClient')
// require('dotenv').config()

// const token = process.env.TG_TOKEN
// const bot = new TelegramBot(token, { polling: true })

// const getPagination = (current, maxpage, data) => {
// 	let keys = []

// 	if (current == 1) keys.push({ text: `⛔️`, callback_data: 'prev' })
// 	if (current > 1)
// 		keys.push({ text: `⬅️`, callback_data: (current - 1).toString() })
// 	keys.push({
// 		text: `${current}/${maxpage}`,
// 		callback_data: current.toString(),
// 	})
// 	if (current == maxpage) keys.push({ text: `⛔️`, callback_data: 'last' })
// 	if (current < maxpage)
// 		keys.push({ text: `➡️`, callback_data: (current + 1).toString() })

// 	return {
// 		reply_markup: JSON.stringify({
// 			inline_keyboard: [
// 				[{ text: `🔗 Оформить займ`, url: data.cards[0].link }],
// 				keys,
// 			],
// 		}),
// 	}
// }

// const messageText = (data) => {
// 	const info = data.cards[0]
// 	const message =
// 		`💸ЗАЙМ НА ЛЮБЫЕ НУЖДЫ💸` +
// 		`\n\nДля Всех стран СНГ!🇷🇺🇺🇦🇰🇿 ` +
// 		`\n\n📝Без справок!` +
// 		`\n🙋🏻‍♂️Без поручителей!` +
// 		`\n💰От ${info.amount} ${info.time}.` +
// 		`\n📃Только по паспорту! ` +
// 		`\n🙌🏻 С ЛЮБОЙ кредитной историей!` +
// 		`\n💳Займ прямо на КАРТУ💳` +
// 		`\n\n\n👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻`
// 	return message
// }

// bot.onText(/\/start/, async function (msg) {
// 	try {
// 		const cards = await prisma.card.findMany({
// 			skip: 0,
// 			take: 5,
// 		})
// 		const data = {
// 			cards,
// 			from: 1,
// 			last_page: Math.ceil((await prisma.card.count()) / 5), // Получение количества страниц
// 		}
// 		const messageEnter = Object.assign(
// 			{},
// 			getPagination(data.from, data.last_page, data),
// 			{ caption: messageText(data) }
// 		)
// 		bot.sendPhoto(msg.chat.id, data.cards[0].logo, messageEnter)
// 	} catch (error) {
// 		console.log(error)
// 	}
// })

// bot.on('callback_query', async function (message) {
// 	const msg = message.message

// 	if (message.data == 'prev') {
// 		bot.answerCallbackQuery(message.id, {
// 			text: 'Вы уже на первой странице!',
// 			show_alert: true,
// 		})
// 		return
// 	} else if (message.data == 'last') {
// 		bot.answerCallbackQuery(message.id, {
// 			text: 'Вы уже на последней странице!',
// 			show_alert: true,
// 		})
// 		return
// 	}

// 	try {
// 		const page = parseInt(message.data)
// 		const cards = await prisma.card.findMany({
// 			skip: (page - 1) * 5,
// 			take: 5,
// 		})
// 		const data = {
// 			cards,
// 			from: page,
// 			last_page: Math.ceil((await prisma.card.count()) / 5), // Получение количества страниц
// 		}
// 		const editOptions = Object.assign(
// 			{},
// 			getPagination(page, data.last_page, data),
// 			{
// 				chat_id: msg.chat.id,
// 				message_id: msg.message_id,
// 			}
// 		)
// 		bot.editMessageMedia(
// 			{
// 				type: 'photo',
// 				media: data.cards[0].logo.toString(),
// 				caption: messageText(data),
// 			},
// 			editOptions
// 		)
// 	} catch (error) {
// 		console.log(error)
// 	}
// })
