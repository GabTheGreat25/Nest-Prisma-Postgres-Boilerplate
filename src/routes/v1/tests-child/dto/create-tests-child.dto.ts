import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, IsInt } from "class-validator";
import { UploadImages } from "src/types";

export class CreateTestsChildDto {
  @IsString()
  @IsNotEmpty()
  testChild: string;

  image: UploadImages[];

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @IsNotEmpty()
  testId: number;
}
