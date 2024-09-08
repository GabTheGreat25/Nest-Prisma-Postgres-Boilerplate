import { IsString, IsNotEmpty } from "class-validator";

export class CreateTestDto {
  @IsString()
  @IsNotEmpty()
  test: string;
}