import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString({ message: 'content harus string' })
  @IsNotEmpty({ message: 'content tidak boleh kosong' })
  content: string;

}