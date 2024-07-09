import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { CreateInvetoryCategoryDto } from './dto/create-inventoryCategory.dto';
import { Category } from './entities/inventoryCategory.entity';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    createInventory(createInventoryDto: CreateInventoryDto, req: any): Promise<Inventory>;
    findAllInventories(): Promise<Inventory[]>;
    ListOfInventories(): Promise<Inventory[]>;
    findOneInventory(id: number): Promise<Inventory | {
        message: string;
        inventory: Inventory;
    }>;
    updateInventory(id: number, updateInventoryDto: UpdateInventoryDto, req: any): Promise<Inventory>;
    deleteInventory(id: number, req: any): Promise<string>;
    getAssignedInventory(employeeId: number): Promise<Inventory[]>;
    createCategory(createInvetoryCategoryDto: CreateInvetoryCategoryDto, req: any): Promise<Category>;
    findAllCategory(): Promise<Category[]>;
}
