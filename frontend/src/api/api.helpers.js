// export const errorCatch = (error) =>
//   error.response && error.response.data
//     ? typeof error.response.data.message === 'object'
//       ? error.response.data.message[0]
//       : error.response.data.message
//     : error.message

const tg = window.Telegram.WebApp
console.log(
  1,
  'getContentType',
  tg.initData
    ? 'Есть данные Telegram.WebApp'
    : 'нет данных Telegram.WebApp, работаем из ENV'
)

export const getContentType = () => ({
  'ngrok-skip-browser-warning': '69420', // для ngrok не было предупреждения
  'Content-Type': 'application/json',
  initdata: tg.initData ? tg.initData : import.meta.env.VITE_TG_INIT_DATA
})
