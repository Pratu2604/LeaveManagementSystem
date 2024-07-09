import { ApiProperty } from "@nestjs/swagger";

export class CreateInventoryDto {

    @ApiProperty({
        description:'name of inventory'
    })
    name: string;

    @ApiProperty({
        description:'serial no. of inventory'
    })
    serial_number:string;
    @ApiProperty({
        description:'category_id of inventory'
    })
    category_id:number;

}
