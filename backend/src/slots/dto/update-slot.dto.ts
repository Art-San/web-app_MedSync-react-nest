import { PartialType } from '@nestjs/mapped-types'
import { CreateSlotDto } from './create-slot.dto'

export class UpdateSlotDto extends PartialType(CreateSlotDto) {}

// import { IsNumber, IsBoolean, IsString } from 'class-validator'

// export class UpdateSlotDto {
// 	@IsNumber()
// 	doctorId: number

// 	@IsNumber()
// 	locationId: number

// 	@IsString()
// 	startTime: string

// 	@IsString()
// 	endTime: string

// 	@IsNumber()
// 	dayNumber: number

// 	@IsNumber()
// 	monthNumber: number

// 	@IsBoolean()
// 	isBooked: boolean
// }
