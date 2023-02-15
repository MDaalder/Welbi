# Welbi

This system in its current state proposes three candidate programs to be run to try and engage multiple isolated residents. It also provides the number of residents that match with the program, and the residents themselves.
The assumptions made were that the residents are more likely to engage with a program if their hobbies and level of care match those of the program(s). Residents were considered to be isolated if they did not attend a program in a given time frame. 

To run the program, type in the terminal:
  - `npm install`
  - `npm run dev`

To get the results of this first system, visit `http://localhost:3000/daalder-retirement/isolated-residents`.

Optional `startDate` and `endDate` parameters can be added to the url to search for isolated residents between the given dates. 
For example: `http://localhost:3000/daalder-retirement/isolated-residents?startDate=2022-06-20T01:00:00.000Z&endDate=2022-06-29T01:00:00.000Z`

If I had more time:
  - I would add tests to test each method properly. A barebones scaffold is included.
  - I would attempt to include programs that address residents without hobbies or level of care. This might include looking at past program attendance by those without hobbies or level of care noted.
