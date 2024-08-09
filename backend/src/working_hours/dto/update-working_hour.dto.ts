// import { OmitType, PartialType } from '@nestjs/mapped-types'
// import { CreateWorkingHourDto } from './create-working_hour.dto'

// // export class UpdateWorkingHourDto extends PartialType(CreateWorkingHourDto) {}

// export class UpdateWorkingHourDto extends OmitType(CreateWorkingHourDto, [
// 	'weekdayIndex',
// 	'locationId',
// ] as const) {}

import { Exclude } from 'class-transformer'
import { IsNumber, IsString, Length } from 'class-validator'

export class UpdateWorkingHourDto {
	@IsString()
	@Length(1, 128)
	startTime: string

	@IsString()
	@Length(1, 128)
	endTime: string

	// Исключаем locationId и weekdayIndex из сериализации
	@Exclude()
	locationId: number

	@Exclude()
	weekdayIndex: number
}
