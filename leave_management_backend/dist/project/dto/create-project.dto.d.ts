export declare class CreateProjectDto {
    name: string;
    manager_id: number;
    description: string;
    start_date: Date;
    end_date?: Date;
    status: 'active' | 'inactive';
}
