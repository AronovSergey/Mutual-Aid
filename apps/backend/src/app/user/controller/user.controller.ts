import { Body, Controller, Post, Get, Param, Delete, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IUser } from '@mutual-aid/interfaces';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
    
    constructor(private userService: UserService) { }

    @Post()
    create(@Body() user: IUser): Observable<IUser> {
        return this.userService.create(user)
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
    deleteOne(@Param('id') id: string): Observable<IUser> {
        return this.userService.deleteOne(Number(id))
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() user: IUser): Observable<any> {
        return this.userService.updateOne(Number(id), user)
    }
}
