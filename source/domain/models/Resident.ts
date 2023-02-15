import {LevelOfCare} from './LevelOfCare'
import {Gender} from './Gender'

export interface Resident {
  userId: string,
  name: string,
  gender: Gender | undefined,
  birthday: Date,
  moveInDate: Date,
  levelOfCare: LevelOfCare | undefined,
  hobbies: string[] | undefined,
  roomNumber: number,
}

export interface JsonResident {
  userId: string,
  name: string,
  gender: `${Gender}` | null,
  birthday: string, // This is a date saved as a string
  moveInDate: string, // This is a date saved as a string
  levelOfCare: `${LevelOfCare}` | null,
  hobbies: string | null,
  roomNumber: string, // An int or number saved as a string
}

export function jsonResidentToDomain(jsonResident: JsonResident): Resident {
  return {
    ...jsonResident,
    gender: jsonResident.gender as Gender || undefined,
    birthday: new Date(jsonResident.birthday),
    moveInDate: new Date(jsonResident.moveInDate),
    levelOfCare: jsonResident.levelOfCare as LevelOfCare || undefined,
    hobbies: jsonResident.hobbies?.split(',').sort(),
    roomNumber: Number(jsonResident.roomNumber),
  }
}
