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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInventoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateInventoryDto {
}
exports.CreateInventoryDto = CreateInventoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'name of inventory'
    }),
    __metadata("design:type", String)
], CreateInventoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'serial no. of inventory'
    }),
    __metadata("design:type", String)
], CreateInventoryDto.prototype, "serial_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'category_id of inventory'
    }),
    __metadata("design:type", Number)
], CreateInventoryDto.prototype, "category_id", void 0);
//# sourceMappingURL=create-inventory.dto.js.map