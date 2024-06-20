import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsNumberString, IsObject, IsOptional, IsString, IsUUID, ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";
import { CohortDto } from "./cohort.dto";
import { Expose } from "class-transformer";

export class filtersProperty {
  //userIdBy
  @ApiProperty({
    type: String,
    description: "User Id",
    default: "",
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  userId?: string;

  //cohortIdBy
  @ApiProperty({
    type: String,
    description: "Cohort Id",
    default: "",
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  cohortId?: string;

  //name
  @ApiProperty({
    type: String,
    description: "The name of the cohort",
    default: "",
  })
  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  //parentId
  @ApiProperty({
    type: [String],
    description: "Parent Id",
    default: [],
  })
  @Expose()
  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsUUID(undefined, { each: true })
  parentId?: string[];
}

export class CohortSearchDto {
  @ApiProperty({
    type: Number,
    description: "Limit",
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    type: Number,
    description: "Page",
  })
  @IsNumber()
  page: number;

  @ApiProperty({
    type: filtersProperty,
    description: "Filters",
  })
  @IsObject()
  filters: filtersProperty;

  constructor(partial: Partial<CohortSearchDto>) {
    Object.assign(this, partial);
  }
}
