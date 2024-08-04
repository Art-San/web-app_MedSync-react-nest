import {
	Controller,
	Get,
	Post,
	Put,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { UsersService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDto) {
		// Логика создания нового пользователя
	}

	@Put(':id')
	async updateUser(
		@Param('id') id: number,
		@Body() updateUserDto: UpdateUserDto
	) {
		// Логика обновления существующего пользователя
	}
	// examplesData.ts
	// @Post()
	// create(@Body() createUserDto: CreateUserDto) {
	// 	return this.usersService.create(createUserDto)
	// }

	// @Get()
	// findAll() {
	// 	return this.usersService.findAll()
	// }

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	// 	return this.usersService.findOne(+id)
	// }

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
	// 	return this.usersService.update(+id, updateUserDto)
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.usersService.remove(+id)
	// }
}
