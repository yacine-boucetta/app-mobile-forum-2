import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('user')
    private usersRepository: Repository<User>,
  ) {}

  async create(userentity: User) {
    const insertUserDatabse = this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          email: userentity.email,
          name: userentity.name,
          lastname: userentity.lastname,
          password: await bcrypt.hash(userentity.password, 10),
        },
      ])
      .execute();
    await insertUserDatabse;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

async  updateUser(id: string,userentity:User) {
    const updateUserDatabase = this.usersRepository
    .createQueryBuilder()
    .update(User)
    .set({
      email: userentity.email,
      name: userentity.name,
      lastname: userentity.lastname,
      password: await bcrypt.hash(userentity.password, 10)
    })
    .where("id = :id", { id: id})
    .execute()
    return await updateUserDatabase;
  }
  remove(id: number) {
    return this.usersRepository.delete({ id });
  }
}
