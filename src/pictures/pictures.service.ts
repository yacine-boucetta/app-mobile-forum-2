import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { Picture } from './model/entities/pictures.entity';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture) private readonly picturesRepository: Repository<Picture>,
  ) {}

  async create(picture: CreatePictureDto) {
  
    return this.picturesRepository.save(
        {
          name: picture.name,
          url: picture.url,
          id_user: picture.id_user,
          date_picture: new Date()
        },
      )
    
  }

  findAll(): Promise<Picture[]> {
    return this.picturesRepository.find();
  }

  findOne(id: number) {
    return this.picturesRepository.findOneBy({ id });
  }

  async updatePicture(id: string, picture: UpdatePictureDto) {
    const updatePictureDatabase = this.picturesRepository
      .update(id,{
        name: picture.name,
        url: picture.url,
        id_user: picture.id_user,
        date_picture: new Date()
      })
    
    return await updatePictureDatabase;
  }
  remove(id: number) {
    return this.picturesRepository.delete({ id });
  }
}
