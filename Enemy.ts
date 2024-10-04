import GameEngine from "./Game";
import Bullet from "./Bullet";

class Enemy {
  x: number;
  y: number;
  public health: number = 30;
  public scoreOnDeath: number = 100;
  public speed: number = 0.5;
  public colisionBox!: colisionBox;
  public color: string = "purple";

  private lastTimeShot: number = 0;

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

    this.x += this.gameEngine.enemysMoveDirection * this.speed * 2;

    // Check if the enemy hits the edge of the canvas and reverse direction
    if (
      this.x - this.gameEngine.spriteService.enemySprite.width / 2 <= 0 ||
      this.x + this.gameEngine.spriteService.enemySprite.width / 2 >=
        this.gameEngine.canvas.width
    ) {
      this.gameEngine.enemysMoveDirection *= -1;
    }

    this.calculateColisionBox();

    if (this.y > this.gameEngine.canvas.height) {
      this.gameEngine.removeGameObject(this);
      this.gameEngine.score -= 100;
    }
  }

  draw() {
    this.gameEngine.spriteService.drawEnemy(this);
    this.gameEngine.spriteService.drawColisionBox(this);
  }

  public shoot() {
    if (performance.now() - this.lastTimeShot > 1000) {
      this.gameEngine.shoot(this);
      this.lastTimeShot = performance.now();
    }
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
