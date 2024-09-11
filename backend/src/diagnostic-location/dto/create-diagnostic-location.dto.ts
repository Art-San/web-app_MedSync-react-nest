import { IsNumber } from 'class-validator'

export class CreateDiagnosticLocationDto {
	@IsNumber()
	diagnosticId: number

	@IsNumber()
	locationId: number
}

// {
//   "diagnosticId": 1,
//   "locationId": 1
// }
