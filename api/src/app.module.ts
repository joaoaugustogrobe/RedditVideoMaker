import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosController } from './videos/videos.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://videomaker:videomaker@localhost:27017/?authMechanism=DEFAULT',
    ),
  ],
  controllers: [AppController, VideosController],
  providers: [AppService],
})
export class AppModule { }
