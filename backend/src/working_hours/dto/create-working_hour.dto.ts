import { IsNumber, IsString, Length } from 'class-validator'

export class CreateWorkingHourDto {
	@IsNumber()
	locationId: number

	@IsString()
	@Length(1, 128)
	startTime: string

	@IsString()
	@Length(1, 128)
	endTime: string

	@IsNumber()
	weekdayIndex: number
}
