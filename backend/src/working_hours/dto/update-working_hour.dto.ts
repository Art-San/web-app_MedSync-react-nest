import { OmitType, PartialType } from '@nestjs/mapped-types'
import { CreateWorkingHourDto } from './create-working_hour.dto'

// export class UpdateWorkingHourDto extends PartialType(CreateWorkingHourDto) {}

export class UpdateWorkingHourDto extends OmitType(CreateWorkingHourDto, [
	'weekdayIndex',
	'locationId',
] as const) {}

// import { IsOptional, IsString, MaxLength } from 'class-validator'

// export class UpdateWorkingHourDto {
// 	@IsOptional()
// 	@IsString()
// 	@MaxLength(2)
// 	startTime: string

// 	@IsOptional()
// 	@IsString()
// 	@MaxLength(2)
// 	endTime: string
// }
