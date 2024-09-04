import { IsString, IsNumber, IsOptional } from 'class-validator'

export class CreateBookingDto {
	@IsNumber()
	doctor_id: number

	@IsNumber()
	diagnostic_id: number

	@IsString()
	booking_date_time: string

	@IsNumber()
	location_id: number

	@IsString()
	user_name: string

	@IsString()
	user_surname: string

	@IsString()
	user_phone: string

	@IsString()
	user_email: string

	@IsString()
	@IsOptional()
	user_message?: string

	@IsString()
	@IsOptional()
	userInitData?: string
}
