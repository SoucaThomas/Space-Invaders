import { App } from "./app";

export class Player {
    public position: { x: number; y: number };
    public speed: number;

    private app: App;
    constructor(app: App, position: { x: number; y: number }, speed: number) {
        this.position = position;
        this.speed = speed;
        this.app = app;
    }

    draw() {
        // Drawing player at {x: 0, y: 0}
        this.app.ctx.fillStyle = "white";
        this.app.ctx.fillRect(this.position.x, this.position.y, 50, 50);
    }
}
