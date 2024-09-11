import { IsString, IsOptional, IsDecimal, Length } from 'class-validator'

export class UpdateDiagnosticDto {
	@IsOptional()
	@IsString()
	@Length(1, 128)
	typeName?: string

	@IsOptional()
	@IsString()
	@Length(1, 128)
	slug: string

	@IsOptional()
	@IsString()
	@Length(1, 256)
	description?: string

	@IsOptional()
	@IsDecimal()
	price?: number

	@IsOptional()
	@IsString()
	@Length(1, 128)
	photoUrl?: string
}
