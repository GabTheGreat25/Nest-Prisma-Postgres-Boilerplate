import { Module, Global } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ENV, PrismaConfigService } from "src/config";

@Global()
@Module({
  providers: [PrismaConfigService],
  imports: [
    ConfigModule.forRoot({
      load: [() => ENV],
    }),
  ],
  exports: [PrismaConfigService],
})
export class AppConfigModule {}
