import { IsString, Length } from 'class-validator'

export class CreateSpecialtyDto {
	@IsString()
	@Length(1, 128)
	specialtyName: string

	@IsString()
	@Length(1, 128)
	slug: string
}
