import { genPlayoffsNextRound } from "./Playoffs";
import { genRegularSeasonGames } from "./RegularSeason";
import Game from "../game/Game";
import { makeLeague, makeTeam } from "../testingObjs";

describe("League", () => {
  const league = makeLeague();

  it("Find team by location", () => {
    // test league has all teams with location of "test location"
    const team = league.getTeamByLocation("Test Location");

    expect(team).toBeTruthy();
  });

  it("Simulates season", () => {
    league.regularSeason.simWeek();
    league.regularSeason.simAll();

    expect(league.regularSeason.completed).toBeTruthy();
  });

  it("Simulates playoffs", () => {
    league.advToPlayoffs();

    league.playoffs.simRound();
    league.playoffs.simAll();
    expect(league.winner).toBeTruthy();
  });

  it("Simulates draft", () => {
    league.advToDraft();

    league.draft.sim();
  });

  it("Simulates free agency", () => {
    league.advToFreeAgency();

    league.freeAgents.sim();
  });
});

describe("Game Scheduling", () => {
  const team1 = makeTeam();
  const team2 = makeTeam();
  const team3 = makeTeam();
  const team4 = makeTeam();

  const teams = [team1, team2, team3, team4];
  it("Generates regular season", () => {
    const games = genRegularSeasonGames(teams);

    let count = 0;
    games.forEach((week: Game[]) => {
      week.forEach((game: Game) => {
        expect(game).toBeTruthy();
        count++;
      });
    });

    expect(count).toBe(6);
  });

  it("Generates playoffs rounds", () => {
    const round = genPlayoffsNextRound(teams);

    expect(round).toBeTruthy();
  });
});
