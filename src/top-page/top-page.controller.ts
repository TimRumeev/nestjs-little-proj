import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ConfigService } from "@nestjs/config/dist";
import { FindProductDto } from "src/product/dto/find-product.dto";
import { ProductModel } from "src/product/product.model/product.model";
import { FindTopPageDto } from "./dto/find-top-page.dto";
import { TopPageModel } from "./top-page.model/top-page.model";

@Controller("top-page")
export class TopPageController {

	constructor(private readonly configService: ConfigService) { }

	@Post("create")
	async create(@Body() dto: Omit<TopPageModel, "_id">) {
		this.configService.get("TEST");
	}

	@Get(":id")
	async get(@Param("id") id: string) {

	}

	@Delete(":id")
	async delete(@Param("id") id: string) {

	}

	@Patch(":id")
	async patch(@Param("id") id: string, @Body() dto: TopPageModel) {

	}

	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindTopPageDto) {

	}

}
