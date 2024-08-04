import { IsNumber, IsString, IsOptional, IsDecimal } from 'class-validator'

export class UpdateDoctorDto {
	@IsOptional()
	@IsNumber()
	locationId?: number

	@IsOptional()
	@IsString()
	fullName?: string

	@IsOptional()
	@IsNumber()
	specialtyId?: number

	@IsOptional()
	@IsDecimal()
	price?: number

	@IsOptional()
	@IsString()
	photoUrl?: string

	@IsOptional()
	@IsString()
	experience?: string

	@IsOptional()
	@IsString()
	certificates?: string

	@IsOptional()
	@IsString()
	services?: string
}
