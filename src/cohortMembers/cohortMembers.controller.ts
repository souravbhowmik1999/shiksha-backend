import {
  ApiTags,
  ApiBody,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
  ApiHeader,
  ApiQuery,
} from "@nestjs/swagger";
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
  Headers,
  Res,
  UseGuards,
  Query,
} from "@nestjs/common";
import { CohortMembersSearchDto } from "./dto/cohortMembers-search.dto";
import { Request } from "@nestjs/common";
import { CohortMembersDto } from "./dto/cohortMembers.dto";
import { CohortMembersAdapter } from "./cohortMembersadapter";
import { CohortMembersService } from "./cohortMember.service";
import { Response } from "express";
import { CohortMembersUpdateDto } from "./dto/cohortMember-update.dto";
import { JwtAuthGuard } from "src/common/guards/keycloak.guard";

@ApiTags("Cohort Members")
@Controller("cohortmembers")
@UseGuards(JwtAuthGuard)
export class CohortMembersController {
  constructor(private readonly cohortMembersService: CohortMembersService) {}

  //create cohort members
  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Cohort Members has been created successfully.",
  })
  @ApiBody({ type: CohortMembersDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiHeader({
    name: "tenantid",
  })
  public async createCohortMembers(
    @Headers() headers,
    @Req() request: Request,
    @Body() cohortMembersDto: CohortMembersDto,
    @Res() response: Response
  ) {
    let tenantid = headers["tenantid"];
    const payload = {
      tenantId: tenantid,
    };
    Object.assign(cohortMembersDto, payload);

    return this.cohortMembersService.createCohortMembers(
      request,
      cohortMembersDto,
      response
    );
  }

  //get cohort members
  @Get("/:userId")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Cohort Members detail" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({strategy: "excludeAll"})
  @ApiHeader({name: "tenantid"})
  @ApiQuery({ name: 'fieldvalue', description: 'The field Value (optional)', required: false })
  public async getCohortMembers(
    @Headers() headers,
    @Param("userId") userId: string,
    @Req() request: Request,
    @Res() response: Response,
    @Query("fieldvalue") fieldvalue: string | null = null
  ) {
    let tenantid = headers["tenantid"];
    // const result = await this.userAdapter.buildUserAdapter().createUser(request, userCreateDto);

    const result = await this.cohortMembersService.getCohortMembers(
      tenantid,
      userId,
      response,
      request
    );
    return response.status(result.statusCode).json(result);
  }

  // search
  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Cohort Members list." })
  @ApiBody({ type: CohortMembersSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  @ApiHeader({
    name: "tenantid",
  })
  public async searchCohortMembers(
    @Headers() headers,
    @Req() request: Request,
    @Res() response: Response,
    @Body() cohortMembersSearchDto: CohortMembersSearchDto
  ) {
    let tenantid = headers["tenantid"];
    return this.cohortMembersService.searchCohortMembers(
      tenantid,
      request,
      cohortMembersSearchDto,
      response
    );
  }

  //update
  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Cohort Members has been updated successfully.",
  })
  @ApiBody({ type: CohortMembersUpdateDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateCohortMembers(
    @Param("id") cohortMembersId: string,
    @Req() request: Request,
    @Body() cohortMemberUpdateDto: CohortMembersUpdateDto,
    @Res() response: Response
  ) {
    return this.cohortMembersService.updateCohortMembers(
      cohortMembersId,
      request,
      cohortMemberUpdateDto,
      response
    );
  }

  //delete
  @Delete("/:id")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Cohort member deleted successfully" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  @ApiHeader({
    name: "tenantid",
  })
  public async deleteCohortMember(
    @Headers() headers,
    @Param("id") cohortMembershipId: string,
    @Req() request: Request,
    @Res() response: Response
  ) {
    let tenantid = headers["tenantid"];

    return this.cohortMembersService.deleteCohortMemberById(
      tenantid,
      cohortMembershipId,
      response,
      request
    );
  }
}
