import { BeforeInsert, BeforeUpdate } from 'typeorm';
import { validateOrReject } from 'class-validator';

export abstract class ValidateEntity {
  @BeforeInsert()
  @BeforeUpdate()
  validate(): Promise<void> {
    return validateOrReject(this);
  }
}
