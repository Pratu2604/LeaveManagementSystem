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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const inventory_entity_1 = require("./inventory.entity");
const swagger_1 = require("@nestjs/swagger");
let Category = class Category {
};
exports.Category = Category;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id of Category'
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name ofCategory'
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date on which Category created'
    }),
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Category.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category created By'
    }),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Category.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date on which category updated'
    }),
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Category.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category updatyed by'
    }),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Category.prototype, "updated_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'the date on which category deleted '
    }),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Category.prototype, "deleted_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category deleted by'
    }),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Category.prototype, "deleted_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Inventories',
        type: () => inventory_entity_1.Inventory
    }),
    (0, typeorm_1.OneToMany)(() => inventory_entity_1.Inventory, (inventory) => inventory.category),
    __metadata("design:type", Array)
], Category.prototype, "inventories", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)('categories')
], Category);
//# sourceMappingURL=inventoryCategory.entity.js.map