import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { DepartmentModule } from './department/department.module';
import { TeamModule } from './team/team.module';
import { PositionModule } from './position/position.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [PrismaModule, UserModule, RoleModule, DepartmentModule, TeamModule, PositionModule, OrganizationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
