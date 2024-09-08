import { RouteTree } from "@nestjs/core";
import { RESOURCE } from "src/constants";
import { TestsModule } from "./tests/tests.module";

export const v1Routes: RouteTree[] = [
  {
    path: RESOURCE.TESTS,
    module: TestsModule,
  },
];
