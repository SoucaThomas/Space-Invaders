import Player from "./player";
import { v4 as uuidv4 } from "uuid";
import GameEngine from "./Game";
import Enemy from "./Enemy";

class Bullet {
  public owner: Bullet | Player;
  public x: number;
  public y: number;
  public damage: number = 10;

  public colisionBox!: colisionBox;

  private gameEngine: GameEngine;

  constructor(owner: any, gameEngine: GameEngine) {
    this.owner = owner;

    this.x = owner.x;
    this.y = owner.y;

    this.calculateColisionBox();

    this.gameEngine = gameEngine;
  }

  update() {
    this.calculateColisionBox();

    if (this.owner instanceof Player) {
      this.y -= 20;
    } else if (this.owner instanceof Enemy) {
      this.y += 20;
    }

    if (this.y < 0) {
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
