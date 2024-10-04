import Bullet from "./Bullet";
import Enemy from "./Enemy";
import GameObject from "./GameObject";
import ImpactEffect from "./ImpactEffect";
import Player from "./player";

class SpriteService {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  backgroundSprite: HTMLImageElement;
  playerSprite: HTMLImageElement;
  enemySprite: HTMLImageElement;

  scale: number = 1;

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
    // for (let i = 0; i < this.canvas.width; i += 64 * this.scale) {
    //   for (let j = 0; j < this.canvas.height; j += 64 * this.scale) {
    //     this.ctx.drawImage(
    //       this.backgroundSprite,
    //       i,
    //       j,
    //       this.backgroundSprite.width,
    //       this.backgroundSprite.height
    //     );
    //   }
    // }
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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
    this.ctx.fillStyle = bullet.color;
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

  drawImpactEffect(impactEffect: ImpactEffect) {
    this.ctx.save();
    this.ctx.fillStyle = impactEffect.color;
    impactEffect.particales.forEach((particle) => {
      this.ctx.beginPath();
      this.ctx.globalAlpha = impactEffect.lifetime / 100;
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.closePath();
    });
    this.ctx.restore();
  }

  drawColisionBox(gameObject: any) {
    // check if we are in dev mode
    // if (process.env.NODE_ENV === "development") {
    //   this.ctx.save();
    //   this.ctx.strokeStyle = "red";
    //   this.ctx.strokeRect(
    //     gameObject.colisionBox.offsetX,
    //     gameObject.colisionBox.offsetY,
    //     gameObject.colisionBox.width,
    //     gameObject.colisionBox.height
    //   );
    //   this.ctx.restore();
    // }
  }
}

export default SpriteService;
