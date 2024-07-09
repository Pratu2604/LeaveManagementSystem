"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthGuard = void 0;
const passport_1 = require("@nestjs/passport");
class GoogleAuthGuard extends (0, passport_1.AuthGuard)('google') {
    async canActivate(context) {
        const activate = (await super.canActivate(context));
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return activate;
    }
}
exports.GoogleAuthGuard = GoogleAuthGuard;
//# sourceMappingURL=GoogleAuth.guard.js.map