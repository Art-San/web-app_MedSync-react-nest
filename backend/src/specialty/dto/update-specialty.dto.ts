import { IsOptional, IsString, Length } from 'class-validator'

export class UpdateSpecialtyDto {
	@IsOptional()
	@IsString()
	@Length(1, 128)
	specialtyName?: string
}
