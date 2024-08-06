import { IsString, Length } from 'class-validator'

export class CreateLocationDto {
	@IsString()
	@Length(1, 128)
	name: string

	@IsString()
	@Length(1, 256)
	address: string
}
