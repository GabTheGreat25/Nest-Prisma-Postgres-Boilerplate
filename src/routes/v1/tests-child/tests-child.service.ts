import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaConfigService } from "src/config";
import { CreateTestsChildDto } from "./dto/create-tests-child.dto";
import { UpdateTestsChildDto } from "./dto/update-tests-child.dto";

@Injectable()
export class TestsChildService {
  constructor(private readonly prisma: PrismaConfigService) {}

  getAll() {
    return this.prisma.testChild.findMany({
      include: {
        test: true,
      },
    });
  }

  async getById(id: number) {
    const testChild = await this.prisma.testChild.findUnique({
      where: { id },
      include: {
        test: true,
      },
    });

    if (!testChild) throw new NotFoundException("TestChild not found");

    return testChild;
  }

  async add(createTestsChildDto: CreateTestsChildDto) {
    return this.prisma.testChild.create({
      data: {
        testChild: createTestsChildDto.testChild,
        image: JSON.stringify(createTestsChildDto.image),
        test: {
          connect: { id: createTestsChildDto.testId },
        },
      },
    });
  }

  async update(id: number, updateTestsChildDto: UpdateTestsChildDto) {
    const testChild = await this.prisma.testChild.findUnique({ where: { id } });

    if (!testChild) throw new NotFoundException("TestChild not found");

    return this.prisma.testChild.update({
      where: { id },
      data: {
        testChild: updateTestsChildDto.testChild,
        image: JSON.stringify(updateTestsChildDto.image),
        test: {
          connect: { id: updateTestsChildDto.testId },
        },
      },
    });
  }

  async deleteById(id: number) {
    const testChild = await this.prisma.testChild.findUnique({ where: { id } });

    if (!testChild) throw new NotFoundException("TestChild not found");

    return this.prisma.testChild.delete({
      where: { id },
    });
  }
}
