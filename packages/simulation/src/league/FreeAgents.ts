import Player from "../player/Player";

export default class FreeAgents {
  private players: Player[];

  get START_NUM_FREE_AGENTS(): number {
    return 60;
  }

  constructor(getId: () => number, genPlayerName: () => string) {
    const retire = (player: Player) => {
      this.removePlayer(player);
    };

    this.players = [];

    for (let i = 0; i < this.START_NUM_FREE_AGENTS; i++) {
      this.players.push(new Player(genPlayerName(), getId(), -1, retire));
    }

    this.sort();
  }

  removePlayer(player: Player): void {
    const foundAt = this.players.indexOf(player);

    if (foundAt === -1) {
      throw new Error(`Given invalid player`);
    }

    this.players.splice(foundAt, 1);
  }

  addPlayers(playersToAdd: Player[]): void {
    this.players.concat(playersToAdd);
    this.sort();
  }

  sort(): void {
    this.players.sort((a: Player, b: Player) => a.playerComp(b));
  }

  advanceYear(): void {
    this.players.forEach((player: Player) => {
      player.advanceYear();
    });
    this.sort();
  }

  simulate(): void {
    1 + 1;
  }
}