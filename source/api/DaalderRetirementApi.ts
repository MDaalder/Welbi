import {ResidentRepository} from '../infrastructure/ResidentModel'
import {ProgramRepository} from '../infrastructure/ProgramModel'
import {Program, SimplifiedProgram} from '../domain/models/Program'
import {Resident} from '../domain/models/Resident'
import {ProgramMode} from '../domain/models/ProgramMode'
import {LevelOfCare} from '../domain/models/LevelOfCare'
import {Gender} from '../domain/models/Gender'
import {RecommendedProgram} from '../domain/models/RecommendedProgram'

export class DaalderRetirementApi {
  residentRepository: ResidentRepository
  programRepository: ProgramRepository

  constructor(
    residentRepository: ResidentRepository,
    programRepository: ProgramRepository,
  ) {
    this.residentRepository = residentRepository
    this.programRepository = programRepository
  }

  getProgramsForIsolatedResidentsWithHobbies(
    startDate?: Date,
    endDate?: Date,
  ): RecommendedProgram[] | string {
    try {
      const allPrograms: Program[] = this.programRepository.getAllPrograms()
      const allResidents: Resident[] = this.residentRepository.getAllResidents()

      const residentsAttendingPrograms: Resident['userId'][] = this.getResidentsAttendingGroupPrograms(allPrograms, startDate, endDate)
      const isolatedResidents: Resident[] = allResidents.filter(resident => !residentsAttendingPrograms.includes(resident.userId))

      if (!isolatedResidents.length) {
        return 'There are no isolated residents for this time period!'
      }

      // Map of unique simplified programs, keyed by creating a string of the program's fields
      // Created to shorten the number of elements looped over in later computations
      const uniqueProgramsMap: Map<string, SimplifiedProgram> = this.getUniquePrograms(allPrograms)

      const sortedProgramsMatchedToResidents: [SimplifiedProgram, Resident[]][] = this.matchResidentsToPrograms(isolatedResidents, uniqueProgramsMap)
      const recommendedPrograms: [SimplifiedProgram, Resident[]][] = this.getRecommendedPrograms(sortedProgramsMatchedToResidents)

      return recommendedPrograms.slice(0, 3).map( ([program, residents]) => {
        return {
          program,
          numEngagedResidents: residents.length,
          totalIsolatedResidents: isolatedResidents.length,
          engagedResidents: residents,
        } as RecommendedProgram
      })
    }
    catch(error) {
      console.error(error)
      throw new Error('Something bad happened')
    }
  }

  private mapKey = (program: SimplifiedProgram): string => {
    return `${program.name}-${program.mode}-${program.hobbies}-${program.levelsOfCare}`
  }

  private getResidentsAttendingGroupPrograms(
    programs: Program[],
    startDate: Date = new Date(0),
    endDate: Date = new Date(),
  ): Resident['userId'][] {

    const attendeeIds: Set<Resident['userId']> = programs.reduce( (acc: Set<Resident['userId']>, program) => {
      if (program.mode !== ProgramMode.ONEONONE && program.start > startDate && program.end < endDate) {
        program.attendees.forEach( (attendee: { userId: string }) => {
          acc.add(attendee.userId)
        })
      }

      return acc
    }, new Set<Resident['userId']>())

    return Array.from(attendeeIds)
  }

  private getUniquePrograms(
    programs: Program[],
  ): Map<string, SimplifiedProgram> {
    const uniqueProgramsMap = new Map<string, SimplifiedProgram>()

    programs.forEach( program => {
      if (program.mode !== ProgramMode.ONEONONE) {
        const key = this.mapKey(program)

        if (!uniqueProgramsMap.has(key)) {
          uniqueProgramsMap.set(key, {
            id: program.id,
            name: program.name,
            mode: program.mode as ProgramMode,
            hobbies: program.hobbies,
            levelsOfCare: program.levelsOfCare as LevelOfCare[],
          })
        }
      }
    })

    return uniqueProgramsMap
  }

  private matchResidentsToPrograms(
    residents: Resident[],
    uniqueProgramsMap: Map<string, SimplifiedProgram>,
  ): [SimplifiedProgram, Resident[]][] {
    // Array of objects created each time a program matches to a unique resident based on their level of care and hobbies
    const engagingPrograms: ({ program: SimplifiedProgram, resident: Resident })[] = []

    for (const resident of residents) {
      for (const [_, program] of uniqueProgramsMap) {
        if (resident.hobbies && program.hobbies && resident.levelOfCare && program.levelsOfCare
          && program.levelsOfCare.includes(resident.levelOfCare)) {
          for (const hobby of resident.hobbies) {
            if (program.hobbies.includes(hobby)) {

              if (program.name.includes("Men's")) {
                resident.gender === Gender.Male
                  ? engagingPrograms.push({program, resident})
                  : undefined
                break
              }

              engagingPrograms.push({program, resident})
              break
            }
          }
        }
      }
    }

    // Record of each unique program's map key and all the residents that may want to engage with that program
    const residentsMatchedToUniquePrograms: Record<string, Resident[]> = engagingPrograms
      .reduce((count: Record<string, Resident[]>, curr) => {
        count[this.mapKey(curr.program)] = count[this.mapKey(curr.program)]
          ? [...count[this.mapKey(curr.program)], curr.resident]
          : [curr.resident]

        return count
      }, {})

    // Programs sorted by the number of residents they appeal to
    return Object.entries(residentsMatchedToUniquePrograms)
      .sort((a, b) => b[1].length - a[1].length).map(([mapKey, residentArr]) => {
        return [uniqueProgramsMap.get(mapKey) as SimplifiedProgram, residentArr]
      })
  }

  private getRecommendedPrograms(
    sortedPrograms: [SimplifiedProgram, Resident[]][],
  ): [SimplifiedProgram, Resident[]][] {

    // Creates an array of recommended programs. It will try not to recommend the same program in succession.
    const recommendedPrograms: [SimplifiedProgram, Resident[]][] = sortedPrograms
      .reduce( (acc, curr) => {
        if (!acc.length) {
          acc.push(curr)
          return acc
        }

        const currName = curr[0].name
        const lastAccName = acc[acc.length - 1][0].name

        if (
          currName && lastAccName && !currName.includes('Entertainment') &&
          (currName === lastAccName || (currName.includes('Bridge') && lastAccName.includes('Bridge')) || (currName.includes("Men's") && lastAccName.includes("Men's")))
        ) {
          acc[acc.length - 1] = acc[acc.length - 1][1].length > curr[1].length
            ? acc[acc.length - 1]
            : curr
          return acc
        }

        acc.push(curr)
        return acc
    }, [sortedPrograms[0]])

    return recommendedPrograms
  }
}
