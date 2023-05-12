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
  
    let pictures = new Picture()
   
    pictures.name= picture.name,
    pictures.url=picture.url,
    pictures.user=picture.userId,
    pictures.date_picture= new Date(),
    pictures.event=picture.eventId,
    await this.picturesRepository.manager.save(pictures)
  }

  findAll(): Promise<Picture[]> {
    return this.picturesRepository.find();
  }
  findPictureByEvent(id:number):Promise<Picture[]>{
   return this.picturesRepository
   .createQueryBuilder('picture')
   .where('eventId=:id',{id:id})
   .getMany()
   


  }
  findOne(id: number) {
    return this.picturesRepository.findOneBy({ id });
  }

  async updatePicture(id: string, picture: UpdatePictureDto) {
    const updatePictureDatabase = this.picturesRepository
      .update(id,{
        name: picture.name,
        url: picture.url,
        date_picture: new Date()
      })
    
    return await updatePictureDatabase;
  }
  remove(id: number) {
    return this.picturesRepository.delete({ id });
  }
}
