import Bullet from "./Bullet";
import Player from "./player";
import SpriteService from "./spriteService";
import Enemy from "./Enemy";

class GameEngine {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public spriteService: SpriteService;

  public score: number = 0;

  private scoreElement: HTMLElement;
  private fpsElement: HTMLElement;

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

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.scoreElement = scoreElement;
    this.fpsElement = fpsElement;

    this.spriteService = new SpriteService(this.canvas, this.ctx);
    this.spriteService.loadSprites().then(() => {
      this.start();
    });

    window.addEventListener("resize", () => {
      this.resize();
    });
  }

  public start() {
    this.player = new Player(
      this.canvas.width / 2,
      this.canvas.height - 100,
      this
    );

    const enemy = new Enemy(100, 100, this);

    this.inGameWorld.push(this.player, enemy);

    const fps = 10;
    const interval = 1000 / fps;
    setInterval(() => {
      this.draw();
      this.update();
    }, interval);
  }

  shoot(owner: Player) {
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
    this.fpsElement.innerText = `FPS: ${Math.round(1000 / 16)}`;

    for (let i = 0; i < this.inGameWorld.length; i++) {
      this.inGameWorld[i].update();

      if (this.inGameWorld[i] instanceof Bullet) {
        for (let j = 0; j < this.inGameWorld.length; j++) {
          if (this.inGameWorld[j] instanceof Enemy) {
            const bullet = this.inGameWorld[i] as Bullet;
            const enemy = this.inGameWorld[j] as Enemy;

            if (this.colisionDetection(bullet, enemy)) {
              enemy.collision(bullet);
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
  private resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}

export default GameEngine;
