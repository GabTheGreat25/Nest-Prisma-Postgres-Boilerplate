import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class CreateTestsChildDto {
  @IsString()
  @IsNotEmpty()
  testChild: string;

  @IsInt()
  @IsNotEmpty()
  testId: number;
}
