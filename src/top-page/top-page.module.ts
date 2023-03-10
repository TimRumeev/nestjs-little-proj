import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypegooseModule } from "nestjs-typegoose";
import { TopPageController } from "./top-page.controller";

@Module({
	controllers: [TopPageController],
	providers: [ConfigService],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: TopPageModule,
				schemaOptions: {
					collection: "TopPage	"
				}
			}
		])
	]
})
export class TopPageModule { }
