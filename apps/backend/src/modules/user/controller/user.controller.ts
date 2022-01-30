import { Body, Controller, Post, Get, Param, Delete, Put, UseGuards, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');

import { IUser, IUploadFileResponse } from '@mutual-aid/interfaces';
import { UserRole } from '@mutual-aid/enums';
import { UserService } from '../service/user.service';
import { hasRoles } from '../../auth/decorator/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { JwtAuthGuard } from './../../auth/guards/jwt-guard';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Post()
    create(@Body() user: IUser): Observable<IUser | Record<'error', string>> {
        return this.userService.create(user).pipe(
            map((user: IUser) => user),
            catchError((err) => of({ error: err.message }))
        );
    }

    @Post('login')
    login(@Body() user: IUser): Observable<Record<'access_token', string> | Record<'error', string>> {
        return this.userService.login(user).pipe(
            map((jwt: string) => ({ access_token: jwt })),
            catchError((err) => of({ error: err.message }))
        );
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/profileimages',
            filename: (req, file, cb) => {
                const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
                const extension: string = path.parse(file.originalname).ext;

                cb(null, `${filename}${extension}`);
            }
        })
    }))
    uploadFile(@UploadedFile() file): Observable<IUploadFileResponse> {
        return of({ imagePath: file.path });
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IUser> {
        return this.userService.findOne(Number(id));
    }

    @Get()
    findAll(@Query('page') page = 1, @Query('limit') limit = 10, @Query('username') username: string): Observable<Pagination<IUser>> {
        limit = (limit > 100) ? 100 : limit;
        return this.userService.findAll({ page: Number(page), limit: Number(limit), route: 'http://localhost:3333/api/users' }, username);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<DeleteResult> {
        return this.userService.deleteOne(Number(id));
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() user: IUser): Observable<UpdateResult> {
        return this.userService.updateOne(Number(id), user);
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateRole(@Param('id') id: string, @Body() user: IUser): Observable<UpdateResult> {
        return this.userService.updateRole(Number(id), user);
    }
}
