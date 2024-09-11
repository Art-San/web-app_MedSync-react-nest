// Для заполнения базы данных согласно предоставленной схеме,
// порядок должен учитывать зависимости между таблицами.
// Начнем с таблиц, которые не зависят от других, и перейдем к тем,
// что имеют внешние ключи. Вот предложенный порядок:

// Specialty
// Location
// Doctor
// Diagnostic
// WorkingHour
// User
// DiagnosticLocation
// Booking
// DiagnosticResult

//=================================
// 1. Specialty
// POST /specialties
// Content-Type: application/json

// {
//   "specialtyName": "Хирургия"
// }

//=================================
// 2. Location
// POST /locations
// Content-Type: application/json

// {
//   "name": "Медицинский центр №1",
//   "address": "ул. Медицинская, д. 1"
// }

//=================================
// 3. Doctor
// POST /doctors
// Content-Type: application/json

// {
//   "fullName": "Анна Андреева",
//   "specialtyId": 1,
//   "locationId": 1,
//   "photoUrl": "https://example.com/photo.jpg",
//   "experience": "10 лет",
//   "certificates": "Сертификат 1",
//   "services": "Услуга 1",
//   "price": "1500.00"
// }

//=================================
// 4. Diagnostic
// POST /diagnostics
// Content-Type: application/json

// {
//   "typeName": "Анализ крови",
//   "description": "Анализ крови на наличие инфекций",
//   "price": "500.00",
//   "photoUrl": "https://example.com/diagnostic1.jpg"
// }

//=================================
// 5. WorkingHour
// POST /working-hours
// Content-Type: application/json

// {
//   "locationId": 1,
//   "startTime": 480,
//   "endTime": 1080,
//   "weekdayIndex": 1
// }

//=================================
// 6. User
// POST /users
// Content-Type: application/json

// {
//   "telegramId": "ivanov_bot",
//   "username": "ivanov",
//   "fullName": "Иван Иванов",
//   "firstName": "Иван",
//   "lastName": "Иванов"
// }

//=================================
// 7. DiagnosticLocation
// POST /diagnostic-locations
// Content-Type: application/json

// {
//   "diagnosticId": 1,
//   "locationId": 1
// }

//=================================
// 8. Booking
// POST /bookings
// Content-Type: application/json

// {
//   "userId": 1,
//   "userFullName": "Иван Иванов",
//   "userEmail": "ivanov@example.com",
//   "userPhoneNumber": "+79123456789",
//   "doctorId": 1,
//   "diagnosticId": 1,
//   "locationId": 1,
//   "bookingTime": "2023-04-05T14:00:00:00Z"
// }

//=================================
// 9. DiagnosticResult
// POST /diagnostic-results
// Content-Type: application/json

// {
//   "bookingId": 1,
//   "diagnosticId": 1,
//   "filePath": "result1.pdf",
//   "fileId": "file1"
// }

// Эти примеры предполагают, что у вас есть REST API с эндпоинтами,
// соответствующими названиям моделей, и что вы используете метод POST
// для создания новых записей. Вам нужно будет адаптировать
// URL и методы запросов в соответствии с вашей реализацией API.
// Также, для полей, связанных с другими таблицами (например,
// specialtyId, locationId, diagnosticId), вам нужно будет использовать
// существующие ID из предыдущих запросов или заранее известные значения.
// В приведенных выше примерах предполагается, что такие ID уже известны
// или получены из предыдущих ответов сервера.

// Кроме того, для поля bookingTime в Booking, я использовал формат ISO 8601
// для даты и времени (YYYY-MM-DDTHH:mm:ssZ), который является стандартным
// форматом для дат и времени в JSON. Вам нужно будет заменить
// "2023-04-05T14:00:00Z" на реальную дату и время бронирования.

// Эти примеры предполагают, что у вас есть RESTful API,
// которое принимает данные в таком формате. Если ваше API
// использует другие методы или требует дополнительных заголовков
// (например, токен аутентификации), вам нужно будет добавить
// их соответственно.
