//player.ts
import GameEngine from "./Game";

enum Directions {
  Left = -1,
  Right = 1,
}

enum Action {
  Shoot,
}

class Player {
  x: number;
  y: number;
  boxStartX!: number;
  boxStartY!: number;
  boxEndX!: number;
  boxEndY!: number;
  public colisionBox!: colisionBox;

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

    this.calculateColisionBox();
  }

  move(dir: Directions) {
    this.x += 10 * dir;
  }

  public draw() {
    this.gameEngine.spriteService.drawPlayer(this);
    this.gameEngine.spriteService.drawColisionBox(this);
  }

  public update() {
    this.calculateColisionBox();
  }

  private calculateColisionBox() {
    this.colisionBox = {
      offsetX: this.x - 5,
      offsetY: this.y + 5,
      width: 10,
      height: 10,
    };
  }
  private action(action: Action) {
    switch (action) {
      case Action.Shoot:
        this.gameEngine.shoot(this);
        break;
    }
  }
}
export { Directions, Action };

export default Player;
