import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator'

export class CreateBookingDto {
	@IsOptional()
	@IsNumber()
	userId?: number

	@IsString()
	userFullName: string

	@IsString()
	userEmail: string

	@IsString()
	userPhoneNumber: string

	@IsOptional()
	@IsString()
	userMessage?: string

	@IsOptional()
	@IsNumber()
	doctorId?: number

	@IsOptional()
	@IsNumber()
	diagnosticId?: number

	@IsNumber()
	locationId: number

	@IsDate()
	bookingTime: Date
}
