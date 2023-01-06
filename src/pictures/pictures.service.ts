import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Picture } from './pictures.entity';


@Injectable()
export class PicturesService {
  constructor(
    @Inject('picture')
    private picturesRepository: Repository<Picture>,
  ) {}

  async create(picturesentity: Picture) {

    const insertPictureDatabse = this.picturesRepository
      .createQueryBuilder()
      .insert()
      .into(Picture)
      .values([
        {
          name: picturesentity.name,
          url: picturesentity.url,
          id_user: picturesentity.id_user,
          date_picture:Date.now()
        }
      ])
      .execute();
    await insertPictureDatabse;
  }

  findAll(): Promise<Picture[]> {
    return this.picturesRepository.find();
  }

  findOne(id: number) {
    return this.picturesRepository.findOneBy({ id });
  }

async  updatePicture(id: string,picturesentity:Picture) {
    const updatePictureDatabase = this.picturesRepository
    .createQueryBuilder()
    .update(Picture)
    .set({
        name: picturesentity.name,
        url: picturesentity.url,
        id_user: picturesentity.id_user,
        date_picture: picturesentity.date_picture,
    })
    .where("id = :id", { id: id})
    .execute()
    return await updatePictureDatabase;
  }
  remove(id: number) {
    return this.picturesRepository.delete({ id });
  }
}
