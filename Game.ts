import Bullet from "./Bullet";
import Player from "./player";
import SpriteService from "./spriteService";

class GameEngine {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  private player!: Player;
  private inGameWorld: any[] = [];
  spriteService: SpriteService;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    if (!this.ctx) {
      throw new Error("Failed to get 2D context");
    }

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

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

    this.inGameWorld.push(this.player);

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
    console.log(this.inGameWorld.length);
    //draw background
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.spriteService.drawBackground();

    for (let i = 0; i < this.inGameWorld.length; i++) {
      this.inGameWorld[i].draw();
    }
  }

  private update() {
    for (let i = 0; i < this.inGameWorld.length; i++) {
      this.inGameWorld[i].update();
    }
  }

  private resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}

export default GameEngine;
