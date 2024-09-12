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
  UseGuards,
  BadRequestException,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { responseHandler, multipleImages } from "src/utils";
import { STATUSCODE, PATH, RESOURCE, ROLE } from "src/constants";
import { JwtAuthGuard, Roles } from "src/middleware";
import { UploadImages } from "src/types";

@Controller()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async findAll() {
    const data = await this.customersService.getAll();
    return responseHandler(
      data,
      data.length === STATUSCODE.ZERO
        ? "No customers found"
        : "All customers retrieved successfully",
    );
  }

  @Get(PATH.ID)
  async findOne(@Param(RESOURCE.ID) id: number) {
    const data = await this.customersService.getById(id);
    return responseHandler(data, "customer retrieved successfully");
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: "image" }, { name: "government_id" }]),
  )
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      government_id?: Express.Multer.File[];
    },
  ) {
    const uploadedImages = await multipleImages(files.image || [], []);
    const uploadedGovIds = await multipleImages(files.government_id || [], []);

    if (
      uploadedImages.length === STATUSCODE.ZERO ||
      uploadedGovIds.length === STATUSCODE.ZERO
    ) {
      throw new BadRequestException(
        "Both profile image and government ID are required.",
      );
    }

    const data = await this.customersService.add({
      ...createCustomerDto,
      image: uploadedImages,
      government_id: uploadedGovIds,
    });

    return responseHandler(data, "Customer created successfully");
  }

  @Patch(PATH.EDIT)
  @UseGuards(JwtAuthGuard)
  @Roles(ROLE.CUSTOMER)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: "image" }, { name: "government_id" }]),
  )
  async update(
    @Param(RESOURCE.ID) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      government_id?: Express.Multer.File[];
    },
  ) {
    const oldData = await this.customersService.getById(id);

    const uploadNewImages = files.image?.length
      ? await multipleImages(
          files.image,
          JSON.parse(oldData.image as string).map(
            (image: UploadImages) => image.public_id,
          ),
        )
      : JSON.parse(oldData.image as string);

    const uploadNewGovIds = files.government_id?.length
      ? await multipleImages(
          files.government_id,
          JSON.parse(oldData.government_id as string).map(
            (govId: any) => govId.public_id,
          ),
        )
      : JSON.parse(oldData.government_id as string);

    const data = await this.customersService.edit(id, {
      ...updateCustomerDto,
      image: uploadNewImages,
      government_id: uploadNewGovIds,
    });

    return responseHandler(data, "Customer updated successfully");
  }

  @Delete(PATH.DELETE)
  async remove(@Param(RESOURCE.ID) id: number) {
    const data = await this.customersService.delete(id);

    const images = data?.image ? JSON.parse(data.image as string) : [];

    if (images.length > 0) {
      const publicIds = images.map((image: any) => image.public_id);
      await multipleImages([], publicIds);
    }

    return responseHandler(data, "customer deleted successfully");
  }
}
