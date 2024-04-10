import { HttpStatus, Injectable } from '@nestjs/common';
import { Programs } from "../../program/entities/program.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramDto } from "../../program/dto/program.dto";
import { SuccessResponse } from 'src/success-response';
import { ErrorResponseTypeOrm } from 'src/error-response-typeorm';
import { ProgramSearchDto } from "../../program/dto/program-search.dto";

@Injectable()
export class HasuraProgramService {
    constructor(
        @InjectRepository(Programs)
        private programRepository: Repository<Programs>
    ) { }
    public async getProgram(programId: string, request: any) {}
    public async createProgram(request: any, programDto: ProgramDto) {}
}