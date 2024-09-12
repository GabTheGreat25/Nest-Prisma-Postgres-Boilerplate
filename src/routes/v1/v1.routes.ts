import { RouteTree } from "@nestjs/core";
import { RESOURCE } from "src/constants";
import {
  TestsModule,
  TestsChildModule,
  RolesModule,
  MerchantsModule,
} from "../v1";

export const v1Routes: RouteTree[] = [
  {
    path: RESOURCE.TESTS,
    module: TestsModule,
  },
  {
    path: RESOURCE.TESTS_CHILD,
    module: TestsChildModule,
  },
  {
    path: RESOURCE.ROLES,
    module: RolesModule,
  },
  {
    path: RESOURCE.MERCHANTS,
    module: MerchantsModule,
  },
];
