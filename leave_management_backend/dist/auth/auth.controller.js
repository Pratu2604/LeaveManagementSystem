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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const GoogleAuth_guard_1 = require("./guards/GoogleAuth.guard");
const auth_service_1 = require("./auth.service");
const Refresh_gurad_1 = require("./guards/Refresh.gurad");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    googleAuth(req) { }
    async googleAuthRedirect(req, res) {
        try {
            return res.redirect(`http://localhost:3000/Employee?accessToken=${req?.user?.accessToken}&refreshToken=${req?.user?.refreshToken}&jwtToken=${req?.user?.jwtToken}`);
        }
        catch (error) {
            console.error('Error in googleAuthRedirect:', error);
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async user(request) {
        console.log(request.user);
        if (request.user) {
            return { msg: 'Authenticated' };
        }
        else {
            return { msg: 'Not AUthenticated' };
        }
    }
    async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            console.log('Received refresh token:', { refreshToken });
            const newAccessToken = await this.authService.refreshAccessToken(refreshToken);
            return ({ accessToken: newAccessToken });
        }
        catch (error) {
            res.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: error.message });
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('google/login'),
    (0, common_1.UseGuards)(GoogleAuth_guard_1.GoogleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/redirect'),
    (0, common_1.UseGuards)(GoogleAuth_guard_1.GoogleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.Get)('status'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "user", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    (0, common_1.UseGuards)(Refresh_gurad_1.RefreshJwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map