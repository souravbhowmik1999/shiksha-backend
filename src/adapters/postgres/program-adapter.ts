import { HttpStatus, Injectable } from '@nestjs/common';
import { Programs } from "../../program/entities/program.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramDto } from "../../program/dto/program.dto";
import { SuccessResponse } from 'src/success-response';
import { ErrorResponseTypeOrm } from 'src/error-response-typeorm';
import { ProgramSearchDto } from "../../program/dto/program-search.dto";

@Injectable()
export class PostgresProgramService {
    constructor(
        @InjectRepository(Programs)
        private programRepository: Repository<Programs>
    ) { }
    public async getProgram(programId: string, request: any) {

        try {
            const [results, totalCount] = await this.programRepository.findAndCount({
                where: { programId }
            })
            return new SuccessResponse({
                statusCode: HttpStatus.OK,
                message: 'Ok.',
                totalCount,
                data: results,
            });
        } catch (e) {
            return new ErrorResponseTypeOrm({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                errorMessage: e,
            });
        }
    }

    public async createProgram(request: any, programDto: ProgramDto) {
        try {
            const response = await this.programRepository.save(programDto);
            return new SuccessResponse({
                statusCode: HttpStatus.CREATED,
                message: "Ok.",
                data: response,
            });
        } catch (e) {
            return new ErrorResponseTypeOrm({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                errorMessage: e,
            });
        }
    }
}