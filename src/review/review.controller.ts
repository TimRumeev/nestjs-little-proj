import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post
} from "@nestjs/common";
import { UseGuards, UsePipes } from "@nestjs/common/decorators";
import { ValidationPipe } from "@nestjs/common/pipes";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { UserEmail } from "src/decorators/user-email.decorator";
import { CreateReviewDto } from "./dto/create-review.dto";
import { REVIEW_NOT_FOUND } from "./review.constants";
import { ReviewService } from "./review.service";
import { IdValidationPipe } from "src/pipes/ad-validation.pipe";
import { TelegramService } from "src/telegram/telegram.service";

@Controller("review")
export class ReviewController {
	constructor(
		private readonly reviewService: ReviewService,
		private readonly telegramService: TelegramService
	) { }

	@UsePipes(new ValidationPipe())
	@Post("create")
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@UsePipes(new ValidationPipe())
	@Post("notify")
	async notify(@Body() dto: CreateReviewDto) {
		const message = `Имя: ${dto.name}\n`
			+ `Заголовок: ${dto.title}\n`
			+ `Описаниe: ${dto.description}\n`
			+ `Рейтинг: ${dto.rating}\n`
			+ `ID: ${dto.productId}`;
		return this.telegramService.sendMessage(message);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	async delete(@Param("id", IdValidationPipe) id: string) {
		const deletedDoc = await this.reviewService.delete(id);
		if (!deletedDoc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return deletedDoc;
	}

	@Get("byProduct/:productId")
	async getByProduct(@Param("productId", IdValidationPipe) productId: string) {
		return this.reviewService.findByProductId(productId);
	}

}
