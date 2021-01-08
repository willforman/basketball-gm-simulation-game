import { getTeamNames, getId, genPlayerName } from "../mockObjs";
import Team from "../team/Team";
import Player from "../player/Player";
import { TeamNames } from "../models";
import DraftPicks from "./DraftPicks";

const makeTeam = (teamNamesGiven?: TeamNames): Team => {
  const teamNames = teamNamesGiven ?? getTeamNames();
  return new Team(teamNames, 2021, genPlayerName, getId);
};

describe("Team", () => {
  const team = makeTeam();
  it("Gets player by postion", () => {
    const pos = 0;
    const player = team.getStarter(pos);

    expect(player).toEqual(
      expect.objectContaining({
        pos,
      })
    );
  });
});

describe("Roster", () => {
  const team = makeTeam();
  it("Subs lineup", () => {
    const roster = team.getRoster();

    const subs = roster.getSubs();

    const newPos = subs.map((player: Player) => player.getPositionNum());

    for (let i = 0; i < 5; i++) {
      expect(newPos[i]).toBe(i); // needs to be correct position
    }
  });
});

describe("Draft Picks", () => {
  const team1 = makeTeam({
    name: "Team 1",
    location: "Loc 1",
    abbreviation: "T1",
  });

  const team2 = makeTeam({
    name: "Team 2",
    location: "Loc 2",
    abbreviation: "T2",
  });

  const draftPicks = new DraftPicks(team1);
  it("Gets years picks", () => {
    const picks = draftPicks.getAndRemoveCurrYearPicks();

    expect(picks[0]).toBeTruthy();
  });

  it("Advances year", () => {
    draftPicks.advanceYear();

    expect(draftPicks.getPicks().length).toBe(
      draftPicks.GEN_PICKS_YEARS_AHEAD * 2
    );
  });

  it("Changes ownership", () => {
    const yearsAhead = 0;
    const round = 1;

    draftPicks.changeOwnership(yearsAhead, round, team2);

    expect(
      draftPicks.getPick(yearsAhead, round).teamOwning.getAbreviation()
    ).toBe(team2.getAbreviation());
  });
});
