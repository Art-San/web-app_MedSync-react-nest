import { PartialType, PickType, OmitType } from '@nestjs/mapped-types'
import { CreateLocationDto } from './create-location.dto'

export class UpdateLocationDto extends PartialType(CreateLocationDto) {}

// Мы можем выбрать набор свойств из этого класса, используя служебную функцию PickType():
// export class UpdateLocationDto extends PickType(CreateLocationDto, [
// 	'name',
// 	'address',
// ] as const) {}

// Мы можем создать производный тип, который имеет все свойства, кроме имени, как показано ниже.
// В этой конструкции вторым аргументом OmitType является массив имен свойств.
// export class UpdateLocationDto extends OmitType(CreateLocationDto, [
// 	'name',
// ] as const) {}
