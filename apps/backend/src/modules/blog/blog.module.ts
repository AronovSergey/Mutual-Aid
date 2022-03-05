import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { BlogEntry } from './blog-entry.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([BlogEntry, User]), 
        AuthModule,
        UserModule,
    ],
})
export class BlogModule {}
