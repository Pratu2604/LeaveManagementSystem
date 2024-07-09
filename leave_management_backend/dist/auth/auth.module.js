"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const UserCredentials_entity_1 = require("./entities/UserCredentials.entity");
const dotenv = require("dotenv");
const mail_module_1 = require("../mail/mail.module");
const Employee_entity_1 = require("../employee/entities/Employee.entity");
const userOtp_entity_1 = require("./entities/userOtp.entity");
const GoogleStrategy_1 = require("./GoogleStrategy");
const Serializer_1 = require("./utils/Serializer");
const google_auth_library_1 = require("google-auth-library");
dotenv.config();
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([UserCredentials_entity_1.UserCredentials, Employee_entity_1.Employee, userOtp_entity_1.UserOtp]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.SECRET,
                signOptions: { expiresIn: '1d' },
            }),
            mail_module_1.MailModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [GoogleStrategy_1.GoogleStrategy,
            Serializer_1.SessionSerializer,
            {
                provide: 'AUTH_SERVICE',
                useClass: auth_service_1.AuthService,
            },
            google_auth_library_1.OAuth2Client
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map