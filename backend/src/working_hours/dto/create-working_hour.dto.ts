import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateWorkingHourDto {
	@IsNumber()
	locationId: number

	@IsOptional()
	@IsString()
	@MaxLength(2)
	startTime?: string

	@IsOptional()
	@IsString()
	@MaxLength(2)
	endTime?: string

	@IsNumber()
	weekdayIndex: number
}
