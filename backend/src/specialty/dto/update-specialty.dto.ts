import { IsOptional, IsString, Length } from 'class-validator'

export class UpdateSpecialtyDto {
	id: number

	@IsOptional()
	@IsString()
	@Length(1, 128)
	specialtyName?: string

	@IsOptional()
	@IsString()
	@Length(1, 128)
	slug?: string
}
