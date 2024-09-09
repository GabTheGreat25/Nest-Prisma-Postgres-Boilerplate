import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TestsChildService } from "./tests-child.service";
import { CreateTestsChildDto } from "./dto/create-tests-child.dto";
import { UpdateTestsChildDto } from "./dto/update-tests-child.dto";
import { responseHandler } from "src/utils";
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
  async create(@Body() createTestsChildDto: CreateTestsChildDto) {
    const data = await this.testsChildService.add(createTestsChildDto);
    return responseHandler(data, "TestChild created successfully");
  }

  @Patch(PATH.EDIT)
  async update(
    @Param(RESOURCE.ID) id: number,
    @Body() updateTestsChildDto: UpdateTestsChildDto,
  ) {
    const data = await this.testsChildService.update(id, updateTestsChildDto);
    return responseHandler(data, "TestChild updated successfully");
  }

  @Delete(PATH.DELETE)
  async remove(@Param(RESOURCE.ID) id: number) {
    const data = await this.testsChildService.deleteById(id);
    return responseHandler(data, "TestChild deleted successfully");
  }
}
