import { Inventory } from './inventory.entity';
export declare class Category {
    id: number;
    name: string;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
    deleted_at: Date;
    deleted_by: string;
    inventories: Inventory[];
}
