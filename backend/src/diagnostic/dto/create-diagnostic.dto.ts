import { IsString, IsDecimal, MaxLength, Length } from 'class-validator'

export class CreateDiagnosticDto {
	@IsString()
	@Length(1, 128, {
		message: '$property: Превышено допустимое число символов $constraint2',
	})
	typeName: string

	@IsString()
	@MaxLength(128, {
		message: '$property: Превышено допустимое число символов $constraint1',
	})
	slug: string

	@IsString()
	@Length(1, 256, {
		message: '$property:  Превышено допустимое число символов $constraint2',
	})
	description: string

	@IsDecimal()
	price: number

	@IsString()
	photoUrl: string
}
