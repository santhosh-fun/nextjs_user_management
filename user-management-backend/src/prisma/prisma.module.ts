// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()  // This decorator makes PrismaModule available globally in the app
@Module({
  providers: [PrismaService],
  exports: [PrismaService],  // Export PrismaService so it can be injected into other modules
})
export class PrismaModule {}
