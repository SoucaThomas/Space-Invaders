import GameEngine from "./Game";
import type GameObject from "./GameObject";

class impactEffect {
  private gameObjectA: GameObject;
  private gameObjectB: GameObject;
  private gameEngine: GameEngine;
  public impactX: number;
  public impactY: number;
  public radius: number = 10;
  public particales: any[] = [];
  public lifetime: number;
  public color: string;

  constructor(
    gameObjectA: GameObject,
    gameObjectB: GameObject,
    gameEngine: GameEngine
  ) {
    this.gameObjectA = gameObjectA;
    this.gameObjectB = gameObjectB;
    this.gameEngine = gameEngine;

    this.impactX = gameObjectA.x;
    this.impactY = gameObjectA.y;

    this.color = gameObjectB.color;
    this.lifetime = Math.random() * 100 + 50;
    for (let i = 0; i < 10; i++) {
      this.particales.push({
        x: this.impactX,
        y: this.impactY,
        size: Math.random() * 5,
        mass: Math.random() * 5,
        speed: Math.random() * 5,
        angle: Math.random() * Math.PI * 2,
      });
    }
  }

  public draw() {
    this.gameEngine.spriteService.drawImpactEffect(this);
  }

  public update() {
    this.particales.forEach((particle) => {
      particle.x += Math.cos(particle.angle) * particle.speed;
      particle.y += Math.sin(particle.angle) * particle.speed;
    });

    this.lifetime -= 1;

    if (this.lifetime < 0) {
      this.gameEngine.removeGameObject(this);
    }
  }
}

export default impactEffect;
