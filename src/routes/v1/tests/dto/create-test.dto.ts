import { IsString, IsNotEmpty } from "class-validator";
import { UploadImages } from "src/types";

export class CreateTestDto {
  @IsString()
  @IsNotEmpty()
  test: string;

  image: UploadImages[];
}
