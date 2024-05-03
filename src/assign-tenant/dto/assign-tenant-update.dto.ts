import { Expose } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID, IsArray } from "class-validator";

export class UpdateAssignTenantDto {
    @ApiPropertyOptional({
        type: String,
        description: "User Id of User",
        default: "",
    })
    @Expose()
    @IsUUID()
    userId: string;


    @ApiPropertyOptional({
        type: String,
        description: "Tenant Id",
        default: [],
    })
    @Expose()
    @IsArray()
    @IsUUID(undefined, { each: true })
    tenantId: string;

    constructor(obj: any) {
        Object.assign(this, obj);
    }

}

// export class ResponseAssignRoleDto {
//   @Expose()
//   userId: string;

//   @Expose()
//   roleId: string;

//   @Expose()
//   tenantId: string;

//   @Expose()
//   message: string;

//   constructor(data: { userId: string; roleId: string; tenantId: string }, message: string) {
//     this.userId = data.userId;
//     this.roleId = data.roleId; 
//     this.tenantId = data.tenantId;
//     this.message = message;
//   }
// }

