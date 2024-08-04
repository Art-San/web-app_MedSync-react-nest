import { IsString, IsOptional, IsDecimal } from 'class-validator'

export class UpdateDiagnosticDto {
	@IsOptional()
	@IsString()
	typeName?: string

	@IsOptional()
	@IsString()
	description?: string

	@IsOptional()
	@IsDecimal()
	price?: number

	@IsOptional()
	@IsString()
	photoUrl?: string
}
