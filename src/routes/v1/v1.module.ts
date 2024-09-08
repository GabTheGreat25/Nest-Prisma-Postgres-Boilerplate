import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { RESOURCE } from "src/constants";
import { v1Routes } from "./v1.routes";
import { TestsModule } from './tests/tests.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: RESOURCE.API + RESOURCE.V1,
        module: V1Module,
        children: v1Routes,
      },
    ]),
    TestsModule,
  ],
})
export class V1Module {}
