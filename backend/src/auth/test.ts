// const TELEGRAM_BOT_TOKEN = '110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw'; // https://core.telegram.org/bots#creating-a-new-bot

// export const verifyTelegramWebAppData = async (telegramInitData: string): boolean => {
//   // Данные представляют собой строку запроса, состоящую из серии пар поле-значение.
//   const encoded = decodeURIComponent(telegramInitData);

//   // HMAC-SHA-256 signature of the bot's token with the constant string WebAppData used as a key.
//   const secret = crypto
//     .createHmac('sha256', 'WebAppData')
//     .update(TELEGRAM_BOT_TOKEN);

//   // Data-check-string is a chain of all received fields'.
//   const arr = encoded.split('&');
//   const hashIndex = arr.findIndex(str => str.startsWith('hash='));
//   const hash = arr.splice(hashIndex)[0].split('=')[1];
//   // sorted alphabetically
//   arr.sort((a, b) => a.localeCompare(b));
//   // in the format key=<value> with a line feed character ('\n', 0x0A) used as separator
//   // e.g., 'auth_date=<auth_date>\nquery_id=<query_id>\nuser=<user>
//   const dataCheckString = arr.join('\n');

//   // The hexadecimal representation of the HMAC-SHA-256 signature of the data-check-string with the secret key
//   const _hash = crypto
//     .createHmac('sha256', secret.digest())
//     .update(dataCheckString)
//     .digest('hex');

//   // if hash are equal the data may be used on your server.
//   // Complex data types are represented as JSON-serialized objects.
//   return _hash === hash;
// };

// import crypto from "crypto";

// function auth ( apiToken, telegramInitData ) {
//     const initData = new URLSearchParams( telegramInitData );

//     initData.sort();

//     const hash = initData.get( "hash" );
//     initData.delete( "hash" );

//     const dataToCheck = [...initData.entries()].map( ( [key, value] ) => key + "=" + value ).join( "\n" );

//     const secretKey = crypto.createHmac( "sha256", "WebAppData" ).update( apiToken ).digest();

//     const _hash = crypto.createHmac( "sha256", secretKey ).update( dataToCheck ).digest( "hex" );

//     return hash === _hash;
// }

// const crypto = require('crypto');

// // Пример данных
// const initData = {
//   query_id: "AAHMWgYrAAAAAMxaBitU487i",
//   user: {
//     id: 721836748,
//     first_name: "Александр",
//     last_name: "А",
//     username: "gruzz70tomsk",
//     language_code: "ru",
//     allows_write_to_pm: true
//   },
//   auth_date: 1722590540,
//   hash: "26053fcbe2c018220fcc2febd3463e21fc5fbfc664debdfba4f59d8a9d9a11d6"
// };

// const botToken = 'YOUR_BOT_TOKEN';

// // Создание строки user JSON
// const userStr = JSON.stringify(initData.user);

// // Создание массива из ключей и значений, кроме hash
// const data = {
//   query_id: initData.query_id,
//   user: userStr,
//   auth_date: initData.auth_date
// };

// // Сортировка ключей
// const sortedKeys = Object.keys(data).sort();

// // Создание строки из ключей и значений
// const dataCheckString = sortedKeys.map(key => `${key}=${data[key]}`).join('\n');

// // Вычисление хэша
// const secretKey = crypto.createHash('sha256').update(botToken).digest();
// const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

// console.log(`Calculated HMAC: ${hmac}`);
// console.log(`Provided Hash: ${initData.hash}`);
// console.log(`Is valid: ${hmac === initData.hash}`);
