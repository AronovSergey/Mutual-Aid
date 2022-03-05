import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { User } from './user.entity';
import { AuthModule } from './../auth/auth.module';
import { BlogEntry } from '../blog/blog-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, BlogEntry]), AuthModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
