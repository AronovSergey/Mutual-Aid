import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  Request,
  Res,
} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import path = require('path');

import { IUser, IUploadFileResponse } from '@mutual-aid/interfaces';
import { UserRole } from '@mutual-aid/enums';
import { UserService } from '../service/user.service';
import { hasRoles } from '../../auth/decorator/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { EditProfileGuard } from '../../auth/guards/edit-profile.guard';

const PROFILE_IMAGE_STORAGE_PATH = 'uploads/profileimages'
const storge = {
  storage: diskStorage({
    destination: './' + PROFILE_IMAGE_STORAGE_PATH,
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10, @Query('username') username: string): Observable<Pagination<IUser>> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.findAll(
      {
        page: Number(page),
        limit: Number(limit),
        route: 'http://localhost:3333/api/users',
      },
      username
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IUser> {
    return this.userService.findOne(Number(id));
  }

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

  @UseGuards(JwtAuthGuard, EditProfileGuard)
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

  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<DeleteResult> {
    return this.userService.deleteOne(Number(id));
  }

  // Profile Image Section
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storge))
  uploadFile(@UploadedFile() file, @Request() req): Observable<IUploadFileResponse> {
    const user: IUser = req.user;
    return this.userService.updateOne(user.id, { profileImage: file.filename }).pipe(
      map(() => ({ imagePath: file.filename }))
    );
  }

  @Get('profile-image/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res): Observable<string> {
    return of(res.sendFile(join(process.cwd(), PROFILE_IMAGE_STORAGE_PATH + '/' + imagename)));
  }
}
