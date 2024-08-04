import { IsString, IsDecimal } from 'class-validator'

export class CreateDiagnosticDto {
	@IsString()
	typeName: string

	@IsString()
	description: string

	@IsDecimal()
	price: number

	@IsString()
	photoUrl: string
}
