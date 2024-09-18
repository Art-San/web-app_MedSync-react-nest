// const TelegramBot = require('node-telegram-bot-api')
// const { createFSM } = require('node-telegram-bot-fsm')
// const { format } = require('date-fns')

// class TelegramService {
// 	constructor(token, requestsRepo) {
// 		this.bot = new TelegramBot(token, { polling: true })
// 		this.requestsRepo = requestsRepo

// 		this.fsm = createFSM(this.bot)

// 		this.setupHandlers()
// 	}

// 	setupHandlers() {
// 		this.bot.onText(/\/start/, (msg) => this.startHandler(msg))
// 		this.bot.on('callback_query', (callbackQuery) =>
// 			this.callbackQueryHandler(callbackQuery)
// 		)
// 	}

// 	async startHandler(msg) {
// 		const chatId = msg.chat.id
// 		await this.bot.sendMessage(chatId, 'Welcome! Please choose an option:', {
// 			reply_markup: {
// 				inline_keyboard: [
// 					[{ text: '📋 My bookings', callback_data: 'my_bookings' }],
// 					[{ text: '📋 My Results', callback_data: 'my_results' }],
// 				],
// 			},
// 		})
// 	}

// 	async callbackQueryHandler(callbackQuery) {
// 		const chatId = callbackQuery.message.chat.id
// 		const data = callbackQuery.data

// 		if (data === 'my_bookings') {
// 			await this.showBookings(chatId)
// 		} else if (data.startsWith('show_booking_')) {
// 			const bookingId = data.split('_')[2]
// 			await this.showBookingDetails(chatId, bookingId)
// 		}
// 	}

// 	async showBookings(chatId) {
// 		const bookings = await this.requestsRepo.getUserBookings(chatId)

// 		const buttons = bookings.map((booking) => {
// 			const description = booking.Doctor
// 				? `👨‍⚕️ ${format(booking.Booking.booking_time, 'dd MMM')} - ${booking.Doctor.full_name}`
// 				: `🔬 ${format(booking.Booking.booking_time, 'dd MMM')} - ${booking.Diagnostic.type_name}`
// 			return [
// 				{
// 					text: description,
// 					callback_data: `show_booking_${booking.Booking.booking_id}`,
// 				},
// 			]
// 		})

// 		await this.bot.sendMessage(
// 			chatId,
// 			'Here is your booking list. Select one to see details:',
// 			{
// 				reply_markup: {
// 					inline_keyboard: buttons,
// 				},
// 			}
// 		)
// 	}

// 	async showBookingDetails(chatId, bookingId) {
// 		const bookingInfo = await this.requestsRepo.getBooking(bookingId)

// 		const bookingTime = format(
// 			new Date(bookingInfo.Booking.booking_time),
// 			'dd MMM yyyy, HH:mm UTC'
// 		)
// 		const appointmentTypeText = bookingInfo.Doctor
// 			? `👨‍⚕️ Doctor: ${bookingInfo.Doctor.full_name}\n`
// 			: `🔬 Diagnostic: ${bookingInfo.Diagnostic.type_name}\n`

// 		const message = `📋 Booking ID: ${bookingInfo.Booking.booking_id}\n${appointmentTypeText}📆 Date & Time: ${bookingTime}\n\n📍 Location: ${bookingInfo.Location.name}: ${bookingInfo.Location.address}\n\nThank you for choosing our service! If you have any questions or need to reschedule, feel free to reach out. 📞`

// 		await this.bot.sendMessage(chatId, message, {
// 			reply_markup: {
// 				inline_keyboard: [[{ text: 'Back', callback_data: 'my_bookings' }]],
// 			},
// 		})
// 	}
// }

// module.exports = TelegramService

// class RequestsRepo {
// 	constructor(database) {
// 		this.database = database
// 	}

// 	async getUserBookings(userId) {
// 		// Implement the logic to get user bookings from the database
// 		return this.database.query('SELECT * FROM bookings WHERE user_id = $1', [
// 			userId,
// 		])
// 	}

// 	async getBooking(bookingId) {
// 		// Implement the logic to get a specific booking from the database
// 		return this.database.query('SELECT * FROM bookings WHERE booking_id = $1', [
// 			bookingId,
// 		])
// 	}
// }

// module.exports = RequestsRepo

// const { Pool } = require('pg')
// const TelegramService = require('./TelegramService')
// const RequestsRepo = require('./RequestsRepo')

// const pool = new Pool({
// 	user: 'your_database_user',
// 	host: 'your_database_host',
// 	database: 'your_database_name',
// 	password: 'your_database_password',
// 	port: 5432,
// })

// const requestsRepo = new RequestsRepo(pool)
// const telegramService = new TelegramService(
// 	process.env.TELEGRAM_BOT_TOKEN,
// 	requestsRepo
// )

// // Start the bot
// telegramService.bot.startPolling()
