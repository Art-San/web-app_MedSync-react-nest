import { Injectable } from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { DbService } from 'src/db/db.service'
import { UpdateUserDto } from './dto/update-user.dto'

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

	async update(userId: number, updateUserDto: UpdateUserDto) {
		return this.prisma.user.update({
			where: { userId },
			data: updateUserDto,
		})
	}

	// async remove(id: number) {
	// 	return this.prisma.user.delete({
	// 		where: { id },
	// 	})
	// }
}
