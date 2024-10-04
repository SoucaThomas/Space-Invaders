import SceneManager from "./SceneManager";
import { Scene } from "./SceneManager";
import CanvasDriver from "./canvasDriver";

window.onload = () => {
    const app = new App(document.getElementById("canvas") as HTMLCanvasElement);
};

export class App {
    public sceneManager: SceneManager;
    public canvasDriver: CanvasDriver;

    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        if (!this.ctx) throw new Error("2d context not supported");

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.sceneManager = new SceneManager(this);
        this.canvasDriver = new CanvasDriver(this.ctx, this);

        this.sceneManager.loadScene(Scene.GAME_LOADING);
    }
}
