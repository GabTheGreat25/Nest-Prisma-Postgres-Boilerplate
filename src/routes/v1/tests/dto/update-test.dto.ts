import { PartialType } from "@nestjs/mapped-types";
import { CreateTestDto } from "./create-test.dto";
import { IsString, IsNotEmpty } from "class-validator";
import { UploadImages } from "src/types";

export class UpdateTestDto extends PartialType(CreateTestDto) {
  @IsString()
  @IsNotEmpty()
  test: string;

  image: UploadImages[];
}
