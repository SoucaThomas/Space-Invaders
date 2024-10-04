import Bullet from "./Bullet";
import Player from "./player";
import SpriteService from "./spriteService";
import Enemy from "./Enemy";
import impactEffect from "./ImpactEffect";

class GameEngine {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public spriteService: SpriteService;

  public score: number = 0;
  public bulletCooldown: number = 150;
  public playerSpeed: number = 5;

  private scoreElement: HTMLElement;

  private player!: Player;
  private inGameWorld: any[] = [];

  constructor(
    canvas: HTMLCanvasElement,
    scoreElement: HTMLElement,
    fpsElement: HTMLElement
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    if (!this.ctx) {
      throw new Error("Failed to get 2D context");
    }

    this.canvas.width = 800;
    this.canvas.height = 1300;

    this.scoreElement = scoreElement;

    this.spriteService = new SpriteService(this.canvas, this.ctx);
    this.spriteService.loadSprites().then(() => {
      this.start();
    });
  }

  public start() {
    this.player = new Player(
      this.canvas.width / 2,
      this.canvas.height - 100,
      this
    );

    const numberOfEnemiesOnLane = 7;
    const distanceBetweenEnemies = 100;
    const distanceBetweenLanes = 50;

    const lanePadding =
      this.canvas.width -
      ((numberOfEnemiesOnLane - 1) * distanceBetweenEnemies +
        this.spriteService.enemySprite.width);

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < numberOfEnemiesOnLane; j++) {
        const enemy = new Enemy(
          lanePadding / 2 + j * distanceBetweenEnemies,
          300 + i * distanceBetweenLanes,
          this
        );
        this.inGameWorld.push(enemy);
      }
    }

    this.inGameWorld.push(this.player);

    const fps = 60;
    const interval = 1000 / fps;
    setInterval(() => {
      this.draw();
      this.update();
    }, interval);
  }

  shoot(owner: Player | Enemy) {
    const bullet = new Bullet(owner, this);
    this.inGameWorld.push(bullet);
  }

  removeGameObject(gameObject: any) {
    this.inGameWorld = this.inGameWorld.filter((obj) => obj !== gameObject);
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.spriteService.drawBackground();

    for (let i = 0; i < this.inGameWorld.length; i++) {
      this.inGameWorld[i].draw();
    }
  }

  private update() {
    this.scoreElement.innerText = `Score: ${this.score}`;

    for (let i = 0; i < this.inGameWorld.length; i++) {
      this.inGameWorld[i].update();

      if (this.inGameWorld[i] instanceof Enemy && Math.random() < 0.005) {
        const enemy = this.inGameWorld[i] as Enemy;
        enemy.shoot();
      }

      if (this.inGameWorld[i] instanceof Bullet) {
        for (let j = 0; j < this.inGameWorld.length; j++) {
          if (this.inGameWorld[j] instanceof Enemy) {
            const bullet = this.inGameWorld[i] as Bullet;
            const enemy = this.inGameWorld[j] as Enemy;

            if (bullet.owner instanceof Player) {
              if (this.colisionDetection(bullet, enemy)) {
                //bullet hit enemy
                enemy.collision(bullet);
                this.inGameWorld.push(new impactEffect(bullet, enemy, this));
              }
            }
          }
        }
      }
      if (this.inGameWorld[i] instanceof Bullet) {
        for (let j = 0; j < this.inGameWorld.length; j++) {
          if (this.inGameWorld[j] instanceof Player) {
            const bullet = this.inGameWorld[i] as Bullet;
            const player = this.inGameWorld[j] as Player;

            if (this.colisionDetection(bullet, player)) {
              player.collision(bullet);
              this.inGameWorld.push(new impactEffect(bullet, player, this));
            }
          }
        }
      }
    }
  }

  private colisionDetection(gameObjectA: any, gameObjectB: any) {
    return (
      gameObjectA.colisionBox.offsetX <
        gameObjectB.colisionBox.offsetX + gameObjectB.colisionBox.width &&
      gameObjectA.colisionBox.offsetX + gameObjectA.colisionBox.width >
        gameObjectB.colisionBox.offsetX &&
      gameObjectA.colisionBox.offsetY <
        gameObjectB.colisionBox.offsetY + gameObjectB.colisionBox.height &&
      gameObjectA.colisionBox.offsetY + gameObjectA.colisionBox.height >
        gameObjectB.colisionBox.offsetY
    );
  }
}

export default GameEngine;
