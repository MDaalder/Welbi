import {rawResidentAndProgramData} from "./rawData";
import {Program, jsonProgramToDomain} from "../domain/models/Program";

export interface ProgramRepository {
  getAllPrograms(): Program[]
}

export class ProgramModel implements ProgramRepository {
  getAllPrograms(): Program[] {
    return [...rawResidentAndProgramData.programs]
      .map(program => jsonProgramToDomain(program));
  }
}
