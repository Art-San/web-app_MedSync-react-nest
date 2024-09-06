import {
	IsBoolean,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator'

export class CreateSlotDto {
	// @IsNumber()
	// slotId: number

	@IsOptional()
	@IsNumber()
	doctorId?: number

	@IsOptional()
	@IsNumber()
	diagnosticId?: number

	@IsNumber()
	locationId: number

	@IsString()
	startTime: string

	@IsNumber()
	monthNumber: number

	@IsOptional()
	@IsBoolean()
	isBooked: boolean

	createdAt: any

	updatedAt: any
}

// slotId
// doctorId
// diagnosticId
// locationId
// startTime
// endTime
// dayNumber
// monthNumber
// isBooked
// createdAt
// updatedAt

// {
//   "slotId": 1,
//   "doctorId": 1,
//   "locationId": 1,
//   "startTime": "15",
//   "endTime": "16",
//   "dayNumber": 16,
//   "monthNumber": 8,
//   "isBooked": false
// }
