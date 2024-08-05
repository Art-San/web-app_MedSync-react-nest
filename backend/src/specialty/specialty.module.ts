import { Module } from '@nestjs/common'
import { SpecialtyService } from './specialty.service'
import { SpecialtyController } from './specialty.controller'
import { DbModule } from 'src/db/db.module'

@Module({
	imports: [DbModule],
	controllers: [SpecialtyController],
	providers: [SpecialtyService],
})
export class SpecialtyModule {}

// // nest js
// 1. вар
// import { Module } from '@nestjs/common';
// import { SpecialtyService } from './specialty.service';
// import { SpecialtyController } from './specialty.controller';
// import { PrismaModule } from 'src/db/prisma.module';

// @Module({
//   imports: [PrismaModule],
//   controllers: [SpecialtyController],
//   providers: [SpecialtyService],
// })
// export class SpecialtyModule {}

// 2. вар
// import { Module } from '@nestjs/common';
// import { SpecialtyService } from './specialty.service';
// import { SpecialtyController } from './specialty.controller';
// import { PrismaService } from 'src/db/prisma.service';

// @Module({
//   controllers: [SpecialtyController],
//   providers: [SpecialtyService, PrismaService],
// })
// export class SpecialtyModule {}

// PrismaService будет использоваться в других модулях.
// Оба варианта работают

// Но как правильно подключать ?
// только коротко не больше 20 слов
