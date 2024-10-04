import { App } from "./app";
import { Player } from "./player";
import SceneManager, { Scene } from "./SceneManager";

export default class Game {
    private app: App;
    private sceneManager: SceneManager;

    constructor(app: App) {
        this.app = app;
        this.sceneManager = new SceneManager(app);
        this.sceneManager.loadScene(Scene.GAME_LOADING);
    }

    public player!: Player;
    public start() {
        this.player = new Player(this.app, { x: 5, y: 5 }, 5);

        this.draw();
    }

    draw() {
        console.log("Drawing game...");
        this.app.ctx.clearRect(
            0,
            0,
            this.app.canvas.width,
            this.app.canvas.height
        );

        this.app.canvasDriver.drawBackground();

        this.player.draw();
    }
}
