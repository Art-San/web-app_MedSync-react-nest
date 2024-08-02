import {
	Controller,
	Req,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UnauthorizedException,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('telegram')
	async telegramAuth(@Req() req: any): Promise<any> {
		const user = req.user
		console.log(1, user)
		if (!user) {
			throw new UnauthorizedException('User not found')
		}
		// Далее можно выполнить необходимые действия с аутентифицированным пользователем
		return this.authService.processUser(user)
	}

	// @Post('telegram')
	// async authenticate(@Body() body: AuthDto) {
	// 	return this.authService.authenticateUser(body)
	// }

	// @Post('telegram')
	// async telegramAuth(@Body() userData: any): Promise<any> {
	// 	try {
	// 		return await this.authService.authenticateUser(userData)
	// 	} catch (error) {
	// 		throw new UnauthorizedException('Аутентификация не удалась')
	// 	}
	// }
	// @Post()
	// create(@Body() createAuthDto: CreateAuthDto) {
	//   return this.authService.create(createAuthDto);
	// }

	// @Get()
	// findAll() {
	//   return this.authService.findAll();
	// }

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	//   return this.authService.findOne(+id);
	// }

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
	//   return this.authService.update(+id, updateAuthDto);
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	//   return this.authService.remove(+id);
	// }
}
