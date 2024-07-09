"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStrategy = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const auth_service_1 = require("./auth.service");
const dotenv = require("dotenv");
const typeorm_1 = require("@nestjs/typeorm");
const Employee_entity_1 = require("../employee/entities/Employee.entity");
const typeorm_2 = require("typeorm");
dotenv.config();
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy) {
    constructor(employeeRepository, jwtService, authService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:4001/auth/google/redirect',
            scope: ['openid', 'profile', 'email'],
        });
        this.employeeRepository = employeeRepository;
        this.jwtService = jwtService;
        this.authService = authService;
    }
    ;
    authorizationParams() {
        return ({
            access_type: 'offline',
            prompt: 'consent'
        });
    }
    async validate(accessToken, refreshToken, profile, done) {
        try {
            const { displayName, emails, photos } = profile;
            const user = await this.authService.validateUserGoogle({
                email: emails[0].value,
                name: profile.displayName,
            });
            if (!user) {
                return done(new Error('User not found'), null);
            }
            const { role, ...userDetails } = await this.authService.showProfile(user.id);
            const userForToken = {
                id: user.id,
                email: emails[0].value,
                displayName,
                role,
                image: profile.photos[0].value
            };
            const payload = { user: userForToken };
            const jwtToken = await this.jwtService.sign(payload);
            return done(null, {
                accessToken,
                refreshToken,
                jwtToken,
            });
        }
        catch (error) {
            return done(error, false);
        }
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Employee_entity_1.Employee)),
    __param(2, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        auth_service_1.AuthService])
], GoogleStrategy);
//# sourceMappingURL=GoogleStrategy.js.map