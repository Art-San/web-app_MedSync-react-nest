-- CreateTable
CREATE TABLE "doctors" (
    "doctorId" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "specialtyId" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "experience" TEXT,
    "certificates" TEXT,
    "services" TEXT,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("doctorId")
);

-- CreateTable
CREATE TABLE "specialties" (
    "specialtyId" SERIAL NOT NULL,
    "specialtyName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "specialties_pkey" PRIMARY KEY ("specialtyId")
);

-- CreateTable
CREATE TABLE "doctor_ratings" (
    "ratingId" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "doctor_ratings_pkey" PRIMARY KEY ("ratingId")
);

-- CreateTable
CREATE TABLE "diagnostics" (
    "diagnosticId" SERIAL NOT NULL,
    "typeName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "photoUrl" TEXT NOT NULL,

    CONSTRAINT "diagnostics_pkey" PRIMARY KEY ("diagnosticId")
);

-- CreateTable
CREATE TABLE "diagnostic_locations" (
    "diagnosticLocationId" SERIAL NOT NULL,
    "diagnosticId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "diagnostic_locations_pkey" PRIMARY KEY ("diagnosticLocationId")
);

-- CreateTable
CREATE TABLE "diagnostic_results" (
    "diagnosticResultId" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "diagnosticId" INTEGER NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,

    CONSTRAINT "diagnostic_results_pkey" PRIMARY KEY ("diagnosticResultId")
);

-- CreateTable
CREATE TABLE "locations" (
    "locationId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("locationId")
);

-- CreateTable
CREATE TABLE "working_hours" (
    "workingHourId" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "weekdayIndex" INTEGER NOT NULL,

    CONSTRAINT "working_hours_pkey" PRIMARY KEY ("workingHourId")
);

-- CreateTable
CREATE TABLE "slots" (
    "slotId" SERIAL NOT NULL,
    "doctorId" INTEGER,
    "diagnosticId" INTEGER,
    "locationId" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "monthNumber" INTEGER NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slots_pkey" PRIMARY KEY ("slotId")
);

-- CreateTable
CREATE TABLE "bookings" (
    "bookingId" SERIAL NOT NULL,
    "userId" INTEGER,
    "userFullName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPhoneNumber" TEXT NOT NULL,
    "userMessage" TEXT,
    "doctorId" INTEGER,
    "diagnosticId" INTEGER,
    "locationId" INTEGER NOT NULL,
    "slotId" INTEGER,
    "bookingTime" TIMESTAMPTZ NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("bookingId")
);

-- CreateTable
CREATE TABLE "users" (
    "userId" SERIAL NOT NULL,
    "telegramId" TEXT,
    "username" TEXT,
    "fullName" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "bookings_slotId_key" ON "bookings"("slotId");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_doctorId_locationId_bookingTime_key" ON "bookings"("doctorId", "locationId", "bookingTime");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_diagnosticId_locationId_bookingTime_key" ON "bookings"("diagnosticId", "locationId", "bookingTime");

-- CreateIndex
CREATE UNIQUE INDEX "users_telegramId_key" ON "users"("telegramId");

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("locationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialties"("specialtyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_ratings" ADD CONSTRAINT "doctor_ratings_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("doctorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_locations" ADD CONSTRAINT "diagnostic_locations_diagnosticId_fkey" FOREIGN KEY ("diagnosticId") REFERENCES "diagnostics"("diagnosticId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_locations" ADD CONSTRAINT "diagnostic_locations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("locationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_results" ADD CONSTRAINT "diagnostic_results_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("bookingId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_results" ADD CONSTRAINT "diagnostic_results_diagnosticId_fkey" FOREIGN KEY ("diagnosticId") REFERENCES "diagnostics"("diagnosticId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "working_hours" ADD CONSTRAINT "working_hours_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("locationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("doctorId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_diagnosticId_fkey" FOREIGN KEY ("diagnosticId") REFERENCES "diagnostics"("diagnosticId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("locationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("doctorId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_diagnosticId_fkey" FOREIGN KEY ("diagnosticId") REFERENCES "diagnostics"("diagnosticId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("locationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "slots"("slotId") ON DELETE SET NULL ON UPDATE CASCADE;
