import {jsonResidentToDomain, Resident} from '../domain/models/Resident'
import {rawResidentAndProgramData} from './rawData'

export interface ResidentRepository {
  getAllResidents(): Resident[];
}

export class ResidentModel implements ResidentRepository {
  getAllResidents(): Resident[] {
    return [...rawResidentAndProgramData.residents]
      .map(resident => jsonResidentToDomain(resident))
  }
}
