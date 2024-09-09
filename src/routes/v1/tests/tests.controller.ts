import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { TestsService } from "./tests.service";
import { CreateTestDto } from "./dto/create-test.dto";
import { UpdateTestDto } from "./dto/update-test.dto";
import { responseHandler, multipleImages } from "src/utils";
import { STATUSCODE, PATH, RESOURCE } from "src/constants";

@Controller()
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Get()
  async findAll() {
    const data = await this.testsService.getAll();
    return responseHandler(
      data,
      data.length === STATUSCODE.ZERO
        ? "No tests found"
        : "All tests retrieved successfully",
    );
  }

  @Get(PATH.ID)
  async findOne(@Param(RESOURCE.ID) id: number) {
    const data = await this.testsService.getById(id);
    return responseHandler(data, "Test retrieved successfully");
  }

  @Post()
  @UseInterceptors(FilesInterceptor("image"))
  async create(
    @Body() createTestDto: CreateTestDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const uploadedImages = await multipleImages(files, []);

    if (uploadedImages.length === STATUSCODE.ZERO)
      throw new BadRequestException("At least one image is required.");

    const data = await this.testsService.add({
      ...createTestDto,
      image: uploadedImages,
    });
    return responseHandler(data, "Test created successfully");
  }

  @Patch(PATH.EDIT)
  @UseInterceptors(FilesInterceptor("image"))
  async update(
    @Param(RESOURCE.ID) id: number,
    @Body() updateTestDto: UpdateTestDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const oldData = await this.testsService.getById(id);

    const uploadNewImages = files.length
      ? await multipleImages(
          files,
          (JSON.parse(oldData.image as string) || []).map(
            (image: any) => image.public_id,
          ),
        )
      : JSON.parse(oldData.image as string);

    const data = await this.testsService.update(id, {
      ...updateTestDto,
      image: uploadNewImages,
    });

    return responseHandler(data, "Test updated successfully");
  }

  @Delete(PATH.DELETE)
  async remove(@Param(RESOURCE.ID) id: number) {
    const data = await this.testsService.deleteById(id);

    const deleteImages = (imageData: any) =>
      imageData
        .flatMap((item: any) => (item.image ? JSON.parse(item.image) : []))
        .map((image: any) => image.public_id);

    const publicIds = deleteImages([data]);
    const childPublicIds = deleteImages(data.TestChild || []);

    if (publicIds.length > 0 || childPublicIds.length > 0)
      await multipleImages([], [...publicIds, ...childPublicIds]);

    return responseHandler(data, "Test deleted successfully");
  }
}
