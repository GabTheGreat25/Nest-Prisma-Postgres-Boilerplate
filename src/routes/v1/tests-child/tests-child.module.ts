import { Module } from "@nestjs/common";
import { TestsChildService } from "./tests-child.service";
import { TestsChildController } from "./tests-child.controller";

@Module({
  controllers: [TestsChildController],
  providers: [TestsChildService],
})
export class TestsChildModule {}
