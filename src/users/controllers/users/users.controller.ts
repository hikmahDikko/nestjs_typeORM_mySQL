import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/createUser_dto';
import { UsersService } from 'src/users/services/users/users.service';
import { UpdateUserDTO } from 'src/users/dto/updateUser.dto';
import { CreateUserProfileDTO } from 'src/users/dto/createUserProfile_dto';
import { CreateUserPostDTO } from 'src/users/dto/createPost_dto';

@Controller('users')
export class UsersController {

    constructor(private usersServices : UsersService) {}

    @Get()
    async getUsers(){
        const users = await this.usersServices.findUser();
        return users;
    }

    @Post()
    createUser(@Body() createUserDto : CreateUserDTO){
        return this.usersServices.createUser(createUserDto);
    }

    @Put(':id')
    async updateUser(
        @Param("id", ParseIntPipe)  id: number, 
        @Body() updateUserDTO : UpdateUserDTO) {
            await this.usersServices.updateUser(id, updateUserDTO)
    }

    @Patch(':id')
    async updateUserById(
        @Param("id", ParseIntPipe)  id: number, 
        @Body() updateUserDTO : UpdateUserDTO) {
            await this.usersServices.updateUser(id, updateUserDTO)
    }

    @Delete(':id')
    async deleteUser(
        @Param("id", ParseIntPipe) id : number) {
            await this.usersServices.deleteUser(id)

    }

    @Post('profiles/:id')
    createUserProfile(
        @Param("id", ParseIntPipe)  id: number,
        @Body() createUserProfileDto : CreateUserProfileDTO){
        return this.usersServices.createUserProfile(id, createUserProfileDto);
    }

    @Post('posts/:id')
    createUserPost(
        @Param("id", ParseIntPipe)  id: number,
        @Body() createUserPostDto : CreateUserPostDTO){
        return this.usersServices.createUserPost(id, createUserPostDto);
    }

}
