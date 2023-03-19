import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { disconnect } from "mongoose";
import { AuthDto } from "src/auth/dto/auth.dto";
import { USER_NOT_FOUND, WRONG_PASSWORD_ERROR } from "../src/auth/auth.constants";


const currentDto: AuthDto = {
	login: "a@a.ru",
	password: "1"
};

const incorrectPassword: AuthDto = {
	login: "a@a.ru",
	password: "2"
};

const incorrectLogin: AuthDto = {
	login: "a1@a.ru",
	password: "1"
};


describe("AuthController (e2e)", () => {
	let app: INestApplication;
	// let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();
		app = moduleFixture.createNestApplication();
		await app.init();

	});

	it("/auth/login (POST) - success", async () => {

		return request(app.getHttpServer())
			.post("/auth/login")
			.send(currentDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined();
			});
	});

	it("/auth/login (POST) - incorrectPassword", async () => {
		return request(app.getHttpServer())
			.post("/auth/login")
			.send(incorrectPassword)
			.expect(401)
			.then(({ body }: request.Response) => {
				expect(body.message).toContain(WRONG_PASSWORD_ERROR);
			});
	});

	it("/auth/login (POST) - incorrectLogin", async () => {
		return request(app.getHttpServer())
			.post("/auth/login")
			.send(incorrectLogin)
			.expect(401)
			.then(({ body }: request.Response) => {
				expect(body.message).toContain(USER_NOT_FOUND);
			});
	});



	afterAll(() => {
		disconnect();
	});


});
