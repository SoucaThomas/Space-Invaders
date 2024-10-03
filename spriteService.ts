import Bullet from "./Bullet";
import Enemy from "./Enemy";
import Player from "./player";

class SpriteService {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  backgroundSprite: HTMLImageElement;
  playerSprite: HTMLImageElement;
  enemySprite: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.backgroundSprite = new Image(64, 64);
    this.playerSprite = new Image(64, 64);
    this.enemySprite = new Image(10, 10);
  }

  loadSprites(): Promise<void> {
    return Promise.all([
      new Promise<void>((resolve) => {
        this.backgroundSprite.src = "assets/background.png";
        this.backgroundSprite.onload = () => resolve();
      }),
      new Promise<void>((resolve) => {
        this.playerSprite.src = "assets/player.png";
        this.playerSprite.onload = () => resolve();
      }),
    ]).then(() => {});
  }

  drawBackground() {
    for (let i = 0; i < this.canvas.width; i += 64) {
      for (let j = 0; j < this.canvas.height; j += 64) {
        this.ctx.drawImage(this.backgroundSprite, i, j);
      }
    }
  }

  drawPlayer(player: Player) {
    this.ctx.drawImage(
      this.playerSprite,
      player.boxStartX,
      player.boxStartY,
      64,
      64
    );
  }

  drawEnemy(enemy: Enemy) {
    this.ctx.save();
    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    this.ctx.arc(enemy.x, enemy.y, 50, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
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
