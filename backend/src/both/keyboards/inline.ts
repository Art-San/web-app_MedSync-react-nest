// const { InlineKeyboardButton, InlineKeyboardMarkup } = require('node-telegram-bot-api');

// /**
//  * Creates the main menu inline keyboard with web app buttons and callback data buttons.
//  * @param {string} domain - The domain URL for the web apps.
//  * @returns {InlineKeyboardMarkup} - The inline keyboard markup.
//  */
// function mainMenu(domain) {
//   const keyboard = [
//     [new InlineKeyboardButton({ text: "Main Page", web_app: { url: domain } })],
//     [new InlineKeyboardButton({ text: "📅 Book an appointment", web_app: { url: `${domain}/see_a_doctor` } })],
//     [new InlineKeyboardButton({ text: "📝 Get tested", web_app: { url: `${domain}/get_tested` } })],
//     [new InlineKeyboardButton({ text: "📋 My bookings", callback_data: "my_bookings" })],
//     [new InlineKeyboardButton({ text: "📋 My Results", callback_data: "my_results" })]
//   ];

//   return {
//     inline_keyboard: [
//       keyboard[0],
//       [keyboard[1][0], keyboard[2][0]],
//       [keyboard[3][0], keyboard[4][0]]
//     ]
//   };
// }

// module.exports = {
//   mainMenu
// };
