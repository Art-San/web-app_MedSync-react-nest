import {
	IsNumber,
	IsString,
	IsOptional,
	IsDate,
	IsNotEmpty,
} from 'class-validator'
import { Type } from 'class-transformer'
export class CreateBookingDto {
	@IsOptional()
	@IsNumber()
	userId?: number

	@IsString()
	telegramId?: string

	@IsString()
	userName: string

	@IsString()
	userSurname: string

	@IsString()
	userPhoneNumber: string

	@IsString()
	userEmail?: string

	@IsOptional()
	@IsString()
	userMessage?: string

	@IsNotEmpty()
	@IsDate()
	@Type(() => Date)
	bookingDateTime: Date

	@IsOptional()
	@IsNumber()
	doctorId?: number

	@IsOptional()
	@IsNumber()
	diagnosticId?: number

	@IsNumber()
	locationId: number

	@IsOptional()
	@IsNumber()
	slotId?: number

	@IsOptional()
	@IsString()
	status?: string

	@IsOptional()
	@IsString()
	userInitData?: string
}

// @IsNotEmpty()
// @IsDate()
// @Type(() => Date)
// bookingDateTime: Date;
