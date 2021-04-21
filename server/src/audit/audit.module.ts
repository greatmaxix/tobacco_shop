import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditController } from 'src/audit/audit.controller';
import { AuditRepository } from 'src/audit/audit.repository';
import { AuditService } from 'src/audit/audit.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditRepository]),
  ],
  controllers: [AuditController],
  providers: [AuditService]
})
export class AuditModule {}
