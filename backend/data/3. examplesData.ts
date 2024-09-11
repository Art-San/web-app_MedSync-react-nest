// Очередность добавления данных в базу данных
// 1. Location: Сначала добавляются локации, поскольку они являются основой для других сущностей.
// {
//   "locationId": 1,
//   "name": "Central Clinic",
//   "address": "123 Main St, City"
// }

// 2. Specialty: Добавление специализаций докторов.
// [Кардиолог, Невролог, Гастроэнтеролог, Эндокринолог, Педиатр, Ортопед, Офтальмолог, Уролог, Гинеколог, Отоларинголог]
// [kardiolog, nevrolog, gastroenterolog, endokrinolog, pediatr, ortoped, oftalmolog, urolog, ginekolog, otolaringolog]
// {
//   "specialtyId": 1,
//   "specialtyName": "Cardiology",
//   "slug": "cardiology"
// }

// 3. Doctor: Добавление докторов, которые связываются с локациями и специализациями.
// {
//   "doctorId": 1,
//   "locationId": 1,
//   "fullName": "Dr. John Smith",
//   "specialtyId": 1,
//   "price": 150.00,
//   "photoUrl": "https://example.com/photos/dr_john_smith.jpg",
//   "experience": "10 years",
//   "certificates": "Board Certified in Cardiology",
//   "services": "Consultation, ECG, Stress Test"
// }

// 4. WorkingHour: Добавление рабочих часов для каждой локации.
// {
//   "workingHourId": 1,
//   "locationId": 1,
//   "startTime": "08",
//   "endTime": "17",
//   "weekdayIndex": 1
// }

// 5. Slot: Добавление временных слотов, которые привязываются к докторам или диагностическим типам и локациям.
// {
//   "doctorId": 1,
//   "locationId": 1,
//   "startTime": "15",
//   "endTime": "16",
//   "dayNumber": 16,
//   "monthNumber": 8,
//   "isBooked": false
// }

// 6. Diagnostic: Добавление диагностических типов, которые могут быть привязаны к локациям.
// {

//   "typeName": "MRI",
//   "description": "Magnetic Resonance Imaging",
//   "price": 300.00,
//   "photoUrl": "https://example.com/images/mri.jpg"
// }

// 7. Booking: Добавление бронирований, которые связываются с пользователями и слотами.
// {
//   "bookingId": 1,
//   "userId": 1,
//   "userFullName": "Jane Doe",
//   "userEmail": "jane.doe@example.com",
//   "userPhoneNumber": "+1234567890",
//   "slotId": 1,
//   "status": "confirmed"
// }

// 8. User: Добавление пользователей, которые могут бронировать слоты.
// {
//   "userId": 1,
//   "telegramId": "123456789",
//   "username": "janedoe",
//   "fullName": "Jane Doe",
//   "firstName": "Jane",
//   "lastName": "Doe"
// }

// 9. DiagnosticLocation: Добавление связей между диагностикой и локацией (если требуется).
// {
//   "diagnosticLocationId": 1,
//   "diagnosticId": 1,
//   "locationId": 1
// }

// diagnostic-locations
