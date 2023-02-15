import {Router} from "express";
import {DaalderRetirementApi} from "../api/DaalderRetirementApi";
import {ResidentModel} from "../infrastructure/ResidentModel";
import {ProgramModel} from "../infrastructure/ProgramModel";

const router = Router();
const api = new DaalderRetirementApi(new ResidentModel(), new ProgramModel());

// This has optional startDate and endDate query parameters that should work with JavaScript Date.
// The parameters are used to determine what residents did not attend programs between those dates.
// Default is to look through all programs regardless of date.
// Returns 3 suggested programs, the number of residents they may appeal to, and which residents each may appeal to.
router.get("/isolated-residents", (req, res) => {
  try {
    const startDate = typeof req.query.startDate === 'string' ? new Date(req.query.startDate) : undefined
    const endDate = typeof req.query.endDate === 'string' ? new Date(req.query.endDate) : undefined

    const programs = api.getProgramsForIsolatedResidentsWithHobbies(startDate, endDate);
    res.send(JSON.stringify(programs));
  }
  catch(error) {
    console.error(error)
    res.sendStatus(500)
  }
});

export default router;
