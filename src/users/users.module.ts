import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/typeORM/entities/Post';
import { Profile } from 'src/typeORM/entities/Profile';
import { User } from 'src/typeORM/entities/User';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports : [TypeOrmModule.forFeature([User, Profile, Post])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
