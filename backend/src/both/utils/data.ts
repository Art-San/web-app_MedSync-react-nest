import { format } from 'date-fns'

export function getNotificationText(data: any) {
	const bookingTime = format(
		new Date(data.bookingDateTime),
		'dd MMMM yyyy, kk:mm'
	)

	let typeText: string
	if (data?.doctor) {
		typeText = `👨‍⚕️ Доктор: ${data.doctor.fullName}\n`
	} else if (data?.diagnostic) {
		typeText = `🔬 Диагностика: ${data.diagnostic.typeName}\n`
	} else {
		typeText = 'Ошибка данных'
	}
	const message = `📋Запись ID: ${data.bookingId}\n${typeText}📆 Дата & Время: ${bookingTime}\n\n📍 Локация:  ${data.location.name}: ${data.location.address}\n\nСпасибо, что выбрали наш сервис! Если у вас есть какие-либо вопросы или вам нужно перенести встречу, свяжитесь с нами. 📞`
	return message
}

// export function getNotificationText(data: any) {
// 	const bookingTime = format(
// 		new Date(data.bookingDateTime),
// 		'dd MMMM yyyy, kk:mm'
// 	)
// 	const appointmentTypeText = data.doctor
// 		? `👨‍⚕️ Врач: ${data.doctor.fullName}\n`
// 		: `🔬 Процедура: ${data.diagnostic.typeName}\n`
// 	// bookingId
// 	// appointmentTypeText
// 	// bookingTime
// 	// location.name
// 	// location.address
// 	const message = `📋Запись ID: ${data.bookingId}\n${appointmentTypeText}📆 Дата & Время: ${bookingTime}\n\n📍 Локация:  ${data.location.name}: ${data.location.address}\n\nСпасибо, что выбрали наш сервис! Если у вас есть какие-либо вопросы или вам нужно перенести встречу, свяжитесь с нами. 📞`
// 	return message
// }

export const dataBok = [
	{
		bookingId: 1,
		telegramId: '721836748',
		bookingDateTime: '2024-09-18 09:00:00.000 +0700',
		doctor: {
			doctorId: 1,
			fullName: 'Петр петрович',
		},
	},
	{
		bookingId: 2,
		telegramId: '721836748',
		bookingDateTime: '2024-09-18 09:00:00.000 +0700',
		doctor: {
			doctorId: 2,
			fullName: 'Виктор Петрович',
		},
	},
	{
		bookingId: 3,
		telegramId: '721836748',
		bookingDateTime: '2024-09-18 09:00:00.000 +0700',
		doctor: {
			doctorId: 3,
			fullName: 'Вера Петровна',
		},
	},
	{
		bookingId: 4,
		telegramId: '721836748',
		bookingDateTime: '2024-09-18 09:00:00.000 +0700',
		diagnostic: {
			diagnosticId: 1,
			typeName: 'Лазерная',
		},
	},
	{
		bookingId: 5,
		telegramId: '721836748',
		bookingDateTime: '2024-09-18 09:00:00.000 +0700',
		diagnostic: {
			diagnosticId: 2,
			typeName: 'Полоскание',
		},
	},
	{
		bookingId: 6,
		telegramId: '721836748',
		bookingDateTime: '2024-09-18 09:00:00.000 +0700',
		diagnostic: {
			diagnosticId: 3,
			typeName: 'Мвссаж',
		},
	},
]
