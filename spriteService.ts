import Bullet from "./Bullet";
import Enemy from "./Enemy";
import Player from "./player";

class SpriteService {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  backgroundSprite: HTMLImageElement;
  playerSprite: HTMLImageElement;
  enemySprite: HTMLImageElement;

  scale: number = 2;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.backgroundSprite = new Image(64 * this.scale, 64 * this.scale);
    this.playerSprite = new Image(32 * this.scale, 36 * this.scale);
    this.enemySprite = new Image(45 * this.scale, 32 * this.scale);
  }

  loadSprites(): Promise<void> {
    return Promise.all([
      new Promise<void>((resolve) => {
        this.backgroundSprite.src = "assets/background.png";
        this.backgroundSprite.onload = () => resolve();
      }),
      new Promise<void>((resolve) => {
        this.playerSprite.src = "assets/Player.png";
        this.playerSprite.onload = () => resolve();
      }),
      new Promise<void>((resolve) => {
        this.enemySprite.src = "assets/Enemy.png";
        this.enemySprite.onload = () => resolve();
      }),
    ]).then(() => {});
  }

  drawBackground() {
    for (let i = 0; i < this.canvas.width; i += 64 * this.scale) {
      for (let j = 0; j < this.canvas.height; j += 64 * this.scale) {
        this.ctx.drawImage(
          this.backgroundSprite,
          i,
          j,
          this.backgroundSprite.width,
          this.backgroundSprite.height
        );
      }
    }
  }

  drawPlayer(player: Player) {
    this.ctx.drawImage(
      this.playerSprite,
      player.colisionBox.offsetX,
      player.colisionBox.offsetY,
      this.playerSprite.width,
      this.playerSprite.height
    );
  }

  drawEnemy(enemy: Enemy) {
    this.ctx.drawImage(
      this.enemySprite,
      enemy.colisionBox.offsetX,
      enemy.colisionBox.offsetY,
      this.enemySprite.width,
      this.enemySprite.height
    );
  }

  drawBullet(bullet: Bullet) {
    this.ctx.save();
    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    this.ctx.arc(
      bullet.colisionBox.offsetX,
      bullet.colisionBox.offsetY,
      5,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  drawColisionBox(gameObject: any) {
    this.ctx.save();
    this.ctx.strokeStyle = "red";
    if (gameObject instanceof Player) {
      this.ctx.strokeStyle = "green";
    }
    this.ctx.strokeRect(
      gameObject.colisionBox.offsetX,
      gameObject.colisionBox.offsetY,
      gameObject.colisionBox.width,
      gameObject.colisionBox.height
    );
    this.ctx.restore();
  }
}

export default SpriteService;
