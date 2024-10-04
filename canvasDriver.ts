import gsap from "gsap";
import { Scene } from "./SceneManager";
import { App } from "./app";

export default class canvasDriver {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    app: App;

    constructor(ctx: CanvasRenderingContext2D, app: App) {
        this.canvas = ctx.canvas;
        this.ctx = ctx;
        this.app = app;
    }

    public drawTitle() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "50px Tiny5";
        this.ctx.textAlign = "center";
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = "white";
        this.ctx.fillText(
            "Space Invaders",
            this.canvas.width / 2,
            (this.canvas.height / 8) * 3
        );
        this.ctx.shadowBlur = 0;
    }

    private ready = false;
    drawLoadingBar(max: number = 100, value: number = 0) {
        this.ctx.fillStyle = "white";
        const padding = 2;
        this.ctx.fillRect(
            this.canvas.width / 2 - 150,
            (this.canvas.height / 8) * 5,
            300,
            50
        );

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(
            this.canvas.width / 2 - 150 + padding,
            (this.canvas.height / 8) * 5 + padding,
            300 - padding * 2,
            50 - padding * 2
        );

        let prog = value / max;
        if (prog > 1) prog = 1;

        this.ctx.fillStyle = "green";
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = "green";
        this.ctx.fillRect(
            this.canvas.width / 2 - 150 + padding,
            (this.canvas.height / 8) * 5 + padding,
            prog * (300 - padding * 2),
            50 - padding * 2
        );
        this.ctx.shadowBlur = 0;

        this.ctx.font = "30px Tiny5";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText(
            `${(prog * 100).toFixed(2)}%`,
            this.canvas.width / 2,
            (this.canvas.height / 8) * 5 + 35
        );
    }

    public drawReady() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Tiny5";
        this.ctx.textAlign = "center";
        this.ctx.shadowBlur = 0;
        this.ctx.shadowColor = this.ready ? "green" : "red";
        this.ctx.fillText(
            "Game Ready! Click to start",
            this.canvas.width / 2,
            (this.canvas.height / 8) * 5 - 20
        );
        this.ctx.shadowBlur = 0;
    }

    drawBackground() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
