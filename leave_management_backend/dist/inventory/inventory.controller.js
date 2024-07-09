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
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const inventory_service_1 = require("./inventory.service");
const create_inventory_dto_1 = require("./dto/create-inventory.dto");
const update_inventory_dto_1 = require("./dto/update-inventory.dto");
const inventory_entity_1 = require("./entities/inventory.entity");
const create_inventoryCategory_dto_1 = require("./dto/create-inventoryCategory.dto");
const swagger_1 = require("@nestjs/swagger");
const inventoryCategory_entity_1 = require("./entities/inventoryCategory.entity");
const JwtAuthGuard_1 = require("../auth/guards/JwtAuthGuard");
let InventoryController = class InventoryController {
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    async createInventory(createInventoryDto, req) {
        const req_mail = req.user.user.email;
        try {
            return await this.inventoryService.createInventory(createInventoryDto, req_mail);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    findAllInventories() {
        return this.inventoryService.showAllInventories();
    }
    ListOfInventories() {
        return this.inventoryService.ListOfInventories();
    }
    async findOneInventory(id) {
        return await this.inventoryService.findOneInventory(id);
    }
    async updateInventory(id, updateInventoryDto, req) {
        const req_mail = req.user.user.email;
        try {
            return await this.inventoryService.updateInventory(id, updateInventoryDto, req_mail);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteInventory(id, req) {
        const req_mail = req.user.user.email;
        return await this.inventoryService.deleteInventory(id, req_mail);
    }
    async getAssignedInventory(employeeId) {
        try {
            const assignedInventory = await this.inventoryService.getAssignedInventory(employeeId);
            return assignedInventory;
        }
        catch (error) {
            throw error;
        }
    }
    async createCategory(createInvetoryCategoryDto, req) {
        const req_mail = req.user.user.email;
        try {
            console.log("..................................");
            return await this.inventoryService.createCategory(createInvetoryCategoryDto, req_mail);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    findAllCategory() {
        return this.inventoryService.showAllCategory();
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Inventory will be created as response',
        type: inventory_entity_1.Inventory
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_inventory_dto_1.CreateInventoryDto, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createInventory", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get List of all Inventories',
        type: [inventory_entity_1.Inventory]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findAllInventories", null);
__decorate([
    (0, common_1.Get)('/list_of_inventories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "ListOfInventories", null);
__decorate([
    (0, common_1.Get)('oneInventory/:id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get Inventory of given ID',
        type: inventory_entity_1.Inventory
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "findOneInventory", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Inventory will be updated as response',
        type: inventory_entity_1.Inventory
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_inventory_dto_1.UpdateInventoryDto, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "updateInventory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Inventory will be deleted as response'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "deleteInventory", null);
__decorate([
    (0, common_1.Get)('assigned/:employeeId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get list of Inventories assigned to given employee ID',
        type: inventory_entity_1.Inventory
    }),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getAssignedInventory", null);
__decorate([
    (0, common_1.Post)("/category"),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Category will be created as response',
        type: inventoryCategory_entity_1.Category
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_inventoryCategory_dto_1.CreateInvetoryCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)('allCategory'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get List Of All Categories of Inventories',
        type: [inventoryCategory_entity_1.Category]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findAllCategory", null);
exports.InventoryController = InventoryController = __decorate([
    (0, swagger_1.ApiTags)('Inventory'),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, common_1.Controller)('inventory'),
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map