import { IsOptional, IsString, Length } from 'class-validator'

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	@Length(1, 128)
	username?: string

	@IsOptional()
	@IsString()
	@Length(1, 128)
	firstName?: String

	@IsOptional()
	@IsString()
	@Length(1, 128)
	lastName?: String
}

// id: 721836748,
// firstName: 'Александр',
// lastName: 'А',
// userName: 'gruzz70tomsk',
// language_code: 'ru',
// allows_write_to_pm: true
