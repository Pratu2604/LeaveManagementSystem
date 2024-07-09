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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const inventory_entity_1 = require("./entities/inventory.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const Employee_entity_1 = require("../employee/entities/Employee.entity");
const inventoryCategory_entity_1 = require("./entities/inventoryCategory.entity");
let InventoryService = class InventoryService {
    constructor(inventoryRepository, employeeRepository, categoryRepository) {
        this.inventoryRepository = inventoryRepository;
        this.employeeRepository = employeeRepository;
        this.categoryRepository = categoryRepository;
    }
    async createInventory(createInventoryDto, req_mail) {
        try {
            const newInventory = this.inventoryRepository.create(createInventoryDto);
            newInventory.created_by = req_mail;
            if (!createInventoryDto.category_id) {
                throw new Error('Category ID is required to create inventory.');
            }
            const category = await this.categoryRepository.findOne({ where: { id: createInventoryDto.category_id } });
            newInventory.category = category;
            const savedInventory = await this.inventoryRepository.save(newInventory);
            return savedInventory;
        }
        catch (error) {
            throw error;
        }
    }
    async updateInventory(id, updatedInventoryDetails, req_mail) {
        const inventory = await this.inventoryRepository.findOneBy({ id });
        if (!inventory) {
            throw new common_1.NotFoundException('Inventory not found.');
        }
        for (const key in updatedInventoryDetails) {
            if (updatedInventoryDetails[key] !== undefined) {
                inventory[key] = updatedInventoryDetails[key];
            }
        }
        inventory.updated_by = req_mail;
        return await this.inventoryRepository.save(inventory);
    }
    async showAllInventories() {
        return await this.inventoryRepository.find({ where: { deleted_at: (0, typeorm_1.IsNull)(), employee: (0, typeorm_1.IsNull)() }, relations: ['category', 'employee'] });
    }
    async ListOfInventories() {
        const inventories = await this.inventoryRepository.find({ where: { deleted_at: (0, typeorm_1.IsNull)() }, relations: ['category', 'employee'] });
        return inventories;
    }
    async findOneInventory(id) {
        const inventory = await this.inventoryRepository.findOne({ where: { id, deleted_at: (0, typeorm_1.IsNull)() }, relations: ['employee'] });
        if (!inventory) {
            return { message: `Inventory with ID ${id} not found`, inventory };
        }
        return inventory;
    }
    async deleteInventory(id, req_mail) {
        const inventory = await this.inventoryRepository.findOneBy({ id });
        if (!inventory) {
            throw new common_1.NotFoundException(`Inventory with ID ${id} not found`);
        }
        inventory.employee = null;
        console.log("inventory.employee", inventory.employee);
        inventory.deleted_by = req_mail;
        inventory.deleted_at = new Date();
        await this.inventoryRepository.save(inventory);
        return (`Inventory with ID ${id} deleted by ${req_mail}`);
    }
    async getAssignedInventory(employeeId) {
        try {
            const assignedInventory = await this.inventoryRepository.find({
                where: { employee: { id: employeeId } },
                select: ['id', 'name'],
                relations: ['employee'],
            });
            return assignedInventory;
        }
        catch (error) {
            throw error;
        }
    }
    async createCategory(createCategoryDto, req_mail) {
        const newCategory = this.categoryRepository.create(createCategoryDto);
        newCategory.created_by = req_mail;
        return this.categoryRepository.save(newCategory);
    }
    async showAllCategory() {
        return await this.categoryRepository.find({ where: { deleted_at: (0, typeorm_1.IsNull)() } });
    }
    async assignInventoryToEmployee(empId, inventoryId) {
        try {
            const inventory = await this.inventoryRepository.findOne({
                where: { id: inventoryId },
                relations: ['employee'],
            });
            if (!inventory) {
                throw new Error('No inventory found.');
            }
            const employee = await this.employeeRepository.findOne({ where: { id: empId } });
            if (!employee) {
                throw new Error('No employee found.');
            }
            inventory.employee = employee;
            await this.inventoryRepository.save(inventory);
        }
        catch (error) {
            console.error('Error assigning inventory to employee:', error);
        }
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(inventory_entity_1.Inventory)),
    __param(1, (0, typeorm_2.InjectRepository)(Employee_entity_1.Employee)),
    __param(2, (0, typeorm_2.InjectRepository)(inventoryCategory_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map