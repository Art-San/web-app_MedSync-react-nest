import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Put,
	Param,
	Delete,
	Req,
} from '@nestjs/common'
import { DoctorService } from './doctor.service'
import { CreateDoctorDto } from './dto/create-doctor.dto'
import { UpdateDoctorDto } from './dto/update-doctor.dto'
import { Request, Response } from 'express'

@Controller('doctors')
export class DoctorController {
	constructor(private readonly doctorService: DoctorService) {}

	@Post()
	create(@Body() dto: CreateDoctorDto) {
		return this.doctorService.create(dto)
	}

	@Get()
	findAll(@Req() req: Request) {
		// console.log('Request Headers:', req.headers)
		// console.log('Request Query:', req.query)
		// console.log('Request Params:', req.params)
		// console.log('Request Body:', req.body)
		return this.doctorService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.doctorService.byId(+id)
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
		return this.doctorService.update(+id, updateDoctorDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.doctorService.delete(+id)
	}
}
