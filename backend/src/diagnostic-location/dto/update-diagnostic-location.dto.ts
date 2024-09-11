import { PartialType } from '@nestjs/mapped-types';
import { CreateDiagnosticLocationDto } from './create-diagnostic-location.dto';

export class UpdateDiagnosticLocationDto extends PartialType(CreateDiagnosticLocationDto) {}
