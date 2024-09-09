import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaConfigService } from "src/config";
import { CreateTestDto } from "./dto/create-test.dto";
import { UpdateTestDto } from "./dto/update-test.dto";

@Injectable()
export class TestsService {
  constructor(private readonly prisma: PrismaConfigService) {}

  getAll() {
    return this.prisma.test.findMany();
  }

  async getById(id: number) {
    const test = await this.prisma.test.findUnique({
      where: { id },
    });

    if (!test) throw new NotFoundException("Test not found");

    return test;
  }

  async add(createTestDto: CreateTestDto) {
    return this.prisma.test.create({
      data: createTestDto,
    });
  }

  async update(id: number, updateTestDto: UpdateTestDto) {
    const test = await this.prisma.test.findUnique({ where: { id } });

    if (!test) throw new NotFoundException("Test not found");

    return this.prisma.test.update({
      where: { id },
      data: updateTestDto,
    });
  }

  async deleteById(id: number) {
    const test = await this.prisma.test.findUnique({ where: { id } });

    if (!test) throw new NotFoundException("Test not found");

    return this.prisma.test.delete({
      where: { id },
    });
  }
}
