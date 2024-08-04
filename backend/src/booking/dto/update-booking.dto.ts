import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator'

export class UpdateBookingDto {
	@IsOptional()
	@IsNumber()
	userId?: number

	@IsOptional()
	@IsString()
	userFullName?: string

	@IsOptional()
	@IsString()
	userEmail?: string

	@IsOptional()
	@IsString()
	userPhoneNumber?: string

	@IsOptional()
	@IsString()
	userMessage?: string

	@IsOptional()
	@IsNumber()
	doctorId?: number

	@IsOptional()
	@IsNumber()
	diagnosticId?: number

	@IsOptional()
	@IsNumber()
	locationId?: number

	@IsOptional()
	@IsDate()
	bookingTime?: Date
}
