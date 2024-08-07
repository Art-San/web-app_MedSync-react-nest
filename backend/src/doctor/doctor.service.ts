// src/doctor/doctor.service.ts
import { Injectable, BadRequestException } from '@nestjs/common'
import { CreateDoctorDto } from './dto/create-doctor.dto'
import { UpdateDoctorDto } from './dto/update-doctor.dto'
import { DbService } from 'src/db/db.service'
import { BaseService } from 'src/common/base.service'

@Injectable()
export class DoctorService extends BaseService {
	constructor(private readonly dbService: DbService) {
		super(DoctorService.name)
	}

	async findAll() {
		try {
			const doctors = await this.dbService.doctor.findMany({
				include: {
					specialty: true,
					location: true,
				},
			})
			return doctors
		} catch (error) {
			this.handleException(error, 'findAll Doctors')
		}
	}

	async create(createDoctorDto: CreateDoctorDto) {
		try {
			const newDoctor = await this.dbService.doctor.create({
				data: createDoctorDto,
			})

			return newDoctor
		} catch (error) {
			this.handleException(error, 'create Doctor')
		}
	}

	async byId(doctorId: number) {
		try {
			const doctor = await this.dbService.doctor.findUnique({
				where: { doctorId },
				include: {
					specialty: true,
					location: true,
				},
			})

			if (!doctor) {
				throw new BadRequestException(`Доктор с таким ID: ${doctorId} нет в БД`)
			}

			return doctor
		} catch (error) {
			this.handleException(error, 'byId Doctor')
		}
	}

	async update(doctorId: number, updateDoctorDto: UpdateDoctorDto) {
		try {
			const doctor = await this.byId(doctorId)
			if (!doctor) {
				throw new BadRequestException(`Доктор с таким ID: ${doctorId} нет в БД`)
			}

			const updatedDoctor = await this.dbService.doctor.update({
				where: { doctorId },
				data: updateDoctorDto,
			})

			return updatedDoctor
		} catch (error) {
			this.handleException(error, 'update Doctor')
		}
	}

	async delete(doctorId: number) {
		try {
			const doctor = await this.byId(doctorId)
			if (!doctor) {
				throw new BadRequestException(`Доктор с таким ID: ${doctorId} нет в БД`)
			}

			await this.dbService.doctor.delete({
				where: { doctorId },
			})

			return { msg: `Доктор с таким ID: ${doctorId} удален` }
		} catch (error) {
			this.handleException(error, 'delete Doctor')
		}
	}
}

// import { Injectable } from '@nestjs/common';
// import { CreateDoctorDto } from './dto/create-doctor.dto';
// import { UpdateDoctorDto } from './dto/update-doctor.dto';

// @Injectable()
// export class DoctorService {
//   create(createDoctorDto: CreateDoctorDto) {
//     return 'This action adds a new doctor';
//   }

//   findAll() {
//     return `This action returns all doctor`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} doctor`;
//   }

//   update(id: number, updateDoctorDto: UpdateDoctorDto) {
//     return `This action updates a #${id} doctor`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} doctor`;
//   }
// }
