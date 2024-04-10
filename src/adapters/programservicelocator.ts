import { ProgramSearchDto } from "../program/dto/program-search.dto";
import { ProgramDto } from "../program/dto/program.dto";

export interface IServicelocatorProgram {
    getProgram(
        programId?: string,
        request?: any,
    );
    // updateProgram(id?: string, request?: any, userDto?: any);
    createProgram(request: any, programDto: ProgramDto);
    // searchProgram(tenantid, request: any, programSearchDto: ProgramSearchDto);
    // deleteProgram(programId);
}
