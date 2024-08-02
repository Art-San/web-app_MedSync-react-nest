export const tgData = {
  query_id: 'AAHMWgYrAAAAAMxaBitU487i',
  user: {
    id: 721836748,
    first_name: 'Александр',
    last_name: 'А',
    username: 'gruzz70tomsk',
    language_code: 'ru',
    allows_write_to_pm: true
  },
  auth_date: 1722590540,
  hash: '26053fcbe2c018220fcc2febd3463e21fc5fbfc664debdfba4f59d8a9d9a11d6',
  tgWebAppVersion: '7.6',
  tgWebAppPlatform: 'web',
  tgWebAppThemeParams: {
    bg_color: '#212121',
    button_color: '#74b558',
    button_text_color: '#ffffff',
    hint_color: '#aaaaaa',
    link_color: '#74b558',
    secondary_bg_color: '#181818',
    text_color: '#ffffff',
    header_bg_color: '#212121',
    accent_text_color: '#74b558',
    section_bg_color: '#212121',
    section_header_text_color: '#74b558',
    subtitle_text_color: '#aaaaaa',
    destructive_text_color: '#ff595a'
  }
}

// query_id: Уникальный идентификатор запроса, динамический.

// user: Объект с информацией о пользователе, все поля динамические.
// id: Уникальный идентификатор пользователя.
// first_name: Имя пользователя.
// last_name: Фамилия пользователя.
// username: Имя пользователя в Telegram.
// language_code: Код языка пользователя.
// allows_write_to_pm: Флаг, разрешает ли пользователь писать ему в личные сообщения.

// auth_date: Время аутентификации в формате Unix timestamp, динамическое.
// hash: Хэш для проверки подлинности данных, динамический.
// tgWebAppVersion: Версия Telegram Web App, статическая.
// tgWebAppPlatform: Платформа, на которой запущено приложение, статическая.

// tgWebAppThemeParams: Объект с параметрами темы, все поля статические.
// bg_color: Цвет фона.
// button_color: Цвет кнопок.
// button_text_color: Цвет текста на кнопках.
// hint_color: Цвет подсказок.
// link_color: Цвет ссылок.
// secondary_bg_color: Вторичный цвет фона.
// text_color: Цвет текста.
// header_bg_color: Цвет фона заголовка.
// accent_text_color: Цвет акцентного текста.
// section_bg_color: Цвет фона секций.
// section_header_text_color: Цвет текста заголовков секций.
// subtitle_text_color: Цвет подзаголовков.
// destructive_text_color: Цвет текста для деструктивных действий.

// 1. Использование JavaScript API Telegram Web App
// const tg = window.Telegram.WebApp
// // Пример изменения параметров темы
// const newThemeParams = {
//   bg_color: '#000000',
//   button_color: '#ff0000',
//   button_text_color: '#ffffff',
//   hint_color: '#aaaaaa',
//   link_color: '#ff0000',
//   secondary_bg_color: '#333333',
//   text_color: '#ffffff',
//   header_bg_color: '#000000',
//   accent_text_color: '#ff0000',
//   section_bg_color: '#000000',
//   section_header_text_color: '#ff0000',
//   subtitle_text_color: '#aaaaaa',
//   destructive_text_color: '#ff0000'
// }

// tg.setThemeParams(newThemeParams)

// 2. Настройка через Telegram Bot API
// import requests

// token = 'YOUR_BOT_TOKEN'
// url = f"https://api.telegram.org/bot{token}/setWebAppTheme"

// data = {
//     "web_app": {
//         "theme_params": {
//             "bg_color": "#000000",
//             "button_color": "#ff0000",
//             "button_text_color": "#ffffff",
//             "hint_color": "#aaaaaa",
//             "link_color": "#ff0000",
//             "secondary_bg_color": "#333333",
//             "text_color": "#ffffff",
//             "header_bg_color": "#000000",
//             "accent_text_color": "#ff0000",
//             "section_bg_color": "#000000",
//             "section_header_text_color": "#ff0000",
//             "subtitle_text_color": "#aaaaaa",
//             "destructive_text_color": "#ff0000"
//         }
//     }
// }

// response = requests.post(url, json=data)
// print(response.json())
