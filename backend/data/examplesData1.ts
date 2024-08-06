// Для заполнения базы данных в соответствии с представленной схемой,
// необходимо учитывать зависимости между сущностями. Например,
// Doctor зависит от Location и Specialty, а Booking зависит от User, Doctor,
// Diagnostic и Location.

// Очередность заполнения сущностей в базе данных:

// 1. Specialty
// Эта сущность не имеет внешних ключей и должна быть заполнена первой.
// {Кардиология, Неврология, Гастроэнтерология, Эндокринология, Педиатрия, Ортопедия, Офтальмология, Урология, Гинекология, Отоларингология]
// [kardiologiya, nevrologiya, gastroenterologiya, endokrinologiya, pediatriya, ortopediya, oftalmologiya, urologiya, ginekologiya, otolaringologiya]

// POST /specialties
// Content-Type: application/json
// {
//   "specialtyName": "Кардиология",
//   "slag": "kardiologiya"
// }

// 2. Location
// Эта сущность также не имеет внешних ключей и может быть заполнена на раннем этапе.
// POST /locations
// Content-Type: application/json

// {
//   "name": "Медицинский центр №1",
//   "address": "ул. Медицинская, д. 1"
// }

// 3. User
// Поскольку User не зависит от других сущностей, можно заполнять следующим шагом.

// 4. Doctor
// Для заполнения Doctor необходимы предварительные данные из Location и Specialty.

// 5. Diagnostic
// Для заполнения Diagnostic предварительные данные не требуются.

// 6. WorkingHour
// Для заполнения WorkingHour необходимы предварительные данные из Location.

// 7.DiagnosticLocation
// Для заполнения DiagnosticLocation необходимы предварительные данные из Diagnostic и Location.

// 8. Booking
// Для заполнения Booking необходимы предварительные данные из User, Doctor, Diagnostic и Location.

// 9. DoctorRating
// Для заполнения DoctorRating необходимы предварительные данные из Doctor.

// 10. DiagnosticResult
// Для заполнения DiagnosticResult необходимы предварительные данные из Booking и Diagnostic.
