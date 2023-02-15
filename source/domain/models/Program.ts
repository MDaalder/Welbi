import {LevelOfCare} from "./LevelOfCare";
import {ProgramMode} from "./ProgramMode";

export interface Program {
  id: string,
  name: string,
  start: Date,
  end: Date,
  mode: ProgramMode,
  dimensions: string[],
  facilitators: string[],
  hobbies: string[] | undefined,
  levelsOfCare: LevelOfCare[],
  attendees: Record<'userId', string>[],
}

export type SimplifiedProgram = Pick<Program, 'id' | 'name' | 'mode' | 'hobbies' | 'levelsOfCare'>

export interface JsonProgram {
  id: string,
  name: string,
  start: string, // This is a date saved as a string
  end: string, // This is a date saved as a string
  mode: `${ProgramMode}`,
  dimensions: string,
  facilitators: string,
  hobbies: string | null,
  levelsOfCare: string,
  attendees: Record<'userId', string>[],
}

export function jsonProgramToDomain(jsonProgram: JsonProgram): Program {
    return {
      ...jsonProgram,
      start: new Date(jsonProgram.start),
      end: new Date(jsonProgram.end),
      mode: jsonProgram.mode as ProgramMode,
      dimensions: jsonProgram.dimensions.split(',').sort(),
      facilitators: jsonProgram.facilitators.split(',').sort(),
      hobbies: jsonProgram.hobbies?.split(',').sort(),
      levelsOfCare: jsonProgram.levelsOfCare.split(',').sort() as LevelOfCare[],
  }
}
