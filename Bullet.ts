import Player from "./player";
import { v4 as uuidv4 } from "uuid";
import GameEngine from "./Game";

class Bullet {
  public owner: Bullet | Player;
  public x: number;
  public y: number;
  public id: string = uuidv4();

  private gameEngine: GameEngine;

  constructor(owner: any, gameEngine: GameEngine) {
    this.owner = owner;

    this.x = owner.x;
    this.y = owner.y;

    this.gameEngine = gameEngine;
    console.log("Bullet created by " + owner.constructor.name);
  }

  update() {
    this.y -= 10;

    if (this.y < 0) {
      this.gameEngine.removeGameObject(this);
    }
  }

  public draw() {
    this.gameEngine.spriteService.drawBullet(this.x, this.y);
  }
}

export default Bullet;
