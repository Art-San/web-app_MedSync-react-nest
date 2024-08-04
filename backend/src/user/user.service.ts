import { Injectable } from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { DbService } from 'src/db/db.service'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: DbService) {}

	async create(createUserDto: CreateUserDto) {
		return this.prisma.user.create({
			data: createUserDto,
		})
	}

	// async findAll() {
	// 	return this.prisma.user.findMany()
	// }

	// async findOne(id: number) {
	// 	return this.prisma.user.findUnique({
	// 		where: { id },
	// 	})
	// }

	// async update(id: number, updateUserDto: CreateUserDto) {
	// 	return this.prisma.user.update({
	// 		where: { id },
	// 		data: updateUserDto,
	// 	})
	// }

	// async remove(id: number) {
	// 	return this.prisma.user.delete({
	// 		where: { id },
	// 	})
	// }
}
