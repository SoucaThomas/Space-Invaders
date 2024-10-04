import { App } from "./app";
import canvasDriver from "./canvasDriver";
import Game from "./game";

export enum Scene {
    GAME_LOADING,
    GAMEPLAY,
    GAME_OVER,
}

export default class SceneManager {
    private app: App;
    private game: Game;
    private canvasDriver: canvasDriver;
    private currentScene: Scene;

    private thingsToDraw: string[] = [];
    constructor(app: App) {
        this.app = app;
        this.canvasDriver = new canvasDriver(this.app.ctx, this.app);

        this.loadScene(Scene.GAME_LOADING);
    }

    loadScene(scene: Scene) {
        if (this.currentScene === scene) return; // Prevent reloading the same scene
        this.currentScene = scene;

        console.log("Loading scene: " + scene);
        this.thingsToDraw = []; // Clear the array before loading a new scene
        switch (scene) {
            case Scene.GAME_LOADING:
                this.loadGameLoading();
                break;
            case Scene.GAMEPLAY:
                this.thingsToDraw = [];
                console.log("Loading gameplay...");
                this.startGame();
                break;
            case Scene.GAME_OVER:
                this.loadGameOver();
                break;
        }
    }

    private loadGameLoading() {
        console.log("Loading game loading...");

        this.thingsToDraw.push("title");
        this.thingsToDraw.push("loadingBar");
        this.thingsToDraw.push("ready");

        this.drawLoop();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === " ") {
                this.loadScene(Scene.GAMEPLAY);
                window.removeEventListener("keydown", handleKeyDown);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
    }

    private startGame() {
        this.game = new Game(this.app);
    }

    private loadGameOver() {
        console.log("Loading game over...");
    }

    public drawLoop() {
        this.app.ctx.fillStyle = "black";
        this.app.ctx.fillRect(
            0,
            0,
            this.app.canvas.width,
            this.app.canvas.height
        );

        this.thingsToDraw.forEach((thing) => {
            switch (thing) {
                case "title":
                    this.canvasDriver.drawTitle();
                    break;
                case "loadingBar":
                    this.canvasDriver.drawLoadingBar();
                    break;
                case "ready":
                    this.canvasDriver.drawReady();
                    break;
            }
        });

        requestAnimationFrame(() => this.drawLoop());
    }
}
