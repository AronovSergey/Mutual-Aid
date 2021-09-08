import { Body, Controller, Post, Get, Param, Delete, Put } from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUser } from '@mutual-aid/interfaces';
import { UserService } from '../service/user.service';

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

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IUser> {
        return this.userService.findOne(Number(id))
    }

    @Get()
    findAll(): Observable<IUser[]> {
        return this.userService.findAll()
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<DeleteResult> {
        return this.userService.deleteOne(Number(id))
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() user: IUser): Observable<UpdateResult> {
        return this.userService.updateOne(Number(id), user)
    }
}
