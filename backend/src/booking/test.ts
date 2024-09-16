// model Slot {
//   slotId       Int      @id @default(autoincrement())
//   doctorId     Int?     // Слот может быть привязан к доктору
//   diagnosticId Int?     // Или к диагностике
//   locationId   Int      // И обязательно привязан к локации
//   startTime    DateTime // Время начала слота в формате ISO 8601
//   endTime      DateTime? // Время окончания слота в формате ISO 8601
//   dayNumber    Int?
//   monthNumber  Int      // Номер месяца (1-12) для фильтрации
//   isBooked     Boolean  @default(false) // Флаг занятости слота
//   createdAt    DateTime @default(now())
//   updatedAt    DateTime @updatedAt
//   bookingId    Int?     // Поле для связи со слотом

//   doctor       Doctor?     @relation(fields: [doctorId], references: [doctorId])
//   diagnostic   Diagnostic? @relation(fields: [diagnosticId], references: [diagnosticId])
//   location     Location    @relation(fields: [locationId], references: [locationId])
//   booking      Booking?    @relation(fields: [bookingId], references: [bookingId]) // Связь с бронированием

//   @@map("slots")
// }

// model Booking {
//   bookingId        Int      @id @default(autoincrement())
//   userId           Int?
//   telegramId       String?
//   userName         String
//   userSurname      String
//   userPhoneNumber  String
//   userEmail        String?
//   userMessage      String?
//   bookingDateTime  DateTime @db.Timestamptz
//   doctorId         Int?
//   diagnosticId     Int?
//   locationId       Int
//   slotId           Int?     @unique
//   status           BookingStatus // Используем enum для статусов
//   createdAt        DateTime @default(now())
//   updatedAt        DateTime @updatedAt
//   deletedAt        DateTime?

//   user             User?     @relation(fields: [userId], references: [userId])
//   doctor           Doctor?   @relation(fields: [doctorId], references: [doctorId])
//   diagnostic       Diagnostic? @relation(fields: [diagnosticId], references: [diagnosticId])
//   location         Location  @relation(fields: [locationId], references: [locationId])
//   slot             Slot?    @relation(fields: [slotId], references: [slotId])
//   results          DiagnosticResult[]

//   @@unique([doctorId, locationId, bookingDateTime], name: "unique_doctor_location_time")
//   @@unique([diagnosticId, locationId, bookingDateTime], name: "unique_diagnostic_location_time")

//   @@map("bookings")
// }

// enum BookingStatus {
//   PENDING
//   CONFIRMED
//   CANCELLED
// }
