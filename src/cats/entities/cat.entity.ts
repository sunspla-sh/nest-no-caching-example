import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ValidateEntity } from '../../validation/validate.entity';
import { Length, IsInt, Min, Max } from 'class-validator';

@Entity()
export class Cat extends ValidateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 64)
  name: string;

  @Column()
  @IsInt()
  @Max(30)
  @Min(0)
  age: number;
}
