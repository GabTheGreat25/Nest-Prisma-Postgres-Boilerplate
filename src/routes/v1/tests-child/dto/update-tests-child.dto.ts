import { PartialType } from "@nestjs/mapped-types";
import { CreateTestsChildDto } from "./create-tests-child.dto";
import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class UpdateTestsChildDto extends PartialType(CreateTestsChildDto) {
  @IsString()
  @IsNotEmpty()
  testChild: string;

  @IsInt()
  @IsNotEmpty()
  testId: number;
}
