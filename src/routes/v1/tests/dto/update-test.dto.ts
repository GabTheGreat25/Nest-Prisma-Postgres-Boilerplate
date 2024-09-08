import { PartialType } from "@nestjs/mapped-types";
import { CreateTestDto } from "./create-test.dto";
import { IsString, IsNotEmpty } from "class-validator";

export class UpdateTestDto extends PartialType(CreateTestDto) {
  @IsString()
  @IsNotEmpty()
  test: string;
}
