import { IsNumber, IsString, IsOptional, IsDecimal } from 'class-validator'

export class CreateDoctorDto {
	@IsNumber()
	locationId: number

	@IsString()
	fullName: string

	@IsNumber()
	specialtyId: number

	@IsDecimal()
	price: number

	@IsString()
	photoUrl: string

	@IsOptional()
	@IsString()
	experience?: string

	@IsOptional()
	@IsString()
	certificates?: string

	@IsOptional()
	@IsString()
	services?: string
}

// POST /doctors
// Content-Type: application/json

// {
// 	"locationId": 1,
// 	"fullName": "Анна Андреева",
// 	"specialtyId": 1,
// 	"price": "1500.00",
// 	"photoUrl": "https://example.com/photo.jpg",
// 	"experience": "10 лет",
// 	"certificates": "Сертификат 1",
// 	"services": "Услуга 1"
// }
