import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../typeORM/entities/Post';
import { Profile } from '../typeORM/entities/Profile';
import { User } from '../typeORM/entities/User';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports : [TypeOrmModule.forFeature([User, Profile, Post])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
