import { IsNumber, IsString, IsOptional, IsDecimal } from 'class-validator'

export class CreateDoctorDto {
	@IsNumber()
	locationId: number

	@IsString()
	fullName: string

	@IsNumber()
	specialtyId: number

	@IsDecimal()
	price: number

	@IsString()
	photoUrl: string

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
