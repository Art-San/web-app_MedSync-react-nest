export class CreateUserDto {
	id: number
	telegramId: string
	firstName?: string
	lastName?: string
	userName: string
	email?: string
	hashedPassword: string
	isActive: boolean
	isAdmin: boolean
	bookings: any
}

// id             Int        @id @default(autoincrement())
// telegramId     String     @unique
// firstNname     String?
// lastName       String?
// userName       String
// email          String?    @unique
// hashedPassword String
// isActive       Boolean    @default(true)
// isAdmin        Boolean    @default(false)
// bookings       Booking[]  @relation("UserBookings")
