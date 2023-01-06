import { Controller, Post, Body,Delete } from '@nestjs/common';
import { Get, Patch, Put } from '@nestjs/common/decorators';
import { Picture } from './pictures.entity';
import { PicturesService } from './pictures.service';
import { Param } from '@nestjs/common/decorators';
@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Post('register')
  async register(@Body() PictureEntity: Picture) {
    return this.picturesService.create(PictureEntity);
  }

  @Get()
  findAll() {
    return this.picturesService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.picturesService.findOne(+id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string ,@Body() UserEntity: Picture){
      return this.picturesService.updatePicture(id, UserEntity);
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.picturesService.remove(+id)
  }

}
