import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeORM/entities/Post';
import { Profile } from 'src/typeORM/entities/Profile';
import { Repository } from 'typeorm';
import { User } from '../../../typeORM/entities/User';
import { CreateUserParams, CreateUserPostParams, CreateUserProfileParams, UpdateUserParams } from '../../../utils/types';

@Injectable()
export class UsersService {
    //To connect to with the database
    constructor(
        @InjectRepository(User) private userRepository : Repository<User>,
        @InjectRepository(Profile) private profileRepository : Repository<Profile>,
        @InjectRepository(Post) private postRepository : Repository<Post>,
    ) {}

    findUser(){
        return this.userRepository.find({ relations : ['profile', 'posts']});
    }

    createUser(userDetails : CreateUserParams){
        const newUser = this.userRepository.create({ 
            ...userDetails,
            createdAt : new Date(),
        });
        return this.userRepository.save(newUser);
    }

    updateUser(id : number, updateUserDetails : UpdateUserParams) {
        return this.userRepository.update({id}, { ...updateUserDetails })
    }

    deleteUser(id : number) {
        return this.userRepository.delete({id})
    }

    async createUserProfile(id : number, userProfileDetails : CreateUserProfileParams) {
        const user = await this.userRepository.findOneBy({ id });

        if(!user) throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
        const newUserProfile = this.profileRepository.create(
            userProfileDetails,
        );
        const saveProfile = await this.profileRepository.save(newUserProfile)
        user.profile = saveProfile;
        return this.userRepository.save(user);

    }

    async createUserPost(id : number, userPostDetails : CreateUserPostParams) {
        const user = await this.userRepository.findOneBy({ id });

        if(!user) throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
        const newUserPost = this.postRepository.create({
            ...userPostDetails,
            user,
        });
        return await this.postRepository.save(newUserPost);
    }
}
