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
import { TestsChildService } from "./tests-child.service";
import { CreateTestsChildDto } from "./dto/create-tests-child.dto";
import { UpdateTestsChildDto } from "./dto/update-tests-child.dto";
import { responseHandler, multipleImages } from "src/utils";
import { STATUSCODE, PATH, RESOURCE } from "src/constants";

@Controller()
export class TestsChildController {
  constructor(private readonly testsChildService: TestsChildService) {}

  @Get()
  async findAll() {
    const data = await this.testsChildService.getAll();
    return responseHandler(
      data,
      data.length === STATUSCODE.ZERO
        ? "No test children found"
        : "All test children retrieved successfully",
    );
  }

  @Get(PATH.ID)
  async findOne(@Param(RESOURCE.ID) id: number) {
    const data = await this.testsChildService.getById(id);
    return responseHandler(data, "TestChild retrieved successfully");
  }

  @Post()
  @UseInterceptors(FilesInterceptor("image"))
  async create(
    @Body() createTestsChildDto: CreateTestsChildDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const uploadedImages = await multipleImages(files, []);

    if (uploadedImages.length === STATUSCODE.ZERO)
      throw new BadRequestException("At least one image is required.");

    const data = await this.testsChildService.add({
      ...createTestsChildDto,
      image: uploadedImages,
    });

    return responseHandler(data, "TestChild created successfully");
  }

  @Patch(PATH.EDIT)
  @UseInterceptors(FilesInterceptor("image"))
  async update(
    @Param(RESOURCE.ID) id: number,
    @Body() updateTestsChildDto: UpdateTestsChildDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const oldData = await this.testsChildService.getById(id);

    const uploadNewImages = files.length
      ? await multipleImages(
          files,
          (JSON.parse(oldData.image as string) || []).map(
            (image: any) => image.public_id,
          ),
        )
      : JSON.parse(oldData.image as string);

    const data = await this.testsChildService.update(id, {
      ...updateTestsChildDto,
      image: uploadNewImages,
    });

    return responseHandler(data, "TestChild updated successfully");
  }

  @Delete(PATH.DELETE)
  async remove(@Param(RESOURCE.ID) id: number) {
    const data = await this.testsChildService.deleteById(id);

    const images = data?.image ? JSON.parse(data.image as string) : [];

    if (images.length > 0) {
      const publicIds = images.map((image: any) => image.public_id);
      await multipleImages([], publicIds);
    }

    return responseHandler(data, "TestChild deleted successfully");
  }
}
