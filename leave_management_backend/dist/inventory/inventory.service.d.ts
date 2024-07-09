import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import { Employee } from 'src/employee/entities/Employee.entity';
import { CreateInvetoryCategoryDto } from './dto/create-inventoryCategory.dto';
import { Category } from './entities/inventoryCategory.entity';
export declare class InventoryService {
    private inventoryRepository;
    private employeeRepository;
    private categoryRepository;
    constructor(inventoryRepository: Repository<Inventory>, employeeRepository: Repository<Employee>, categoryRepository: Repository<Category>);
    createInventory(createInventoryDto: CreateInventoryDto, req_mail: any): Promise<Inventory>;
    updateInventory(id: number, updatedInventoryDetails: UpdateInventoryDto, req_mail: any): Promise<Inventory>;
    showAllInventories(): Promise<Inventory[]>;
    ListOfInventories(): Promise<Inventory[]>;
    findOneInventory(id: number): Promise<Inventory | {
        message: string;
        inventory: Inventory;
    }>;
    deleteInventory(id: number, req_mail: any): Promise<string>;
    getAssignedInventory(employeeId: number): Promise<Inventory[]>;
    createCategory(createCategoryDto: CreateInvetoryCategoryDto, req_mail: any): Promise<Category>;
    showAllCategory(): Promise<Category[]>;
    assignInventoryToEmployee(empId: number, inventoryId: number): Promise<void>;
}
