// Очередность добавления данных в базу данных
// 1. Location: Сначала добавляются локации, поскольку они являются основой для других сущностей.
// {
//   "locationId": 1,
//   "name": "Central Clinic",
//   "address": "123 Main St, City"
// }

// 2. Specialty: Добавление специализаций докторов.
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

// 4. Diagnostic: Добавление диагностических типов, которые могут быть привязаны к локациям.
// {
//   "diagnosticId": 1,
//   "typeName": "MRI",
//   "description": "Magnetic Resonance Imaging",
//   "price": 300.00,
//   "photoUrl": "https://example.com/images/mri.jpg"
// }

// 5. WorkingHour: Добавление рабочих часов для каждой локации.
// {
//   "workingHourId": 1,
//   "locationId": 1,
//   "startTime": "08:00",
//   "endTime": "17:00",
//   "weekdayIndex": 1
// }

// 6. Slot: Добавление временных слотов, которые привязываются к докторам или диагностическим типам и локациям.
// {
//   "slotId": 1,
//   "doctorId": 1,
//   "locationId": 1,
//   "startTime": "2024-08-15T09:00:00Z",
//   "endTime": "2024-08-15T09:30:00Z",
//   "monthNumber": 8,
//   "isBooked": false
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
