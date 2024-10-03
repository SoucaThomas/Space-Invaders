import GameEngine from "./Game";
import Bullet from "./Bullet";

class Enemy {
  x: number;
  y: number;
  public health: number = 100;
  public scoreOnDeath: number = 100;
  public speed: number = 2;
  public colisionBox!: colisionBox;

  private gameEngine: GameEngine;
  constructor(x: number, y: number, gameEngine: GameEngine) {
    this.x = x;
    this.y = y;
    this.gameEngine = gameEngine;

    this.calculateColisionBox();
  }

  public collision(gameObject: any) {
    if (gameObject instanceof Bullet) {
      this.health -= gameObject.damage;
      this.gameEngine.removeGameObject(gameObject);

      if (this.health <= 0) {
        this.gameEngine.score += this.scoreOnDeath;
        this.gameEngine.removeGameObject(this);
      }
    }
  }

  update() {
    this.y += this.speed;

    this.calculateColisionBox();

    if (this.y > this.gameEngine.canvas.height) {
      this.gameEngine.removeGameObject(this);
    }
  }

  draw() {
    this.gameEngine.spriteService.drawEnemy(this);
    this.gameEngine.spriteService.drawColisionBox(this);
  }

  private calculateColisionBox() {
    this.colisionBox = {
      offsetX: this.x - this.gameEngine.spriteService.enemySprite.width / 2,
      offsetY: this.y - this.gameEngine.spriteService.enemySprite.height / 2,
      width: this.gameEngine.spriteService.enemySprite.width,
      height: this.gameEngine.spriteService.enemySprite.height,
    };
  }
}

export default Enemy;
