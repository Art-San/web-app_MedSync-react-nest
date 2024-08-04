export class Doctor {
	doctorId: number
	locationId: number
	fullName: string
	specialtyId: number
	price: number
	photoUrl: string
	experience?: string
	certificates?: string
	services?: string

	constructor(
		doctorId: number,
		locationId: number,
		fullName: string,
		specialtyId: number,
		price: number,
		photoUrl: string,
		experience?: string,
		certificates?: string,
		services?: string
	) {
		this.doctorId = doctorId
		this.locationId = locationId
		this.fullName = fullName
		this.specialtyId = specialtyId
		this.price = price
		this.photoUrl = photoUrl
		this.experience = experience
		this.certificates = certificates
		this.services = services
	}

	// Пример метода, который может быть полезен
	getProfileSummary(): string {
		return `${this.fullName}, специализация: ${this.specialtyId}`
	}
}
