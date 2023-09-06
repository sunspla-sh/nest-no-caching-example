import { Length, IsInt, Max, Min } from 'class-validator';

export class CreateCatDto {
  @Length(1, 64)
  name: string;

  @IsInt()
  @Max(30)
  @Min(0)
  age: number;
}
