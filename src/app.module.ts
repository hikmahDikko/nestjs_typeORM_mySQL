import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Post } from './typeORM/entities/Post';
import { Profile } from './typeORM/entities/Profile';
import { User } from './typeORM/entities/User';
import { UsersModule } from './users/users.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type : 'mysql',
    host : 'localhost',
    port : 3306,
    username : 'root',
    password : '@3Acc5fc5585',
    database : 'nestjs_mysql_tutorial',
    entities : [User, Profile, Post],
    synchronize : false,
    migrationsRun : true,
  }), UsersModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
