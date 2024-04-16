import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";
import { CohortCreateDto } from "./cohort-create.dto";


export class CohortSearchDto {
  @ApiProperty({
    type: String,
    description: "Limit",
  })
  @IsNumberString()
  limit: string;

  @ApiProperty({
    type: Number,
    description: "number",
  })
  page: number;

  @ApiProperty({
    type: CohortCreateDto,
    description: "Filters",
  })
  @ApiPropertyOptional()
  filters: CohortCreateDto;

  constructor(partial: Partial<CohortSearchDto>) {
    Object.assign(this, partial);
  }
}
