import { RouteTree } from "@nestjs/core";
import { RESOURCE } from "src/constants";
import {
  TestsModule,
  TestsChildModule,
  RolesModule,
  MerchantsModule,
  CustomersModule,
  AuthModule,
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
  {
    path: RESOURCE.CUSTOMERS,
    module: CustomersModule,
  },
  {
    path: RESOURCE.AUTH,
    module: AuthModule,
  },
];
