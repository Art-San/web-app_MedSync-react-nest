// 721836748  === 7719
// 5016904767 === 3955
// 6162144186 === 5871
// 5187039739 === Грузоперевозки Томск Т.22-14-40
// 2133856680 === Александр Кобзарь
// 466220524  === @dim_bossik
// gruzz70tomsk
const ctxBotMsg = {
	message_id: 1935,
	from: {
		id: 721836748,
		is_bot: false,
		first_name: 'Александр',
		last_name: 'А',
		username: 'gruzz70tomsk',
		language_code: 'ru',
	},
	chat: {
		id: 721836748,
		first_name: 'Александр',
		last_name: 'А',
		username: 'gruzz70tomsk',
		type: 'private',
	},
	date: 1712637266,
	text: 'Привет бот',
}

//gruzz70tomsk 'Test-группа'
const ctxGroup = {
	message_id: 58,
	from: {
		id: 721836748,
		is_bot: false,
		first_name: 'Александр',
		last_name: 'А',
		username: 'gruzz70tomsk',
		language_code: 'ru',
	},
	chat: { id: -1002006218008, title: 'Test-группа', type: 'supergroup' },
	date: 1712637197,
	text: 'Привет',
}

const ctxBotCommand = {
	message_id: 1936,
	from: {
		id: 5016904767,
		is_bot: false,
		first_name: 'Александр',
		last_name: 'Арт',
		language_code: 'ru',
	},
	chat: {
		id: 5016904767,
		first_name: 'Александр',
		last_name: 'Арт',
		type: 'private',
	},
	date: 1712638495,
	text: '/start',
	entities: [{ offset: 0, length: 6, type: 'bot_command' }],
}
