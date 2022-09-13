import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/users/all')
  async requestAllUsers(): Promise<string> {
    return this.appService.getAllUsers();
  }

  @Get('/users/:id')
  async requestUser(@Param('id') id: string): Promise<any> {
    return this.appService.getUserById(id);
  }

  @Post('/users/add')
  async addUser(@Body() userItem: CreateUserDto): Promise<CreateUserDto> {

    return this.appService.addUser(userItem);
  }

  @Delete('/users/:id')
  async deleteUser(@Param('id') id: string): Promise<any> {

    return this.appService.deleteUser(id);
  }
}
