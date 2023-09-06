import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateCatDto } from './dtos/create-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private catRepository: Repository<Cat>) {}

  findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  create(createCatDto: CreateCatDto): Promise<Cat> {
    return this.catRepository.save(plainToInstance(Cat, createCatDto));
  }
}
