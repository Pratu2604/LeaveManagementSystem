"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const swagger_1 = require("@nestjs/swagger");
const cors = require("cors");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        rawBody: true,
        bodyParser: true,
    });
    var corsOptions = {
        origin: "http://localhost:3000"
    };
    app.use(cors(corsOptions));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Leave Management API')
        .setDescription('leave management api description')
        .setVersion('1.0')
        .addBearerAuth({
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT Token",
        in: "header"
    }, "JWT-auth")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use(session({
        secret: 'kjansckjnascnalscascnacasnlk',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000
        },
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(process.env.SERVER_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map