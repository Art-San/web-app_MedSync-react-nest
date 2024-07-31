// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }

// generator client {
//   provider = "prisma-client-js"
// }

// model User {
//   id            Int       @id @default(autoincrement())
//   fullName      String
//   email         String    @unique
//   hashedPassword String
//   isActive      Boolean   @default(true)
//   bookings      Booking[] @relation("UserBookings")
// }

// model Doctor {
//   id             Int       @id @default(autoincrement())
//   fullName       String
//   specialization String
//   bookings       Booking[] @relation("DoctorBookings")
// }

// model Booking {
//   id          Int        @id @default(autoincrement())
//   bookingTime DateTime
//   userId      Int
//   doctorId    Int
//   diagnosticId Int?       // This field is optional since a booking may not always have a diagnostic
//   user        User       @relation(fields: [userId], references: [id], name: "UserBookings")
//   doctor      Doctor     @relation(fields: [doctorId], references: [id], name: "DoctorBookings")
//   diagnostic  Diagnostic? @relation(fields: [diagnosticId], references: [id])
// }

// model Diagnostic {
//   id        Int      @id @default(autoincrement())
//   typeName  String
//   bookings  Booking[] @relation("DiagnosticBookings")
// }

// model Location {
//   id        Int      @id @default(autoincrement())
//   name      String
//   address   String
//   slots     Slot[]
// }

// model Slot {
//   id        Int      @id @default(autoincrement())
//   startTime DateTime
//   endTime   DateTime
//   locationId Int
//   location  Location @relation(fields: [locationId], references: [id])
// }
