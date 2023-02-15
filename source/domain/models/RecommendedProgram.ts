import {SimplifiedProgram} from "./Program";
import {Resident} from "./Resident";

export interface RecommendedProgram {
  program: SimplifiedProgram,
  numEngagedResidents: number,
  engagedResidents: Resident[],
}
