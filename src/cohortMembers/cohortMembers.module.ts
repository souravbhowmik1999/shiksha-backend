import { Module } from "@nestjs/common";
import { CohortMembersController } from "./cohortMembers.controller";
import { HttpModule } from "@nestjs/axios";
import { CohortMembersAdapter } from "./cohortMembersadapter";
import { HasuraModule } from "src/adapters/hasura/hasura.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CohortMembers } from "./entities/cohort-member.entity";
import { CohortMembersService } from "./cohortMember.service";
import { User } from "../user/entities/user-entity";
import { Fields } from "../fields/entities/fields.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([CohortMembers, User, Fields]),
    HttpModule,
    HasuraModule,
  ],
  controllers: [CohortMembersController],
  providers: [CohortMembersAdapter, CohortMembersService],
})
export class CohortMembersModule {}
