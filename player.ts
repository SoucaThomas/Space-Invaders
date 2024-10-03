//player.ts
import GameEngine from "./Game";

enum Directions {
  Left = -1,
  Right = 1,
}

enum Action {
  Shoot,
}

const boxWidth = 64;
const boxHeight = 64;

class Player {
  x: number;
  y: number;
  boxStartX!: number;
  boxStartY!: number;
  boxEndX!: number;
  boxEndY!: number;

  private gameEngine: GameEngine;

  constructor(x: number, y: number, gameEngine: GameEngine) {
    this.x = x;
    this.y = y;
    this.gameEngine = gameEngine;

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        this.move(Directions.Right);
      } else if (e.key === "ArrowLeft") {
        this.move(Directions.Left);
      } else if (e.key === "ArrowUp") {
        this.action(Action.Shoot);
      }
    });

    this.calculateBox();
  }

  move(dir: Directions) {
    this.x += 10 * dir;

    this.calculateBox();
  }

  public draw() {
    this.gameEngine.spriteService.drawPlayer(this);
  }

  public update() {}

  private action(action: Action) {
    switch (action) {
      case Action.Shoot:
        this.gameEngine.shoot(this);
        break;
    }
  }

  private calculateBox() {
    this.boxStartX = this.x - 32;
    this.boxStartY = this.y - 32;
    this.boxEndX = this.x + 32;
    this.boxEndY = this.y + 32;
  }
}
export { Directions, Action };

export default Player;
