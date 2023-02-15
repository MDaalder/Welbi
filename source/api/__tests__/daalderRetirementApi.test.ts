describe('WelbiApi', () => {
  describe('getProgramsForIsolatedResidentsWithHobbies', () => {
    it('should return 3 programs for isolated residents', () => {})
  })

  describe('getResidentsAttendingGroupPrograms', () => {
    it('should return an array of all unique attendee userIds for all programs run', () => {})

    it('should return an array of unique attendee userIds for all programs run in a given time frame', () => {})

    it('should return no attendees if no programs run', () => {})

    it('should return no attendees if no programs run in the given time frame', () => {})

    it('should return no attendees if nobody attended the programs run', () => {})

  })

  describe('getUniquePrograms', () => {
    it('should not return duplicates of the same program run at a different time', () => {})

    it('should return programs of the same name if their levels of care are different', () => {})

    it('should return programs of the same name if their hobbies are different', () => {})

    it('should not return programs of the same name if only their dimensions are different', () => {})

  })

  describe('matchResidentsToPrograms', () => {
    it('should match a resident to a program with both a matching hobby and level of care', () => {})

    it('should not match a resident to a program more than once if they have more than one overlapping hobby', () => {})

    it('should match a resident to more than one program if they match with more than one program', () => {})

    it('should return a sorted array of programs in descending order of number of residents matched to the programs', () => {})

    it('should not match a resident to a program if they do note have both a matching hobby and level of care', () => {})

    it("should not match women or other gendered residents to a Men's program", () => {})

  })

  describe('getRecommendedPrograms', () => {
    it('should not recommend two programs of the same name in succession', () => {})

    it('should recommend the program with the most matching residents when two programs in succession have the same name', () => {})

    it('should not recommend two Bridge programs in succession', () => {})

    it("should not recommend two Men's programs in succession", () => {})

    it('should recommend two Entertainment programs in succession, if the hobbies covered are different', () => {})

    it('should recommend programs in descending order of number of residents engaged', () => {})

  })

})
