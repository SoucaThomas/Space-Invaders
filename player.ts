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
  public colisionBox!: colisionBox;

  private gameEngine: GameEngine;
  private lastTimeShot: number = 0;

  constructor(x: number, y: number, gameEngine: GameEngine) {
    this.x = x;
    this.y = y;
    this.gameEngine = gameEngine;

    this.calculateColisionBox();
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
      offsetX: this.x - this.gameEngine.spriteService.playerSprite.width / 2,
      offsetY: this.y - this.gameEngine.spriteService.playerSprite.height / 2,
      width: this.gameEngine.spriteService.playerSprite.width,
      height: this.gameEngine.spriteService.playerSprite.height,
    };
  }
  private action(action: Action) {
    switch (action) {
      case Action.Shoot:
        if (
          performance.now() - this.lastTimeShot >
          this.gameEngine.bulletCooldown
        ) {
          this.gameEngine.shoot(this);
          this.lastTimeShot = performance.now();
        }
        break;
    }
  }
}
export { Directions, Action };

export default Player;
