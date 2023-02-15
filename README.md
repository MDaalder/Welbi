# Welbi

This system in its current state proposes three candidate programs to be run to try and engage multiple isolated residents. It also provides the number of residents that match with the program, and the residents themselves.

Assumptions made:
  - Residents were considered to be isolated if they did not attend a program in a given time frame. Frequency of attendance or time since last attendance was not considered.
  - Residents are more likely to engage with a program if their hobbies and level of care match those of the program(s)
  - All eligible programs exist in the raw data, and no brand-new programs are to be created
  - Program dimensions and facilitators were not considered for matching residents to programs
  - Past attendance of programs was not considered
  - Proposed programs should meet the match criteria with the most residents: uniqueness of residents in each program was not considered

To run the program, type in the terminal:
  - `npm install`
  - `tsc`
  - `npm run start` or `npm run dev` to be in watch mode with dev dependencies

To get the results of this first system, visit `http://localhost:3000/daalder-retirement/isolated-residents`.

Optional `startDate` and `endDate` parameters can be added to the url to search for isolated residents between the given dates. They should be acceptable Date inputs. 
For example: `http://localhost:3000/daalder-retirement/isolated-residents?startDate=2022-06-20T01:00:00.000Z&endDate=2022-06-29T01:00:00.000Z`

If I had more time:
  - I would add tests to test each method properly. A barebones scaffold is included
  - I would attempt to include programs that address residents without hobbies or level of care. This might include looking at past program attendance by those with null hobbies or level of care. For example, large dinners seem to attract many people, and many people without hobbies.
  - Think about if and how attendance and dimensions might be considered in the matching algorithm
  - I would stand up a basic frontend interface to interact with and display data
