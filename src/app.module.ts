import { Module } from "@nestjs/common";
import { AppConfigModule } from "src/config/config.module";
import { RoutesModule } from "src/routes/routes.module";

@Module({
  imports: [AppConfigModule, RoutesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
