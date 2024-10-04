import Player from "./player";
import { v4 as uuidv4 } from "uuid";
import GameEngine from "./Game";
import Enemy from "./Enemy";

class Bullet {
  public owner: Enemy | Player;
  public x!: number;
  public y!: number;
  public damage: number = 10;
  public speed: number = 3;
  public color: string = "white";

  public colisionBox!: colisionBox;

  private gameEngine: GameEngine;

  constructor(owner: Player | Enemy, gameEngine: GameEngine) {
    this.owner = owner;

    this.calculateColisionBox();

    if (owner instanceof Player) {
      this.x = owner.x;
      this.y = owner.y - gameEngine.spriteService.playerSprite.height / 2 - 15;
    } else if (owner instanceof Enemy) {
      this.x = owner.x;
      this.y = owner.y + gameEngine.spriteService.enemySprite.height / 2;
    }

    this.gameEngine = gameEngine;
  }

  update() {
    this.calculateColisionBox();

    if (this.owner instanceof Player) {
      this.y -= this.speed;
    } else if (this.owner instanceof Enemy) {
      this.y += this.speed;
    }

    if (this.y < 0 || this.y > this.gameEngine.canvas.height) {
      this.gameEngine.removeGameObject(this);
    }
  }

  public draw() {
    this.gameEngine.spriteService.drawBullet(this);
    this.gameEngine.spriteService.drawColisionBox(this);
  }

  private calculateColisionBox() {
    this.colisionBox = {
      offsetX: this.x - 5,
      offsetY: this.y + 5,
      width: 10,
      height: 10,
    };
  }
}

export default Bullet;
