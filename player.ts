//player.ts
import Bullet from "./Bullet";
import Enemy from "./Enemy";
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
  public health: number = 100;
  public scoreOnHit: number = -10;
  public color: string = "green";
  public angle: number = 0;
  public velocity = {
    x: 0,
    y: 0,
  };

  private gameEngine: GameEngine;
  private lastTimeShot: number = 0;
  private KeyPressed: Map<Directions | Action, { isPressed: boolean }> =
    new Map<Directions | Action, { isPressed: boolean }>([
      [Directions.Right, { isPressed: false }],
      [Directions.Left, { isPressed: false }],
      [Action.Shoot, { isPressed: false }],
    ]);

  private healthElement: HTMLProgressElement;

  constructor(x: number, y: number, gameEngine: GameEngine) {
    this.x = x;
    this.y = y;
    this.gameEngine = gameEngine;

    this.healthElement = document.getElementById(
      "health"
    ) as HTMLProgressElement;
    this.calculateColisionBox();

    window.addEventListener("keydown", (e) => {
      if (e.key === "D" || e.key === "d") {
        this.KeyPressed.get(Directions.Right)!.isPressed = true;
      }
      if (e.key === "A" || e.key === "a") {
        this.KeyPressed.get(Directions.Left)!.isPressed = true;
      }
      if (e.key === "W" || e.key === "w") {
        this.KeyPressed.get(Action.Shoot)!.isPressed = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "D" || e.key === "d") {
        this.KeyPressed.get(Directions.Right)!.isPressed = false;
      }
      if (e.key === "A" || e.key === "a") {
        this.KeyPressed.get(Directions.Left)!.isPressed = false;
      }
      if (e.key === "W" || e.key === "w") {
        this.KeyPressed.get(Action.Shoot)!.isPressed = false;
      }
    });

    this.calculateColisionBox();
  }

  public draw() {
    this.gameEngine.spriteService.drawPlayer(this);
    this.gameEngine.spriteService.drawColisionBox(this);
  }

  public update() {
    this.calculateColisionBox();

    if (this.KeyPressed.get(Directions.Right)!.isPressed) {
      this.velocity.x = this.gameEngine.playerSpeed;
      this.angle = 15;
    } else if (this.KeyPressed.get(Directions.Left)!.isPressed) {
      this.velocity.x = -this.gameEngine.playerSpeed;
      this.angle = -15;
    } else {
      this.velocity.x = 0;
      this.angle = 0;
    }

    if (this.KeyPressed.get(Action.Shoot)!.isPressed) {
      this.action(Action.Shoot);
    }

    this.x += this.velocity.x;
  }

  public collision(gameObject: any) {
    if (gameObject instanceof Bullet) {
      if (gameObject.owner instanceof Enemy) {
        this.health -= gameObject.damage;
        this.healthElement.value = this.health;
        this.gameEngine.removeGameObject(gameObject);
        this.gameEngine.score += this.scoreOnHit;
      }
    }
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
