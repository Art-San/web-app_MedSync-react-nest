import { Injectable } from '@nestjs/common'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'
import { DbService } from 'src/db/db.service'

@Injectable()
export class AdminService {
	constructor(private readonly prisma: DbService) {}
	async validateAdmin(fullName: string, telegramId: string) {
		// const user = await this.prisma.user.findUnique({
		//   where: { fullName },
		// });

		// if (user && user.isAdmin && await bcrypt.compare(telegramId, user.hashedPassword)) {
		//   return user;
		// }
		return null
	}

	async login(user: any) {
		// Implement JWT token creation here
	}

	// create(createAdminDto: CreateAdminDto) {
	//   return 'This action adds a new admin';
	// }

	// findAll() {
	//   return `This action returns all admin`;
	// }

	// findOne(id: number) {
	//   return `This action returns a #${id} admin`;
	// }

	// update(id: number, updateAdminDto: UpdateAdminDto) {
	//   return `This action updates a #${id} admin`;
	// }

	// remove(id: number) {
	//   return `This action removes a #${id} admin`;
	// }
}
