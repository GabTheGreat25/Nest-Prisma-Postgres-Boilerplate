import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TestsService } from "./tests.service";
import { CreateTestDto } from "./dto/create-test.dto";
import { UpdateTestDto } from "./dto/update-test.dto";
import { responseHandler } from "src/utils";
import { STATUSCODE } from "src/constants";

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

  @Get(":id")
  async findOne(@Param("id") id: number) {
    const data = await this.testsService.getById(id);
    return responseHandler(
      data,
      !data ? "No Test found" : "Test retrieved successfully",
    );
  }

  @Post()
  async create(@Body() createTestDto: CreateTestDto) {
    const data = await this.testsService.add(createTestDto);
    return responseHandler(data, "Test created successfully");
  }

  @Patch("edit/:id")
  async update(@Param("id") id: number, @Body() updateTestDto: UpdateTestDto) {
    const data = await this.testsService.update(id, updateTestDto);
    return responseHandler(data, "Test updated successfully");
  }

  @Delete(":id")
  async remove(@Param("id") id: number) {
    const data = await this.testsService.deleteById(id);
    return responseHandler(data, "Test deleted successfully");
  }
}
