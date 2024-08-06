import { IsOptional, IsString, Length } from 'class-validator'

export class CreateUserDto {
	@IsOptional()
	@IsString()
	telegramId?: string

	@IsOptional()
	@IsString()
	@Length(1, 128)
	username?: string

	@IsString()
	@Length(1, 128)
	fullName: string

	@IsOptional()
	@IsString()
	@Length(1, 128)
	firstName?: string

	@IsOptional()
	@IsString()
	@Length(1, 128)
	lastName?: string
}

// export class CreateUserDto {
// 	userId: number
// 	telegramId: string
// 	userName?: string
// 	fullName: string
// 	firstName?: String
// 	lastName?: String
// }

// id: 721836748,
// firstName: 'Александр',
// lastName: 'А',
// userName: 'gruzz70tomsk',
// language_code: 'ru',
// allows_write_to_pm: true
