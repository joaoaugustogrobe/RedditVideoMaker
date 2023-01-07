import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateVideoDto } from './dto';

@Controller('videos')
export class VideosController {
  @Get()
  findAll(): string {
    return 'This action return all videos';
  }

  @Post()
  create(@Body() _createVideoDto: CreateVideoDto) {
    return 'This action creates a new video';
  }
}
