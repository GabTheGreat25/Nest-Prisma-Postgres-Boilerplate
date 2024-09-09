import { PartialType } from "@nestjs/mapped-types";
import { CreateTestsChildDto } from "./create-tests-child.dto";
import { IsString, IsNotEmpty, IsInt } from "class-validator";
import { Transform } from "class-transformer";
import { UploadImages } from "src/types";

export class UpdateTestsChildDto extends PartialType(CreateTestsChildDto) {
  @IsString()
  @IsNotEmpty()
  testChild: string;

  image: UploadImages[];

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @IsNotEmpty()
  testId: number;
}
